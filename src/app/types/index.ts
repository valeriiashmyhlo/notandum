export type Record = {
    id: string;
    content: string;
};

export type Task = {
    id: string;
    name: string;
    description: string;
    records: Record[];
    next_record_id: string;
};

export type Label = {
    content: string;
    recordId: string;
};
