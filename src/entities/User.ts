export interface UserToCreate {
    name: string;
    role?: string;
    email: string;
    password: string;
}

export interface ActiveUser {
    readonly name: string;
    readonly role?: string;
    readonly email: string;
}