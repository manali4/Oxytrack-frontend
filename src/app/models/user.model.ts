export class User {
    id: number;
    contact: string;
    name: string;
    username: string;
    password: string;
    role: string;
    createdAt: Date;
    token?: string;
    otp: string;
}
