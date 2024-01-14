'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { Task } from '../types';

export const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const getTaskList = async () => {
            const res = await fetch('http://127.0.0.1:8000/task/list');

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const { data } = await res.json();
            setTasks(data);
        };

        getTaskList();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {tasks.map((task, i) => (
                <Link href={`/task/${task.id}`} key={i}>
                    <div className="mb-8 mr-8">
                        <div>{task.name}</div>
                        <p>{task.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};
