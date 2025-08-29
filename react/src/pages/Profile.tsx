/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Modal from "../components/Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "../services/userServices";
import { User } from "../types";
import { showErrorToast, showSuccessToast } from "../components/Toast";
import { updateLoggedInUser } from "../redux/slice";

function Profile() {
    const queryClient = useQueryClient();
    const [modal, setModal] = useState<boolean>(false);
    const dispatch = useDispatch();

    // Edit user fields
    const [editedUserObj, setEditedUserObj] = useState({
        name: "",
        username: "",
        password: "",
        password_confirmation: "",
        gender_id: 0,
    });

    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedInUser
    );
    // console.log("Logged user:", loggedUser);

    //// Patch HTTP method Edit user
    const { mutate: editUserFormFields } = useMutation({
        mutationFn: ({
            editedObj,
        }: {
            editedObj: Partial<User>; // Use Partial<User> for type safety
        }) => editUser(editedObj),
        onSuccess: (data) => {
            // Azuriranje usera i u Reduxu da bi videli najnovije promene
            dispatch(updateLoggedInUser(data.data));

            // Osveži localStorage
            const storedUser = JSON.parse(
                localStorage.getItem("loggedInUser") || "{}"
            );
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify({ ...storedUser, ...data.data })
            );

            queryClient.invalidateQueries(["settings"]);
        },
        onError: (error: any) => {
            showErrorToast(error?.message || "Failed to update user");
        },
    });

    // Edit modal
    function editModal() {
        setModal(true);

        setEditedUserObj({
            name: loggedUser?.name,
            username: loggedUser?.username,
            password: "",
            password_confirmation: "",
            gender_id: loggedUser?.gender_id,
        });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Add error messages later
        if (editedUserObj.password !== editedUserObj.password_confirmation) {
            return showErrorToast("Passwords do not match");
        }

        if (
            !editedUserObj.username ||
            !editedUserObj.name ||
            !editedUserObj.password
        ) {
            return showErrorToast("All fields are required");
        }

        // Edited Obj for sending
        console.log("Edited user obj:", editedUserObj);

        // Patch request sending Edited user obj
        editUserFormFields({
            editedObj: editedUserObj,
        });

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
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-input"
                                placeholder="Enter name"
                                onChange={(e) =>
                                    setEditedUserObj({
                                        ...editedUserObj,
                                        name: e.target.value,
                                    })
                                }
                                value={editedUserObj.name}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-input"
                                placeholder="Enter username"
                                onChange={(e) =>
                                    setEditedUserObj({
                                        ...editedUserObj,
                                        username: e.target.value,
                                    })
                                }
                                value={editedUserObj.username}
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
                        <div
                            style={{ color: "black" }}
                            className="input-wrapper"
                        >
                            <label>Gender</label>
                            <div
                                style={{
                                    color: "black",
                                }}
                                className="radio-buttons"
                            >
                                <label
                                    style={{
                                        marginInline: "16px",
                                    }}
                                    className="radio-label"
                                >
                                    <input
                                        type="radio"
                                        name="gender"
                                        onChange={(e) =>
                                            setEditedUserObj({
                                                ...editedUserObj,
                                                gender_id: 1,
                                            })
                                        }
                                        value="male"
                                    />
                                    <span className="custom-radio"></span>
                                    Male
                                </label>

                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="gender"
                                        onChange={(e) =>
                                            setEditedUserObj({
                                                ...editedUserObj,
                                                gender_id: 2,
                                            })
                                        }
                                        value="female"
                                    />
                                    <span className="custom-radio"></span>
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-input"
                                placeholder="Enter password"
                                onChange={(e) =>
                                    setEditedUserObj({
                                        ...editedUserObj,
                                        password: e.target.value,
                                    })
                                }
                                value={editedUserObj.password}
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
                                    setEditedUserObj({
                                        ...editedUserObj,
                                        password_confirmation: e.target.value,
                                    })
                                }
                                value={editedUserObj.password_confirmation}
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
