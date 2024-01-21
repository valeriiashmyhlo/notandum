import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['jsonl'];
const required_error = 'This field cannot be blank';

export const TaskSchema = z.object({
    // id: z.string().uuid({ message: 'Invalid UUID' }),
    name: z
        .string({
            required_error: required_error,
        })
        .min(1, 'Value is too short'),
    description: z
        .string({
            required_error: required_error,
        })
        .min(1, 'Value is too short'),
    file: z
        .any()
        .refine((file) => file?.size > 0, `File is required`)
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
});
