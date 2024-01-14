import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['jsonl'];

export const TaskSchema = z.object({
    name: z
        .string({
            required_error: 'Name field is required',
        })
        .min(4),
    description: z
        .string({
            required_error: 'Description field is required',
        })
        .min(4),
    file: z
        .any()
        .refine((file) => file?.name.length > 0, `Upload is required.`)
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`),
});
