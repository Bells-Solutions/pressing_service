export type Order = {
    id: number;
    service: string;
    status: string;
    userId: number;
};

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    number: string;
};