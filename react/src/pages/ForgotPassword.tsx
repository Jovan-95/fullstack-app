import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    return (
        <div className="auth-wrapper">
            <div className="form-wrapper">
                <div className="auth-logo">LMS</div>
                <div className="auth-heading">Forgot Password?</div>

                <div className="input-wrapper">
                    <label>Email</label>
                    <input type="email" />
                </div>

                <div className="button-wrapper">
                    <button className="btn btn-primary" type="submit">
                        <span>Continue</span>
                    </button>
                </div>

                <p className="login-text">
                    Don't have an account? Register{" "}
                    <span onClick={() => navigate("/register")}>here!</span>{" "}
                </p>
                <p className="login-text">
                    Back to login? Login{" "}
                    <span onClick={() => navigate("/login")}>here!</span>{" "}
                </p>
                <p className="login-text">
                    You can <span onClick={() => navigate("/")}>browse</span>{" "}
                    without account, but you cant see all pages!
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
