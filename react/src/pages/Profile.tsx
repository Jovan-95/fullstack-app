/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Modal from "../components/Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "../services/userServices";
import { User } from "../types";
import { showErrorToast, showSuccessToast } from "../components/Toast";

function Profile() {
    const queryClient = useQueryClient();
    const [modal, setModal] = useState<boolean>(false);

    // Edit user fields
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedInUser
    );
    console.log("Logged user:", loggedUser);

    // Patch HTTP method Edit user
    const { mutate: editUserFormFields } = useMutation({
        mutationFn: ({
            userId,
            editedObj,
        }: {
            userId: string;
            editedObj: Partial<User>; // Use Partial<User> for type safety
        }) => editUser(userId, editedObj),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        },
        onError: (error: any) => {
            showErrorToast(error?.message || "Failed to update user");
        },
    });

    // Edit modal
    function editModal() {
        setModal(true);
        setUsername(loggedUser?.username);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Add error messages later
        if (password !== confirmPassword) {
            return showErrorToast("Passwords do not match");
        }

        if (!username || !email || !password) {
            return showErrorToast("All fields are required");
        }

        // Edited Obj for sending
        const editedObj = {
            username,
            password,
        };

        editUserFormFields({ userId: String(loggedUser?.id), editedObj });
        showSuccessToast("Changes are saved!");
        setModal(false);
    }
    return (
        <div className="profile-page">
            <div className="profile-header card">
                <div className="cover"></div>

                <div className="profile-top">
                    <div className="avatar-wrap">
                        <img
                            className="avatar"
                            src={loggedUser?.profile_image}
                            alt="User avatar"
                        />
                        <button className="btn btn-primary btn-sm change-photo">
                            Change
                        </button>
                    </div>

                    <div className="identity">
                        <h1 className="name">{loggedUser?.name}</h1>
                        <div className="meta">
                            <span className="role badge">
                                {" "}
                                {loggedUser?.roles[0]}
                            </span>
                            <span className="email">{loggedUser.email}</span>
                            <span className="username">
                                {loggedUser.username}
                            </span>
                        </div>
                        <div className="actions">
                            <button
                                onClick={editModal}
                                className="btn btn-primary"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                <div className="tabs">
                    <button className="tab active">Overview</button>

                    <button className="tab">Settings</button>
                </div>
            </div>

            <div className="profile-grid">
                <aside className="left-column">
                    <div className="card info-card">
                        <h3>Basic Info</h3>
                        <ul className="info-list">
                            <li>
                                <span>Full name</span>
                                <strong>{loggedUser?.name}</strong>
                            </li>
                            <li>
                                <span>Username</span>
                                <strong>{loggedUser?.username}</strong>
                            </li>
                            <li>
                                <span>Email</span>
                                <strong>{loggedUser?.email}</strong>
                            </li>
                            <li>
                                <span>Gender</span>
                                <strong>{loggedUser?.gender?.name}</strong>
                            </li>

                            <li>
                                <span>Role</span>
                                <strong className="pill success">
                                    {loggedUser?.roles[0]}
                                </strong>
                            </li>
                        </ul>
                    </div>
                </aside>

                <main className="right-column">
                    <div className="card timeline-card">
                        <h3>Recent Activity</h3>
                        <ul className="timeline">
                            <li>
                                <span className="dot"></span>
                                <div className="item">
                                    <div className="title">
                                        Published new course “Advanced React
                                        Patterns”
                                    </div>
                                    <div className="time">Today • 10:24</div>
                                </div>
                            </li>
                            <li>
                                <span className="dot"></span>
                                <div className="item">
                                    <div className="title">
                                        Updated lesson “Redux Toolkit Basics”
                                    </div>
                                    <div className="time">
                                        Yesterday • 18:03
                                    </div>
                                </div>
                            </li>
                            <li>
                                <span className="dot"></span>
                                <div className="item">
                                    <div className="title">
                                        Replied to 4 Q&A messages
                                    </div>
                                    <div className="time">Aug 10 • 14:55</div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="card settings-card">
                        <h3>Quick Settings</h3>
                        <div className="settings-grid">
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                                <span className="label">Public profile</span>
                            </label>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                                <span className="label">
                                    Email notifications
                                </span>
                            </label>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                                <span className="label">Two-factor auth</span>
                            </label>
                        </div>
                    </div>
                </main>
            </div>

            {/* Edit modal */}
            <div className={modal ? "d-block" : "d-none"}>
                <Modal>
                    <div
                        className="p-20"
                        onClick={() => setModal(false)}
                        style={{
                            textAlign: "right",
                            cursor: "pointer",
                            color: "black",
                        }}
                    >
                        X
                    </div>
                    <form className="auth-form">
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-input"
                                placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                disabled
                                type="email"
                                id="email"
                                className="form-input"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-input"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="form-input"
                                placeholder="Repeat password"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                value={confirmPassword}
                            />
                        </div>
                        <button
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                            className="btn btn--primary"
                        >
                            <span>Save</span>
                        </button>
                    </form>
                </Modal>
            </div>
        </div>
    );
}

export default Profile;
