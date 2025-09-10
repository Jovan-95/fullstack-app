import { LoginFormUser, PaginatedUser, ResetUserObj, User } from "../types";

const API_URL = "http://localhost:8000/api";

// Get Users with pagination and search HTTP method
export async function getUsers(
    page: number = 1,
    users_search: string = ""
): Promise<PaginatedUser> {
    try {
        const storedUser = localStorage.getItem("loggedInUser");
        const token = storedUser ? JSON.parse(storedUser).auth_token : null;
        if (!token) throw new Error("No token found");

        let url = `${API_URL}/users?page=${page}`;
        if (users_search.trim()) {
            url += `&users_search=${encodeURIComponent(users_search)}`;
        }

        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Greška kod fetchovanja korisnika");

        const data = await res.json();
        console.log("Get Users with search and pagination: ", data);
        return data; // Laravel pagination response
    } catch (err) {
        console.error(err);
        return {
            data: [],
            current_page: 1,
            first_page_url: "",
            from: 0,
            last_page: 1,
            last_page_url: "",
            links: [],
            next_page_url: "", // ako tvoj backend može biti null
            path: "",
            per_page: 0,
            prev_page_url: 0,
            to: 0,
            total: 0,
        };
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

// Upload / Change Avatar HTTP request
export async function uploadAvatar(file: File) {
    try {
        const storedUser = localStorage.getItem("loggedInUser");
        const token = storedUser ? JSON.parse(storedUser).auth_token : null;
        if (!token) throw new Error("No token found");

        const formData = new FormData();
        formData.append("profile_image", file);
        formData.append("_method", "PATCH");

        const res = await fetch(`${API_URL}/user/avatar`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application / json",
            },
            body: formData,
        });

        if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);

        const data = await res.json();
        console.log("Avatar upload response:", data);
        return data;
    } catch (err) {
        console.error("Avatar upload error:", err);
        throw err;
    }
}

// Delete HTTP method. Ask BE for route!!!
export async function deleteUser(userId: number) {
    try {
        const res = await fetch(`${API_URL}/users/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error(`${res.status}, ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        throw new Error("Failed to delete user: " + err);
    }
}

// Get All with pagination and search HTTP method
// !!! Ask for route and property names!!!
export async function getAll(page: number = 1, global_search: string = "") {
    try {
        const storedUser = localStorage.getItem("loggedInUser");
        const token = storedUser ? JSON.parse(storedUser).auth_token : null;
        if (!token) throw new Error("No token found");

        let url = `${API_URL}/search?page=${page}`;
        if (global_search.trim()) {
            url += `&global_search=${encodeURIComponent(global_search)}`;
        }

        const res = await fetch(url, {
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

// Forgot Password Post HTTP request
export async function forgotPasswordReq(email: string) {
    try {
        const res = await fetch(`${API_URL}/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ email }),
        });
        if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Reset Password Post HTTP request
export async function resetPasswordReq(resetUserObj: ResetUserObj) {
    try {
        const res = await fetch(`${API_URL}/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(resetUserObj),
        });
        if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}
