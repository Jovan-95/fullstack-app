import { LoginFormUser, User } from "../types";

const API_URL = "http://localhost:8000/api";

// Get Users with pagination HTTP method
export async function getUsers(page: number = 1) {
    try {
        const storedUser = localStorage.getItem("loggedInUser");
        const token = storedUser ? JSON.parse(storedUser).auth_token : null;
        if (!token) throw new Error("No token found");

        const res = await fetch(`${API_URL}/users?page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Greška kod fetchovanja korisnika");

        const data = await res.json();
        console.log(data);
        return data; // Laravel pagination response
    } catch (err) {
        console.error(err);
        return { data: [], current_page: 1, last_page: 1 };
    }
}

// Post HTTP method
export async function registerNewUser(user: User) {
    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

// Login
export async function loginUser(user: LoginFormUser) {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

// Logout
export async function logoutUser() {
    try {
        // Find token
        const storedUser = localStorage.getItem("loggedInUser");
        const token = storedUser ? JSON.parse(storedUser).auth_token : null;

        if (!token) throw new Error("No token found");

        const res = await fetch(`${API_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);

        const data = await res.json();
        console.log(data);

        return data;
    } catch (err) {
        console.error(err);
    }
}

//// Patch HTTP method Edit user
export async function editUser(editedObj: Partial<User>) {
    try {
        // Find token
        const storedUser = localStorage.getItem("loggedInUser");
        const token = storedUser ? JSON.parse(storedUser).auth_token : null;

        if (!token) throw new Error("No token found");

        const res = await fetch(`${API_URL}/user/settings`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editedObj),
        });
        if (!res.ok) {
            throw new Error(`${res.status}, ${res.statusText}`);
        }
        const data = await res.json();
        console.log("PATCH response EDIT user:", data);
        return data;
    } catch (err) {
        console.error("PATCH error:", err);
        throw err;
    }
}
