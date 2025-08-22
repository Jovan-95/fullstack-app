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

// Listed User from users page
export type ListedUser = {
    created_at: string;
    email: string;
    email_verified_at: string;
    gender: { id: number; name: string };
    gender_id: number;
    id: number;
    name: string;
    profile_image: string;
    roles: [];
    updated_at: string;
    username: string;
};
