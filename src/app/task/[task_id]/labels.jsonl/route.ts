import { exportLabels } from '@/app/actions';

export async function GET(req: Request, { params }: { params: { task_id: string } }) {
    return await exportLabels(params.task_id);
}
