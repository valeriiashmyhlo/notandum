'use server';

import { TaskSchema } from '@/validations';

export async function createTask(formData: FormData) {
    const validated = TaskSchema.parse(Object.fromEntries(formData.entries()));
    const body = JSON.stringify(validated);
    const response = await fetch('http://127.0.0.1:8000/task/create', {
        method: 'PUT',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return await response.json();
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
