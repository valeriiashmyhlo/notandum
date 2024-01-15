import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['jsonl'];
const required_error = 'This field cannot be blank';

export const TaskSchema = z.object({
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
        .refine((file) => file?.name.length > 0, `Upload is required.`)
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`),
});
