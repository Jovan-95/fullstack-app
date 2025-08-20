import { LoginFormUser, User } from "../types";

const API_URL = "http://localhost:8000/api";

// Get HTTP method
export async function getUsers() {
    try {
        // find user from local storage
        const storedUser = localStorage.getItem("loggedInUser");
        // find token from user object
        const token = storedUser ? JSON.parse(storedUser).auth_token : null;
        // console.log("Token", token);
        if (!token) throw new Error("No token found");

        const res = await fetch(`${API_URL}/users`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Greška kod fetchovanja korisnika");

        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

// Post HTTP method. Ask Boris for route!!!
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
