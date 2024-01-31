import { Button } from './componnets/Button';
import Link from 'next/link';
import { TaskList } from './componnets/TaskList';
import { getTaskList } from './actions';

export default async function Home() {
    const { data } = await getTaskList();

    return (
        <div className="w-full">
            <div className="flex w-full justify-center mb-16">
                <Link href="/new">
                    <Button>Create new task</Button>
                </Link>
            </div>
            {data.length === 0 ? 'Empty list' : <TaskList data={data} />}
        </div>
    );
}
