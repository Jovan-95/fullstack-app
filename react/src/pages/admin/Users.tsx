import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/userServices";
import { NavLink } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";

function Users() {
    const [allUsers, setAllUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Get users.
    const {
        data: users,
        isLoading: usersIsLoading,
        error: usersError,
    } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    useEffect(() => {
        setAllUsers(users.data);
        setTotalPages(Math.ceil(users.total / users.per_page));
    }, [page]);

    // Error handling
    if (usersIsLoading) return <p>Loading...</p>;
    if (usersError) return <p>{usersError?.message}</p>;
    if (!users) return <p>No data found.</p>;

    return (
        <div className="users-page">
            <h1 className="users-title">Users</h1>

            <div className="users-grid">
                {/* Add TS types for single users */}
                {users.data.map((user) => (
                    <NavLink key={user.id} to={`/admin/users/${user.id}`}>
                        <div className="user-card">
                            <img src={user.profile_image} alt="User Avatar" />
                            <h2>{user.name}</h2>
                            <p>Email: {user.email}</p>
                            <button className="view-btn">View Profile</button>
                        </div>
                    </NavLink>
                ))}
            </div>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(page) => setPage(page)}
            />
        </div>
    );
}

export default Users;
