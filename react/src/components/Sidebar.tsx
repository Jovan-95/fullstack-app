import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <div className="sidebar-logo-wrapper">
                    <div className="sidebar-logo-text">LMS</div>
                </div>
                <div className="sidebar-nav-wrapper">
                    <NavLink to={"/"}>
                        <div className="sidebar-item">
                            <span>Dashboard</span>
                        </div>
                    </NavLink>

                    <>
                        <NavLink to={"/courses"}>
                            <div className="sidebar-item">
                                <span>Courses</span>
                            </div>
                        </NavLink>
                        <NavLink to={"/profile"}>
                            <div className="sidebar-item">
                                <span>Profile</span>
                            </div>
                        </NavLink>
                        <NavLink to={"/quiz"}>
                            <div className="sidebar-item">
                                <span>Quiz</span>
                            </div>
                        </NavLink>
                        <NavLink to={"/admin/users"}>
                            <div className="sidebar-item">
                                <span>Users</span>
                            </div>
                        </NavLink>

                        <NavLink to={"/admin/course-management"}>
                            <div className="sidebar-item">
                                <span>Management</span>
                            </div>
                        </NavLink>
                    </>
                </div>
                <div className="sidebar-bottom-wrapper">
                    <>
                        <div className="profile-info-wrapper">
                            <div className="sidebar-item">test@gmail.com</div>
                            <div className="sidebar-item">role</div>
                        </div>
                    </>
                    <div className="logout">
                        <div>
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
