import { Task } from '../../types';
import { getTask } from '@/app/actions';
import Link from 'next/link';
import { Button } from '@/app/components/Button';
import { Text } from '@/app/components/Text';
import { BackButton } from '@/app/components/BackButton';

const calcTaskProgress = (total_records: number, total_labels: number): string => {
    const progress = (total_labels / total_records) * 100;
    return progress > 100 ? '100%' : `${progress}%`;
};

export default async function Task({ params }: { params: { task_id: string } }) {
    const task = await getTask(params.task_id);
    const taskProgress = calcTaskProgress(task.total_records, task.total_labels);

    return (
        <div className="w-full max-w-5xl">
            <BackButton href="/">Back to all</BackButton>
            <div className="grid gap-y-2 bg-white border border-gray-200 rounded-lg shadow-md mt-5 mb-8 sm:p-6 lg:p-8">
                <p className="text-gray-400 text-xs">Name:</p>
                <h3 className="mb-2 text-xl text-gray-900">
                    <Text>{task.name}</Text>
                </h3>
                <p className="text-gray-400 text-xs ">Description:</p>
                <Text className="mb-2 text-sm text-gray-500">{task.description}</Text>
                <p className="text-gray-400 text-xs ">Progress {taskProgress}</p>
                <div className="mb-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: taskProgress }}></div>
                </div>
                {task.next_record_id ? (
                    <Link href={`/task/${task.id}/record/${task.next_record_id}`}>
                        <Button>Start</Button>
                    </Link>
                ) : (
                    <div>
                        <a href={`/task/${task.id}/labels.jsonl`} download>
                            <Button>Export</Button>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
