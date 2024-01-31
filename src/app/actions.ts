'use server';

import { LabelSchema, TaskSchema } from '@/validations';
import { RedirectType, redirect } from 'next/navigation';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

type TaskErrors = z.inferFlattenedErrors<typeof TaskSchema>;
type TaskPrevState = {
    message: string;
    error?: TaskErrors['fieldErrors'];
};

export async function createTask(prevState: TaskPrevState, formData: FormData) {
    const task = Object.fromEntries(formData.entries());
    const result = TaskSchema.safeParse(task);

    if (!result.success) {
        const errors: TaskErrors = result.error.flatten();
        return { message: 'Form validation failed', error: errors.fieldErrors };
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/task/create', {
            method: 'POST',
            body: formData,
        });
        await response.json();
    } catch {
        return { message: 'Server error: Failed to fetch data' };
    }

    revalidatePath('/');
    redirect('/', RedirectType.replace);
}

type LabelErrors = z.inferFlattenedErrors<typeof LabelSchema>;
type LabelPrevState = {
    message: string;
    error?: LabelErrors['fieldErrors'];
};

export async function createLabel(prevState: LabelPrevState | undefined, formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const result = LabelSchema.safeParse(data);

    if (!result.success) {
        const errors: LabelErrors = result.error.flatten();
        return { message: 'Form validation failed', error: errors.fieldErrors };
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/label/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result.data),
        });

        revalidatePath('/');
        return { message: response.json(), error: undefined };
    } catch (error) {
        return { message: 'Server error: Label creation failed', error: undefined };
    } finally {
        const task = await getTask(data.task_id.toString());

        const path = task.next_record_id ? `/task/${data.task_id}/record/${task.next_record_id}` : '/';
        redirect(path, RedirectType.replace);
    }
}

export async function getTask(taskId: string) {
    try {
        return (
            await fetch(`http://127.0.0.1:8000/task/${taskId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        ).json();
    } catch (err) {
        throw new Error('Failed to fetch task');
    }
}

export async function upload(file: FormData) {
    const response = await fetch(`http://127.0.0.1:8000/upload`, {
        method: 'POST',
        body: file,
    });

    if (!response.ok) {
        throw new Error('Failed to upload');
    }

    return await response.json();
}

export async function deleteTask(
    prevState: {
        message: string;
    },
    formData: FormData,
) {
    const schema = z.object({
        id: z.string().uuid({ message: 'Invalid UUID' }),
    });
    const data = schema.parse({
        id: formData.get('id'),
    });

    try {
        await fetch(`http://127.0.0.1:8000/task/${data.id}`, {
            method: 'DELETE',
        });

        revalidatePath('/');
        return { message: `Deleted task ${data.id}` };
    } catch (err) {
        return { message: 'Failed to delete task' };
    }
}

export const getTaskList = async () => {
    try {
        return (await fetch('http://127.0.0.1:8000/task/list')).json();
    } catch (err) {
        throw new Error('Failed to fetch data');
    }
};

export const getNextRecord = async (id: string) => {
    try {
        return (await fetch(`http://127.0.0.1:8000/task/${id}/record/next`)).json();
    } catch (err) {
        throw new Error('Failed to fetch next record');
    }
};

export const getRecord = async (id: string) => {
    try {
        return (await fetch(`http://127.0.0.1:8000/records/${id}`)).json();
    } catch (err) {
        throw new Error('Failed to fetch record');
    }
};
