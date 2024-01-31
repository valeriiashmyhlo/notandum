'use client';

import { createLabel, getRecord } from '@/app/actions';
import { FormEvent, useEffect, useState, useTransition } from 'react';

import { Button } from '@/app/componnets/Button';
import { useFormState } from 'react-dom';
import { Record } from '@/app/types';
import { TextSelect, Span } from '@/app/componnets/TextSelect';

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
    const [text, setText] = useState<string>('');
    const [selected, setSelected] = useState<Span[]>([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const fetchRecord = async () => {
            const data = await getRecord(params.record_id);

            setRecord(data);
            setText(data.content);
        };

        fetchRecord();
    }, [params.record_id]);
    const [state, formAction] = useFormState(createLabel, initialState);

    if (!record) {
        return;
    }

    return (
        <div className="p-4 my-8 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 w-full max-w-5xl">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">Record:</h2>
            <ul className="space-y-1 text-gray-500 list-inside">
                <li className="flex items-center">
                    <form action={formAction} className="flex flex-col">
                        <input type="hidden" name="record_id" value={record.id} />
                        <input type="hidden" name="task_id" value={params.task_id} />
                        <input type="hidden" name="content" value={JSON.stringify(selected)} />
                        <div>
                            <div className="flex direction-column items-center mb-8">
                                <svg
                                    className={`w-3.5 h-3.5 me-2 flex-shrink-0 ${
                                        selected.length ? 'text-green-500' : 'text-gray-500'
                                    }`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>

                                <TextSelect
                                    content={text}
                                    onChange={(value) => setSelected(value as Span[])}
                                    value={selected}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="self-end" disabled={!selected.length}>
                            Next
                        </Button>
                    </form>
                </li>
            </ul>
        </div>
    );
}
