import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { getUsers } from "./services";

function App() {
    // Get users
    const {
        data: users,
        isLoading: usersIsLoading,
        error: usersError,
    } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    if (usersIsLoading) return <p>Loading...</p>;
    if (usersError) return <p>{usersError?.message}</p>;
    if (!users) return <p>No data found.</p>;

    return (
        <>
            <h1>Boris car</h1>
        </>
    );
}

export default App;
