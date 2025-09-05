/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAll, logoutUser } from "../services/userServices";
import { removeUser } from "../redux/slice";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebaunce";
import Modal from "./Modal";
import Pagination from "./Pagination";

function Header() {
    const navigate = useNavigate();
    const date = new Date();
    const dispatch = useDispatch();
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const formattedTime = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    // Search all term
    const [searchAll, setSearchAll] = useState<string>("");
    const debouncedSearchAll = useDebounce(searchAll, 1000);

    // Pagination
    const [page, setPage] = useState(1);

    // Get all HTTP req
    /* Check BE for name property */
    const {
        data: searchData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["globalSearch", page, debouncedSearchAll],
        queryFn: () => getAll(page, debouncedSearchAll),
        enabled: !!debouncedSearchAll, // poziva se samo kad postoji search term
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
        retry: 1,
    });

    // Reset nakon promene search inputa
    useEffect(() => {
        setPage(1);
    }, [debouncedSearchAll]);

    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedInUser
    );

    // HTTP POST
    const logoutUserMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: (data) => {
            // Čišćenje localStorage
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("auth_token");

            // Redux
            dispatch(removeUser());

            // Navigation
            navigate("/login");
        },
        onError: (err) => {
            alert("Logout failed!");
        },
    });

    // Error handling
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error</p>;
    // if (!searchData) return <p>No data found.</p>;

    function handleLogout() {
        logoutUserMutation.mutate();
    }
    return (
        <div className="header-wrapper">
            <div className="header">
                <div className="search-wrapper">
                    <img alt="" />
                    <input
                        onChange={(e) => setSearchAll(e.target.value)}
                        value={searchAll}
                        className="header-search"
                        placeholder="Search..."
                        type="search"
                    />
                </div>
                <div className="time-wrapper">
                    <div className="time">{formattedDate}</div>
                    <div className="time">{formattedTime}</div>
                </div>

                {loggedUser ? (
                    <div className="profile-wrapper">
                        <div>
                            <button
                                onClick={handleLogout}
                                className="btn btn-primary"
                            >
                                Logout
                            </button>
                        </div>

                        <div>
                            <img alt="" />
                        </div>
                        <div
                            onClick={() => navigate("/profile")}
                            className="img-wrapper"
                        >
                            <img
                                src={loggedUser?.profile_image}
                                onClick={() => navigate("/profile")}
                                alt=""
                            />
                            <p>{loggedUser.username}</p>
                        </div>
                    </div>
                ) : (
                    <div className="profile-wrapper">
                        <div>
                            <button
                                onClick={() => navigate("/login")}
                                className="btn btn-primary"
                            >
                                Login
                            </button>
                        </div>

                        <div>
                            <img alt="" />
                        </div>
                        <div className="img-wrapper">
                            <img onClick={() => navigate("/profile")} alt="" />
                        </div>
                    </div>
                )}
            </div>
            {searchAll ? (
                <Modal>
                    <>
                        {" "}
                        <div
                            className="p-20"
                            onClick={() => setSearchAll("")}
                            style={{
                                textAlign: "right",
                                cursor: "pointer",
                                color: "black",
                            }}
                        >
                            X
                        </div>
                        {/* Check BE for name property */}
                        <Pagination
                            // currentPage={searchData.current_page}
                            // lastPage={searchData.last_page}
                            onPageChange={(p: number) => setPage(p)}
                        />
                    </>
                </Modal>
            ) : (
                ""
            )}
        </div>
    );
}

export default Header;
