import { Button } from './componnets/Button';
import Link from 'next/link';
import { Task } from './types';
import { TaskList } from './componnets/TaskList';

const getTaskList = async () => {
    const res = await fetch('http://127.0.0.1:8000/task/list');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return await res.json();
};

export default async function Home() {
    const { data } = await getTaskList();

    return (
        <div className="w-full">
            <div className="flex w-full justify-center mb-16">
                <Link href="/new">
                    <Button>Create new task</Button>
                </Link>
            </div>
            <TaskList data={data} />
        </div>
    );
}
