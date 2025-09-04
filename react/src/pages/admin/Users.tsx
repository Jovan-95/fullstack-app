/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUsers, searchUsers } from "../../services/userServices";
import Pagination from "../../components/Pagination";
import { ListedUser } from "../../types";
import { showErrorToast } from "../../components/Toast";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

function Users() {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();

    // Drag and drop
    const [users, setUsers] = useState<ListedUser[]>([]);
    // Offline mode
    const isOnline = useOnlineStatus();

    // Search
    const [query, setQuery] = useState("");

    // Get users
    const {
        data: usersData,
        isLoading,
        isError,
        isFetching,
        error,
    } = useQuery({
        queryKey: ["users", page],
        queryFn: () => getUsers(page),
        staleTime: 1000 * 60 * 5, // 5 minuta čuvaj podatke sveži
        cacheTime: 1000 * 60 * 30, // pola sata u memoriji
        retry: 1, // probaj samo jednom da refetchaš, pa fallback na cache
    });

    useEffect(() => {
        if (usersData?.data) {
            setUsers(usersData.data);
        }
    }, [usersData]);

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
    if (isError) return <p>{(error as Error).message}</p>;
    if (!usersData || usersData.data.length === 0)
        return <p>No users found.</p>;

    // funkcija koja menja redosled kad prevučeš
    function handleOnDragEnd(result: DropResult) {
        if (!result.destination) return;

        const items = Array.from(users);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setUsers(items);
    }
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

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="users">
                    {(provided) => (
                        <div
                            className="user-list users-grid"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {users.map((user: ListedUser, index: number) => (
                                <Draggable
                                    key={user.id}
                                    draggableId={String(user.id)}
                                    index={index}
                                >
                                    {(provided) => (
                                        <NavLink to={`/admin/users/${user.id}`}>
                                            <div
                                                className="user-card"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <img
                                                    src={
                                                        user.profile_image ||
                                                        "https://via.placeholder.com/100"
                                                    }
                                                    alt="User Avatar"
                                                />
                                                <h2>{user.name}</h2>
                                                <p>Email: {user.email}</p>
                                                <button className="view-btn">
                                                    View Profile
                                                </button>
                                            </div>
                                        </NavLink>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <Pagination
                currentPage={usersData.current_page}
                lastPage={usersData.last_page}
                onPageChange={(p) => setPage(p)}
            />
        </div>
    );
}

export default Users;
