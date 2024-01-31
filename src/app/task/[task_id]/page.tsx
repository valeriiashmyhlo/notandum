import { Task } from '../../types';
// import { useEffect, useState } from 'react';
import { getTask } from '@/app/actions';
import Link from 'next/link';
import { Button } from '@/app/componnets/Button';

export default async function Task({ params }: { params: { task_id: string } }) {
    // const [task, setTask] = useState<Task>();
    const task = await getTask(params.task_id);

    // useEffect(() => {
    //     const fetchTask = async (id: string) => {
    //         const task = await getTask(id);
    //         setTask(task);
    //     };

    //     fetchTask(params.task_id);
    // }, [params.task_id]);

    // if (!task) {
    //     return;
    // }

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

            {task.next_record_id ? (
                <>
                    <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Records:</h2>
                    <Link href={`/task/${task.id}/record/${task.next_record_id}`}>
                        <Button>Start</Button>
                    </Link>
                </>
            ) : (
                <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Annotated records: ...</h2>
            )}
        </div>
    );
}
