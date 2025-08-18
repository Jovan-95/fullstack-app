// Form register user fields
export type RegisterFormUser = {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    gender_id: number;
};

// User
export type User = {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    gender_id: number;
};

// Login form user
export type LoginFormUser = {
    email: string;
    password: string;
};
