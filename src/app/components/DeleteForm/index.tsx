import { useFormState, useFormStatus } from 'react-dom';

import { deleteTask } from '@/app/actions';

const initialState = {
    message: '',
};

function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending} className="font-medium text-red-600 hover:underline">
            Delete
        </button>
    );
}

export function DeleteForm({ id, className }: { id: string; className?: string }) {
    const [state, formAction] = useFormState(deleteTask, initialState);

    return (
        <form action={formAction} className={className}>
            <input type="hidden" name="id" value={id} />
            <DeleteButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    );
}
