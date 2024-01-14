'use client';

import { Task } from '../../types';
import { useEffect, useState } from 'react';
import { getTask } from '@/app/actions';

export default function Task({ params }: { params: { id: string } }) {
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        console.log(params.id);
        const fetchTask = async (id: string) => {
            try {
                const task = await getTask(id);
                setTask(task);
            } catch (err) {
                throw new Error('Failed to fetch task');
            }
        };

        fetchTask(params.id);
    }, []);

    if (!task) {
        return;
    }

    return (
        <>
            <h1>{task.name}</h1>
            <h1>{task.description}</h1>
        </>
    );
}
