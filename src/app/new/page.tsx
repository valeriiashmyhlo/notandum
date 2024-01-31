'use client';

import { FormEvent, useEffect, useState } from 'react';

import { Button } from '../componnets/Button';
import { Input } from '../componnets/Input';
import { UploadFile } from '../componnets/UploadFile';
import { createTask } from '../actions';
import { useFormState } from 'react-dom';

const initialState = {
    message: '',
    error: { name: [], description: [], file: [] },
};

export default function CreateNewTask() {
    const [fileName, setFileName] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string[]>>(initialState.error);
    const [state, formAction] = useFormState(createTask, initialState);

    useEffect(() => {
        if (state?.error) {
            setErrors({ ...errors, ...state.error });
        }
    }, [state]);

    const onChange = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors(initialState.error);
    };

    return (
        <form action={formAction} onChange={onChange} id="createTask" className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <Input type="text" name="name" label="Name" placeholder="Task name..." required={true} />
                <div className="h-4 text-red-600">{errors?.name ? errors?.name[0] : ''}</div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <Input
                    type="text"
                    name="description"
                    label="Description"
                    placeholder="Task description..."
                    required={true}
                    componentType="textarea"
                />
                <div className="h-4 text-red-600">{errors?.description[0]}</div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <UploadFile onChange={setFileName} />
                <div className={`h-4 ${errors.file[0] ? 'text-red-600' : ''}`}>
                    {fileName ? fileName : errors.file[0]}
                </div>
            </div>
            <div className="flex justify-between">
                <Button type="submit" className="-mx-3">
                    Create
                </Button>
                {/* <div style={{ color: 'red' }}>{state.message}</div> */}
            </div>
        </form>
    );
}
