// Get HTTP method

export async function getUsers() {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/admin`);
        if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}
