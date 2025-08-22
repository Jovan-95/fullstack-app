import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getUsers } from "../../services/userServices";
import Pagination from "../../components/Pagination";
import { ListedUser } from "../../types";

function Users() {
    const [page, setPage] = useState(1);

    const {
        data: usersData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["users", page],
        queryFn: () => getUsers(page),
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{(error as Error).message}</p>;
    if (!usersData || usersData.data.length === 0)
        return <p>No users found.</p>;

    return (
        <div className="users-page">
            <h1 className="users-title">Users</h1>

            <div className="users-grid">
                {usersData.data.map((user: ListedUser) => (
                    <NavLink key={user.id} to={`/admin/users/${user.id}`}>
                        <div className="user-card">
                            <img
                                src={
                                    user.profile_image ||
                                    "https://via.placeholder.com/100"
                                }
                                alt="User Avatar"
                            />
                            <h2>{user.name}</h2>
                            <p>Email: {user.email}</p>
                            <button className="view-btn">View Profile</button>
                        </div>
                    </NavLink>
                ))}
            </div>

            <Pagination
                currentPage={usersData.current_page}
                lastPage={usersData.last_page}
                onPageChange={(p) => setPage(p)}
            />
        </div>
    );
}

export default Users;
