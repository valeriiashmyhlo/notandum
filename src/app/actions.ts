'use server';

import { LabelSchema, TaskSchema } from '@/validations';
import { RedirectType, redirect } from 'next/navigation';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const API_URL = process.env['API_URL'] || 'http://127.0.0.1:8000';

type TaskErrors = z.inferFlattenedErrors<typeof TaskSchema>;
type TaskPrevState = {
    message: string;
    error?: TaskErrors['fieldErrors'];
};

export async function createTask(prevState: TaskPrevState | undefined, formData: FormData) {
    const task = Object.fromEntries(formData.entries());
    const result = TaskSchema.safeParse(task);

    if (!result.success) {
        const errors: TaskErrors = result.error.flatten();
        return { message: 'Form validation failed', error: errors.fieldErrors };
    }

    try {
        await fetch(`${API_URL}/task/create`, {
            method: 'POST',
            body: formData,
        });

        revalidatePath('/');
    } catch (e) {
        console.log(e);
        return { message: 'Server error: Failed to create a task' };
    }

    redirect('/', RedirectType.replace);
}

type LabelErrors = z.inferFlattenedErrors<typeof LabelSchema>;
type LabelPrevState = {
    message: string;
    error?: LabelErrors['fieldErrors'];
};

export async function createLabel(prevState: LabelPrevState, formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const result = LabelSchema.safeParse(data);

    if (!result.success) {
        const errors: LabelErrors = result.error.flatten();
        return { message: 'Form validation failed', error: errors.fieldErrors };
    }

    try {
        const response = await fetch(`${API_URL}/label/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result.data),
        });

        revalidatePath(`/task/${data.task_id}`);
        return { message: await response.json(), error: undefined };
    } catch (error) {
        return { message: 'Server error: Label creation failed', error: undefined };
    } finally {
        const task = await getTask(data.task_id.toString());
        const path = task.next_record_id
            ? `/task/${data.task_id}/record/${task.next_record_id}`
            : `/task/${data.task_id}/`;
        redirect(path, RedirectType.replace);
    }
}

export async function getTask(taskId: string) {
    try {
        return (
            await fetch(`${API_URL}/task/${taskId}`, {
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
    const response = await fetch(`${API_URL}/upload`, {
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
        await fetch(`${API_URL}/task/${data.id}`, {
            method: 'DELETE',
        });

        revalidatePath('/');
        return { message: `Deleted task ${data.id}` };
    } catch (err) {
        return { message: 'Failed to delete task' };
    }
}

export const getTaskList = async () => {
    console.log('====', API_URL);
    try {
        return (
            await fetch(`${API_URL}/task/list`, {
                headers: {
                    'x-vercel-skip-toolbar': '1',
                },
            })
        ).json();
    } catch (err) {
        throw new Error('Failed to fetch data');
    }
};

export const getNextRecord = async (id: string) => {
    try {
        return (await fetch(`${API_URL}/task/${id}/record/next`)).json();
    } catch (err) {
        throw new Error('Failed to fetch next record');
    }
};

export const getRecord = async (id: string) => {
    try {
        return (await fetch(`${API_URL}/records/${id}`)).json();
    } catch (err) {
        throw new Error('Failed to fetch record');
    }
};

export const getExportURL = (taskId: string) => {
    return `${API_URL}/task/${taskId}/labels.jsonl`;
};
