import { Task } from '../../types';
import { getExportURL, getTask } from '@/app/actions';
import Link from 'next/link';
import { Button } from '@/app/componnets/Button';

const calcTaskProgress = (total_records: number, total_labels: number): string => {
    const progress = (total_labels / total_records) * 100;
    return progress > 100 ? '100%' : `${progress}%`;
};

export default async function Task({ params }: { params: { task_id: string } }) {
    const task = await getTask(params.task_id);
    const taskProgress = calcTaskProgress(task.total_records, task.total_labels);

    // const [task, setTask] = useState<Task>();

    // useEffect(() => {
    //     const fetchTask = async (id: string) => {
    //         const task = await getTask(id);
    //         setTask(task);
    //     };

    //     fetchTask(params.task_id);
    // }, [params.task_id]);

    // if (!task) {
    //     return;
    // }

    return (
        <div className="p-4 my-8 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 w-full max-w-5xl">
            <h3 className="mb-3 text-xl font-medium text-gray-900">{task.name}</h3>
            <p className="mb-5 text-sm font-medium text-gray-500">{task.description}</p>
            <form className="seva-form formkit-form" method="post" data-format="inline" min-width="400 500 600 700 800">
                <div data-style="clean" className="flex items-end mb-3">
                    <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
                    <div
                        data-element="fields"
                        data-stacked="false"
                        className="flex items-center w-full max-w-md mb-3 seva-fields formkit-fields"
                    ></div>
                </div>
            </form>

            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: taskProgress }}></div>
            </div>

            {task.next_record_id ? (
                <>
                    {/* <h2 className="mb-2 text-lg font-semibold text-gray-900">Records:</h2> */}
                    <Link href={`/task/${task.id}/record/${task.next_record_id}`}>
                        <Button>Start</Button>
                    </Link>
                </>
            ) : (
                <a
                    href={getExportURL(task.id)}
                    download
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                >
                    Export
                </a>
            )}
        </div>
    );
}
