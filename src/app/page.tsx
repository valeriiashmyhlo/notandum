import Link from 'next/link';
import { TaskList } from './componnets/TaskList';

export default function Home() {
    return (
        <div className="w-full">
            <div className="flex w-full justify-center mb-16">
                <Link
                    href="/new"
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                    Create new task
                </Link>
            </div>
            <TaskList />
        </div>
    );
}
