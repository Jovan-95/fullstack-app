/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getUsers, searchUsers } from "../../services/userServices";
import Pagination from "../../components/Pagination";
import { ListedUser } from "../../types";
import { showErrorToast } from "../../components/Toast";

function Users() {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();

    // Search
    const [query, setQuery] = useState("");

    // Get users
    const {
        data: usersData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["users", page],
        queryFn: () => getUsers(page),
    });

    // HTTP POST Search user
    const searchUserMutation = useMutation({
        mutationFn: searchUsers,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["search", query] });
        },
        onError: (err) => {
            showErrorToast("Search failed!");
        },
    });

    // Search user function
    function handleSearch() {
        if (!query.trim()) {
            showErrorToast("Please enter a search term!");
            return;
        }
        searchUserMutation.mutate(query);
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{(error as Error).message}</p>;
    if (!usersData || usersData.data.length === 0)
        return <p>No users found.</p>;

    return (
        <div className="users-page">
            <h1 className="users-title">Users</h1>
            <div className="search-wrapper">
                {/* <img alt="" /> */}
                <button onClick={handleSearch} className="btn btn-primary">
                    <span>Search</span>
                </button>
                <input
                    onChange={(e) => setQuery(e.target.value)}
                    className="header-search"
                    placeholder="Search users..."
                    type="search"
                />
            </div>

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
