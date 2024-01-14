'use client';

import { FormEvent, useState } from 'react';
import { ZodError, fromZodError } from 'zod-validation-error';

import { TaskSchema } from '@/validations';
import { createTask } from '../actions';
import { useRouter } from 'next/navigation';

export default function CreateNewTask() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);
            const task = Object.fromEntries(formData.entries());
            console.log(task);
            const parsed = TaskSchema.parse(task);

            await createTask(parsed);
            router.replace('/');
        } catch (err) {
            const validationError = fromZodError(err as ZodError);
            setError(validationError.toString());
        }
    };

    const onChange = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
    };

    return (
        <form onSubmit={onSubmit} onChange={onChange} id="createTask" className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-name"
                >
                    Task name
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-name"
                    type="text"
                    name="name"
                />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-textarea"
                >
                    Task description
                </label>
                <textarea
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-textarea"
                    name="description"
                />
            </div>
            <div className="flex flex-wrap flex-col -mx-3 mb-6">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-200 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-300 dark:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-300"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Only JSONL for now..</p>
                    </div>
                    <input
                        id="dropzone-file"
                        name="file"
                        type="file"
                        className="hidden"
                        onChange={(e) => e.target.files && setFileName(e.target.files[0].name)}
                    />
                </label>
                <div className="h-4">{fileName}</div>
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
                Create
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
}
