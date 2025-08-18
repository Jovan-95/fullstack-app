/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { RegisterFormUser, User } from "../types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerNewUser } from "../services";

function Register() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [userObj, setUserObj] = useState<RegisterFormUser>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // HTTP POST
    const addUserMutation = useMutation({
        mutationFn: registerNewUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (err) => {
            alert("Registration failed!");
        },
    });

    // Email validation
    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        return regex.test(email);
    };

    // Register user
    function registerUser(e: React.FormEvent) {
        e.preventDefault();

        // Fields validation
        if (
            userObj.username === "" ||
            userObj.email === "" ||
            userObj.password === "" ||
            userObj.confirmPassword === ""
        )
            return alert("Fill all fields!");

        if (userObj.password.length < 6) {
            return alert("Password is too short!");
        }

        if (userObj.password !== userObj.confirmPassword) {
            return alert("Passwords are not matching!");
        }

        if (!validateEmail(userObj.email)) {
            return alert("Invalid Email!");
        }

        // User for sending
        const newUser: User = {
            id: Date.now().toString(),
            username: userObj.username,
            email: userObj.email,
            password: userObj.password,
            role: "user",
            status: "pending",
        };

        addUserMutation.mutate(newUser);
        navigate("/login");
        alert("Your acc is waiting for approval");

        // reset fields
        setUserObj({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    }

    return (
        <div className="auth-wrapper">
            <div className="form-wrapper">
                <div className="auth-logo">LMS</div>
                <div className="auth-heading">Register</div>
                <div className="input-wrapper">
                    <label>Username</label>
                    <input
                        onChange={(e) =>
                            setUserObj({ ...userObj, username: e.target.value })
                        }
                        value={userObj.username}
                        type="text"
                    />
                </div>
                <div className="input-wrapper">
                    <label>Email</label>
                    <input
                        onChange={(e) =>
                            setUserObj({ ...userObj, email: e.target.value })
                        }
                        value={userObj.email}
                        type="email"
                    />
                </div>
                <div className="input-wrapper">
                    <label>Password</label>
                    <input
                        onChange={(e) =>
                            setUserObj({ ...userObj, password: e.target.value })
                        }
                        value={userObj.password}
                        type="password"
                    />
                </div>
                <div className="input-wrapper">
                    <label>Confirm Password</label>
                    <input
                        onChange={(e) =>
                            setUserObj({
                                ...userObj,
                                confirmPassword: e.target.value,
                            })
                        }
                        value={userObj.confirmPassword}
                        type="password"
                    />
                </div>
                <div className="button-wrapper">
                    <button
                        onClick={registerUser}
                        className="btn btn-primary"
                        type="submit"
                    >
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
