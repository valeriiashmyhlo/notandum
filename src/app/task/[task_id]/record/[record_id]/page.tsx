'use client';

import { createLabel, getRecord, getTask } from '@/app/actions';
import { useEffect, useState, useTransition } from 'react';

import { useFormState } from 'react-dom';
import { Record, Task } from '@/app/types';
import Link from 'next/link';
import { Span, TextSelect } from '@/app/components/TextSelect';
import { Button } from '@/app/components/Button';
import { Text } from '@/app/components/Text';

type RecordProps = {
    record_id: string;
    task_id: string;
};

const initialState = {
    message: '',
    error: { record_id: [], content: [] },
};

export default function Record({ params }: { params: RecordProps }) {
    const [record, setRecord] = useState<Record | null>(null);
    const [task, setTask] = useState<Task | null>(null);
    const [text, setText] = useState<string>('');
    const [selected, setSelected] = useState<Span[]>([]);

    useEffect(() => {
        const fetchRecord = async () => {
            const data = await getRecord(params.record_id);

            setRecord(data);
            setText(data.content);
        };
        const fetchTask = async () => {
            const data = await getTask(params.task_id);

            setTask(data);
        };

        fetchRecord();
        fetchTask();
    }, [params.task_id, params.record_id]);
    const [state, formAction] = useFormState(createLabel, initialState);

    if (!record) {
        return;
    }

    if (!task) {
        return;
    }

    return (
        <div className="p-4 w-full max-w-5xl">
            <Link
                href={`/task/${params.task_id}`}
                className="flex items-center font-medium text-blue-600 hover:underline mb-3"
            >
                <svg className="w-3 h-3 ms-2 mr-1 rotate-180" aria-hidden="true" fill="none" viewBox="0 0 14 10">
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
                Back to task
            </Link>
            <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md mt-5 mb-8 sm:p-6 lg:p-8">
                <p className="text-gray-400 text-xs mb-2">Description:</p>
                <Text className="text-gray-600 text-sm mb-8">{task.description}</Text>
                <form action={formAction}>
                    <input type="hidden" name="record_id" value={record.id} />
                    <input type="hidden" name="task_id" value={params.task_id} />
                    <input type="hidden" name="content" value={JSON.stringify(selected)} />
                    <div className="flex direction-column items-center mb-8">
                        {/* <svg
                            className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${
                                selected.length ? 'text-green-500' : 'text-gray-500'
                            }`}
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg> */}
                        <TextSelect
                            content={text}
                            onChange={(value) => setSelected(value as Span[])}
                            value={selected}
                        />
                    </div>
                    <div>
                        {selected.map(({ start, end }, i) => {
                            return <p key={i}>{text.slice(start, end)}</p>;
                        })}
                    </div>
                    <Button type="submit" className="self-end" disabled={!selected.length}>
                        Next
                    </Button>
                </form>
            </div>
            <div className="text-xs sm:pl-6 lg:pl-8">
                <h4 className="mb-2 font-semibold text-gray-600">Actions:</h4>
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                    <li>To annotate select a text by holding a mouse left key.</li>
                    <li>To delete selection click on a highlighted section.</li>
                    <li>Selection can be done only within the bordered section.</li>
                </ul>
            </div>
        </div>
    );
}
