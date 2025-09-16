/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAll, logoutUser } from "../services/userServices";
import { removeUser } from "../redux/slice";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebaunce";
import Modal from "./Modal";
import Pagination from "./Pagination";
import MobileModal from "./MobileModal";
import { showErrorToast } from "./Toast";
import { SearchedResult } from "../types";

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

    // mobile nav modal
    const [mobModal, setMobModal] = useState<boolean>(false);

    // Search all term
    const [searchAll, setSearchAll] = useState<string>("");
    const debouncedSearchAll = useDebounce(searchAll, 2000);

    // Pagination
    const [page, setPage] = useState(1);

    // Get all HTTP req
    const {
        data: searchData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["search", page, debouncedSearchAll],
        queryFn: () => getAll(page, debouncedSearchAll),
        enabled: !!debouncedSearchAll, // poziva se samo kad postoji search term
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
    });
    console.log("!!! Global search data: ", searchData);

    // Reset nakon promene search inputa
    useEffect(() => {
        setPage(1);
    }, [debouncedSearchAll]);

    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedInUser
    );
    // console.log("logged user", loggedUser);

    // HTTP POST
    const logoutUserMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            // Čišćenje localStorage
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("auth_token");

            // Redux
            dispatch(removeUser());

            // Navigation
            navigate("/login");
        },
        onError: () => {
            showErrorToast("Logout failed!");
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
        <>
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
                        {/* Global search dp */}
                        {searchAll ? (
                            <>
                                <div className="search-results-wrapper">
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
                                    <div className="searched-results">
                                        {searchData?.data.map(
                                            (searchedUser: SearchedResult) => (
                                                <NavLink
                                                    to={`/admin/users/${searchedUser.id}`}
                                                    key={searchedUser.id}
                                                >
                                                    <div className="result">
                                                        {searchedUser.name}
                                                    </div>
                                                </NavLink>
                                            )
                                        )}
                                    </div>
                                    <Pagination
                                        currentPage={
                                            searchData?.meta.current_page
                                        }
                                        lastPage={searchData?.meta.last_page}
                                        onPageChange={(p: number) => setPage(p)}
                                    />
                                </div>
                            </>
                        ) : (
                            ""
                        )}
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
                                <img
                                    onClick={() => navigate("/profile")}
                                    alt=""
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile header wrapper */}
            <div className="mobile-header-wrapper">
                <div className="hamburger-wrapper">
                    <svg
                        onClick={() => setMobModal(true)}
                        viewBox="0 0 100 80"
                        width="40"
                        height="40"
                    >
                        <rect fill="#fff" width="80" height="20" rx="10"></rect>
                        <rect
                            fill="#fff"
                            y="30"
                            width="80"
                            height="20"
                            rx="10"
                        ></rect>
                        <rect
                            fill="#fff"
                            y="60"
                            width="80"
                            height="20"
                            rx="10"
                        ></rect>
                    </svg>
                </div>
                {mobModal ? (
                    <div className="navigation">
                        <MobileModal>
                            <>
                                {" "}
                                <div
                                    onClick={() => setMobModal(false)}
                                    className="p-20"
                                    style={{
                                        textAlign: "right",
                                        cursor: "pointer",
                                        color: "white",
                                    }}
                                >
                                    X
                                </div>
                                <NavLink
                                    to={"/"}
                                    onClick={() => setMobModal(false)}
                                >
                                    <div className="sidebar-item">
                                        <span>Dashboard</span>
                                    </div>
                                </NavLink>
                                <NavLink
                                    to={"/courses"}
                                    onClick={() => setMobModal(false)}
                                >
                                    <div className="sidebar-item">
                                        <span>Courses</span>
                                    </div>
                                </NavLink>
                                <NavLink
                                    to={"/profile"}
                                    onClick={() => setMobModal(false)}
                                >
                                    <div className="sidebar-item">
                                        <span>Profile</span>
                                    </div>
                                </NavLink>
                                <NavLink
                                    to={"/quiz"}
                                    onClick={() => setMobModal(false)}
                                >
                                    <div className="sidebar-item">
                                        <span>Quiz</span>
                                    </div>
                                </NavLink>
                                <NavLink
                                    to={"/admin/users"}
                                    onClick={() => setMobModal(false)}
                                >
                                    <div className="sidebar-item">
                                        <span>Users</span>
                                    </div>
                                </NavLink>
                                <NavLink
                                    to={"/admin/course-management"}
                                    onClick={() => setMobModal(false)}
                                >
                                    <div className="sidebar-item">
                                        <span>Management</span>
                                    </div>
                                </NavLink>
                                {loggedUser ? (
                                    <div>
                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-primary"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <button
                                            onClick={() => navigate("/login")}
                                            className="btn btn-primary"
                                        >
                                            Login
                                        </button>
                                    </div>
                                )}
                            </>
                        </MobileModal>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}

export default Header;
