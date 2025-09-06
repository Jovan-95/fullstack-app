/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUsers } from "../../services/userServices";
import Pagination from "../../components/Pagination";
import { DragAndDropResult, ListedUser, PaginatedUser } from "../../types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { useDebounce } from "../../hooks/useDebaunce";

function Users() {
    // Pagination
    const [page, setPage] = useState(1);

    // Drag and drop
    const [users, setUsers] = useState<ListedUser[]>([]);

    // Offline mode
    const isOnline = useOnlineStatus();

    // Search
    const [users_search, setUsersSearch] = useState("");
    const debouncedSearch = useDebounce(users_search, 1000); // čeka 500ms

    // Get users
    const {
        data: usersData,
        isLoading,
        isError,
        error,
    } = useQuery<PaginatedUser>({
        queryKey: ["users", page, debouncedSearch],
        queryFn: () => getUsers(page, debouncedSearch),
        staleTime: 1000 * 60 * 5, // 5 minuta čuvaj podatke sveži
        gcTime: 1000 * 60 * 30, // pola sata u memoriji
        retry: 1, // probaj samo jednom da refetchaš, pa fallback na cache
    });

    // console.log("data: usersData", usersData);

    // Drag and drop part
    useEffect(() => {
        if (usersData) {
            setUsers(usersData.data);
        }
    }, [usersData]);

    // Search user function
    // function handleSearch() {
    //     if (!users_search.trim()) {
    //         showErrorToast("Please enter a search term!");
    //         return;
    //     }
    // }

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>{(error as Error).message}</p>;
    if (!usersData || usersData.data.length === 0)
        return <p>No users found.</p>;

    // Drag and Drop function
    function handleOnDragEnd(result: DragAndDropResult) {
        // console.log(result);
        if (!result.destination) return;

        const items = Array.from(users);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setUsers(items);
    }

    // Offline mode if connection is lost
    if (!isOnline && users.length > 0) {
        return (
            <div className="users-page">
                <h1 className="users-title">Users</h1>
                <div className="offline-banner">
                    🚨 Offline Mode – prikazujemo poslednje sačuvane podatke
                </div>

                <div className="user-list users-grid">
                    {" "}
                    {/* lista usera iz cache-a */}
                    {users.map((user: ListedUser) => (
                        <NavLink to={`/admin/users/${user.id}`}>
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
                                <button className="view-btn">
                                    View Profile
                                </button>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        );
    }

    // Online regular
    return (
        <div className="users-page">
            <h1 className="users-title">Users</h1>
            <div className="search-wrapper">
                {/* <img alt="" /> */}
                {/* <button onClick={handleSearch} className="btn btn-primary">
                    <span>Search</span>
                </button> */}
                <input
                    style={{ width: "100%" }}
                    onChange={(e) => setUsersSearch(e.target.value)}
                    className="header-search"
                    placeholder="Search users..."
                    type="search"
                />
            </div>

            <DragDropContext onDragEnd={() => handleOnDragEnd}>
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
                                                <p>
                                                    Email:{" "}
                                                    <div>{user.email}</div>{" "}
                                                </p>
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
