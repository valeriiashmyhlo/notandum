'use client';

import { FormEvent, useState } from 'react';

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
    const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

    const [state, formAction] = useFormState(createTask, initialState);

    const onChange = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors(null);
    };

    return (
        <form action={formAction} onChange={onChange} id="createTask" className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <Input type="text" name="name" label="Name" placeholder="Task name..." required={true} />
                {errors?.name && <div style={{ color: 'red' }}>{errors?.name[0]}</div>}
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
                {errors?.description && <div style={{ color: 'red' }}>{errors?.description[0]}</div>}
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <UploadFile onChange={setFileName} />
                {/* TODO:refactor */}
                {fileName ? (
                    <div className="h-4">{fileName}</div>
                ) : state.error?.file ? (
                    <div style={{ color: 'red' }}>{state.error.file[0]}</div>
                ) : (
                    ''
                )}
            </div>
            <Button type="submit" className="-mx-3">
                Create
            </Button>
        </form>
    );
}
