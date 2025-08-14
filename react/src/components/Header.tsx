import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const date = new Date();
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
            </div>
        </div>
    );
}

export default Header;
