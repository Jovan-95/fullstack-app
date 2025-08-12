// Get HTTP method

export async function getUsers() {
    try {
        const res = await fetch(`$http://localhost:8000/api/users`);
        if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}
