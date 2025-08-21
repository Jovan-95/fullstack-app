import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Modal from "../components/Modal";
import { useState } from "react";

function Profile() {
    const [modal, setModal] = useState<boolean>(false);

    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedInUser
    );
    console.log(loggedUser);

    // Edit modal
    function editModal() {
        setModal(true);
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

                    {/* <ul className="stats">
                        <li>
                            <span className="label">Courses</span>
                            <span className="value">12</span>
                        </li>
                        <li>
                            <span className="label">Students</span>
                            <span className="value">358</span>
                        </li>
                        <li>
                            <span className="label">Rating</span>
                            <span className="value">4.8</span>
                        </li>
                    </ul> */}
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

                    {/* <div className="card skills-card">
                        <h3>Skills</h3>
                        <div className="chips">
                            <span className="chip">React</span>
                            <span className="chip">Laravel</span>
                            <span className="chip">Tailwind</span>
                            <span className="chip">Docker</span>
                        </div>
                    </div> */}
                </aside>

                <main className="right-column">
                    {/* <div className="card about-card">
                        <h3>About</h3>
                        <p>
                            Instructor with focus on modern JS and PHP
                            ecosystems. Passionate about developer experience,
                            clean architecture and teaching.
                        </p>
                    </div> */}

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
                            />
                        </div>
                        <button type="submit" className="btn btn--primary">
                            <span>Save</span>
                        </button>
                    </form>
                </Modal>
            </div>
        </div>
    );
}

export default Profile;
