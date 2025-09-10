import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordReq } from "../services/userServices";
import { showErrorToast, showSuccessToast } from "../components/Toast";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    // HTTP POST
    const forgotPassMutation = useMutation({
        mutationFn: forgotPasswordReq,
        onSuccess: (data) => {
            if (data && data.status) {
                showSuccessToast("Instruction are sent to your email!");
            }
        },
        onError: () => {
            showErrorToast("Error!");
        },
    });

    function handleForgotPass() {
        if (email === "") return showErrorToast("Field is empty!");

        forgotPassMutation.mutate(email);
    }

    return (
        <div className="auth-wrapper">
            <div className="form-wrapper">
                <div className="auth-logo">LMS</div>
                <div className="auth-heading">Forgot Password?</div>

                <div className="input-wrapper">
                    <label>Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />
                </div>

                <div className="button-wrapper">
                    <button
                        onClick={handleForgotPass}
                        className="btn btn-primary"
                        type="submit"
                    >
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
