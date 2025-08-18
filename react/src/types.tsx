// Form register user fields
export type RegisterFormUser = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
};

// User
export type User = {
    name: string;
    email: string;
    password: string;
    roles: string[];
    auth_token: string | null;
    gender: string;
};

// Login form user
export type LoginFormUser = {
    email: string;
    password: string;
};
