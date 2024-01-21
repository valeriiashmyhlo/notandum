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
        <div className="p-4 my-8 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 w-full max-w-5xl">
            <h3 className="mb-3 text-xl font-medium text-gray-900">{task.name}</h3>
            <p className="mb-5 text-sm font-medium text-gray-500">{task.description}</p>
            <form className="seva-form formkit-form" method="post" data-format="inline" min-width="400 500 600 700 800">
                <div data-style="clean" className="flex items-end mb-3">
                    <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
                    <div
                        data-element="fields"
                        data-stacked="false"
                        className="flex items-center w-full max-w-md mb-3 seva-fields formkit-fields"
                    ></div>
                </div>
            </form>
            <div className="text-sm font-medium text-gray-500">
                {task.records.map((record) => (
                    <h1>{record.content}</h1>
                ))}
            </div>
        </div>
    );
}
