import { Button } from './components/Button';
import Link from 'next/link';
import { TaskList } from './components/TaskList';
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

            {data.length === 0 ? (
                <div className="flex justify-center relative overflow-x-auto">No tasks created yet</div>
            ) : (
                <TaskList data={data} />
            )}
        </div>
    );
}
