/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/userServices";
import { removeUser } from "../redux/slice";

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

    function handleLogout() {
        logoutUserMutation.mutate();
    }
    return (
        <div className="header-wrapper">
            <div className="header">
                <div className="search-wrapper">
                    <img alt="" />
                    <input
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
                        <div className="img-wrapper">
                            <img
                                src={loggedUser?.profile_image}
                                onClick={() => navigate("/profile")}
                                alt=""
                            />
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
        </div>
    );
}

export default Header;
