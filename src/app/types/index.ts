export type Record = {
    id: string;
    content: string;
};

export type Task = {
    id: string;
    name: string;
    description: string;
    records: Record[];
};
