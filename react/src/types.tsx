import { current } from "@reduxjs/toolkit";

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

export type PaginatedUser = {
    current_page: number;
    data: ListedUser[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: number;
    to: number;
    total: number;
};

// Listed User from usersData.data on users page
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

// Drag and drop result type
export type DragAndDropResult = {
    combine: null;
    destination: { droppableId: string; index: number };
    draggableId: string;
    mode: string;
    reason: string;
    source: { droppableId: string; index: number };
    type: string;
};
