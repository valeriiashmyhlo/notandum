'use client';

import { createLabel, getRecord, getTask } from '@/app/actions';
import { useEffect, useState } from 'react';

import { useFormState } from 'react-dom';
import { Record, Task } from '@/app/types';
import { Span, TextSelect } from '@/app/components/TextSelect';
import { Button } from '@/app/components/Button';
import { Text } from '@/app/components/Text';
import { BackButton } from '@/app/components/BackButton';

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

    if (!record || !task) {
        return;
    }

    return (
        <div className="w-full max-w-5xl">
            <BackButton href={`/task/${params.task_id}`}>Back to task</BackButton>
            <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md mt-5 mb-8 sm:p-6 lg:p-8">
                <p className="text-gray-400 text-xs mb-2">Description:</p>
                <Text className="text-gray-600 text-sm mb-4">{task.description}</Text>
                <form action={formAction} className="flex flex-col">
                    <input type="hidden" name="record_id" value={record.id} />
                    <input type="hidden" name="task_id" value={params.task_id} />
                    <input type="hidden" name="content" value={JSON.stringify(selected)} />
                    <div className="flex direction-column items-center mb-4">
                        <TextSelect
                            content={text}
                            onChange={(value) => setSelected(value as Span[])}
                            value={selected}
                        />
                    </div>
                    {/* <div className="flex space-between">
                        <div>
                            {selected.map(({ start, end }, i) => {
                                return <p key={i}>{text.slice(start, end)}</p>;
                            })}
                        </div>
                    </div> */}
                    <Button type="submit" className="self-end" disabled={!selected.length}>
                        Next
                    </Button>
                </form>
            </div>
            <div className="text-xs sm:pl-6 lg:pl-8">
                <h4 className="mb-2 font-semibold text-gray-600">Actions:</h4>
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                    <li>To annotate select a text by holding a mouse left button.</li>
                    <li>To delete selection click on a highlighted section.</li>
                    <li>Selection can be done only within the bordered section.</li>
                </ul>
            </div>
        </div>
    );
}
