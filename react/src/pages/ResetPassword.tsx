import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPasswordReq } from "../services/userServices";
import { showErrorToast, showSuccessToast } from "../components/Toast";

function ResetPassword() {
    const navigate = useNavigate();

    const [resetUserObj, setResetUserObj] = useState({
        email: "",
        token: "",
        password: "",
        password_confirmation: "",
    });

    // HTTP POST
    const resetPassMutation = useMutation({
        mutationFn: resetPasswordReq,
        onSuccess: (data) => {
            if (data && data.status) {
                showSuccessToast("Reset is successfull!");
            }
        },
        onError: () => {
            showErrorToast("Error!");
        },
    });

    function handleResetPass() {
        if (
            resetUserObj.password === "" ||
            resetUserObj.password_confirmation === ""
        )
            return showErrorToast("Fields are empty!");

        if (resetUserObj.password !== resetUserObj.password_confirmation)
            return showErrorToast("Password are not mathcing!");

        if (resetUserObj.password.length > 8)
            return showErrorToast("Password to short!");

        resetPassMutation.mutate(resetUserObj);
    }

    return (
        <div className="auth-wrapper">
            <div className="form-wrapper">
                <div className="auth-logo">LMS</div>
                <div className="auth-heading">Reset Password</div>

                <div className="input-wrapper">
                    <label>Password</label>
                    <input
                        onChange={(e) =>
                            setResetUserObj({
                                ...resetUserObj,
                                password: e.target.value,
                            })
                        }
                        value={resetUserObj.password}
                        type="password"
                    />
                </div>
                <div className="input-wrapper">
                    <label>Confirm Password</label>
                    <input
                        onChange={(e) =>
                            setResetUserObj({
                                ...resetUserObj,
                                password_confirmation: e.target.value,
                            })
                        }
                        value={resetUserObj.password_confirmation}
                        type="password"
                    />
                </div>

                <div className="button-wrapper">
                    <button
                        onClick={handleResetPass}
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

export default ResetPassword;
