/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { RegisterFormUser, User } from "../types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerNewUser } from "../services/userServices";

function Register() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [userObj, setUserObj] = useState<RegisterFormUser>({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        gender_id: 0,
    });

    // HTTP POST
    const addUserMutation = useMutation({
        mutationFn: registerNewUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["register"] });
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
            userObj.name === "" ||
            userObj.email === "" ||
            userObj.password === "" ||
            userObj.password_confirmation === ""
        )
            return alert("Fill all fields!");

        if (userObj.password.length < 8) {
            return alert("Password is too short!");
        }

        if (userObj.password !== userObj.password_confirmation) {
            return alert("Passwords are not matching!");
        }

        if (!validateEmail(userObj.email)) {
            return alert("Invalid Email!");
        }

        // User for sending
        const newUser: User = {
            name: userObj.name,
            username: userObj.username,
            email: userObj.email,
            password: userObj.password,
            password_confirmation: userObj.password_confirmation,
            gender_id: Number(userObj.gender_id),
        };

        console.log("Register", newUser);

        addUserMutation.mutate(newUser);
        navigate("/login");
        alert("Your acc is waiting for approval");

        // reset fields
        setUserObj({
            name: "",
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            gender_id: 0,
        });
    }

    return (
        <div className="auth-wrapper">
            <div className="form-wrapper">
                <div className="auth-logo">LMS</div>
                <div className="auth-heading">Register</div>
                <div className="input-wrapper">
                    <label>Name</label>
                    <input
                        onChange={(e) =>
                            setUserObj({ ...userObj, name: e.target.value })
                        }
                        value={userObj.name}
                        type="text"
                    />
                </div>
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
                                password_confirmation: e.target.value,
                            })
                        }
                        value={userObj.password_confirmation}
                        type="password"
                    />
                </div>
                <div className="input-wrapper">
                    <label>Gender</label>
                    <div className="radio-buttons">
                        <label className="radio-label">
                            <input
                                onChange={(e) =>
                                    setUserObj({
                                        ...userObj,
                                        gender_id: 1,
                                    })
                                }
                                type="radio"
                                name="gender"
                                value="male"
                            />
                            <span className="custom-radio"></span>
                            Male
                        </label>

                        <label className="radio-label">
                            <input
                                onChange={(e) =>
                                    setUserObj({
                                        ...userObj,
                                        gender_id: 2,
                                    })
                                }
                                type="radio"
                                name="gender"
                                value="female"
                            />
                            <span className="custom-radio"></span>
                            Female
                        </label>
                    </div>
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
