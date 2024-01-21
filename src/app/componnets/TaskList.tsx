'use client';

import { useEffect, useState } from 'react';

import { DeleteForm } from './DeleteForm';
import Link from 'next/link';
import { Task } from '../types';

export const TaskList = ({ data }: { data: Task[] }) => {
    // const [tasks, setTasks] = useState<Task[]>([]);

    // useEffect(() => {
    //     const getTaskList = async () => {
    //         const res = await fetch('http://127.0.0.1:8000/task/list');

    //         if (!res.ok) {
    //             throw new Error('Failed to fetch data');
    //         }

    //         const { data } = await res.json();
    //         setTasks(data);
    //     };

    //     getTaskList();
    // }, []);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Task name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((task, i) => (
                        <tr key={i} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{task.name}</td>
                            <td className="px-6 py-4">{task.description}</td>
                            <td className="flex items-center px-6 py-4">
                                <Link href={`/task/${task.id}`} className="font-medium text-blue-600 hover:underline">
                                    Edit
                                </Link>
                                <DeleteForm id={task.id} className="ms-3" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
