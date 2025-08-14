import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    return (
        <div className="auth-wrapper">
            <div className="form-wrapper">
                <div className="auth-logo">LMS</div>
                <div className="auth-heading">Register</div>
                <div className="input-wrapper">
                    <label>Username</label>
                    <input type="text" />
                </div>
                <div className="input-wrapper">
                    <label>Email</label>
                    <input type="email" />
                </div>
                <div className="input-wrapper">
                    <label>Password</label>
                    <input type="password" />
                </div>
                <div className="input-wrapper">
                    <label>Confirm Password</label>
                    <input type="password" />
                </div>
                <div className="button-wrapper">
                    <button className="btn btn-primary" type="submit">
                        <span>Register</span>
                    </button>
                </div>

                <p className="login-text">
                    Already have an account? Login{" "}
                    <span onClick={() => navigate("/login")}>here!</span>{" "}
                </p>
            </div>
        </div>
    );
}

export default Register;
