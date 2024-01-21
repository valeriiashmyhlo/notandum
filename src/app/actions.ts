'use server';

import { RedirectType, permanentRedirect, redirect } from 'next/navigation';

import { TaskSchema } from '@/validations';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

type FlattenedErrors = z.inferFlattenedErrors<typeof TaskSchema>;
type createTaskState = {
    message: string;
    error?: FlattenedErrors['fieldErrors'];
};

export async function createTask(prevState: createTaskState, formData: FormData) {
    const task = Object.fromEntries(formData.entries());
    const result = TaskSchema.safeParse(task);

    if (!result.success) {
        const errors: FlattenedErrors = result.error.flatten();
        return { message: 'Form validation failed', error: errors.fieldErrors };
    }

    try {
        await fetch('http://127.0.0.1:8000/task/create', {
            method: 'POST',
            body: formData,
        });

        revalidatePath('/');
        redirect('/', RedirectType.replace);
        // return { message: 'Task created successfully' };
    } catch (err) {
        // return { message: 'Task creation failed', error: undefined };
    }

    redirect('/', RedirectType.replace);
}

export async function getTask(taskId: string) {
    const response = await fetch(`http://127.0.0.1:8000/task/${taskId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return await response.json();
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
