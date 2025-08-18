// Form register user fields
export type RegisterFormUser = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

// User
export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    status: string;
};

// Login form user
export type LoginFormUser = {
    email: string;
    password: string;
};
