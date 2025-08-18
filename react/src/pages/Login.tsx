/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormUser } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, loginUser } from "../services/userServices";
import { addLoggedUser } from "../redux/slice";
import { RootState } from "../redux/store";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const [loginUserObj, setLoginUserObj] = useState<LoginFormUser>({
        email: "",
        password: "",
    });

    // Get logged user from Redux
    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedInUser
    );
    console.log("Logged user", loggedUser);

    // Get users. !!! Check HTTP with Boris to get users from BE
    // const {
    //     data: users,
    //     isLoading: usersIsLoading,
    //     error: usersError,
    // } = useQuery({
    //     queryKey: ["users"],
    //     queryFn: getUsers,
    // });

    // HTTP POST, BE vraca Usera
    const loginUserMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if (data && data.status) {
                // Dispatch u Redux
                dispatch(
                    addLoggedUser({
                        ...data.data, // id, name, email, roles
                        auth_token: data.auth_token, // auth_token iz response
                    })
                );

                // Navigacija na home
                navigate("/");
            }
        },
        onError: (err) => {
            alert("Login failed!");
        },
    });

    // Login
    function handleUserLogin(e: React.FormEvent) {
        e.preventDefault();

        // Comparing login credentials with registered users
        // const user = users.find(
        //     (user: User) =>
        //         user.email === loginUserObj.email &&
        //         user.password === loginUserObj.password
        // );

        // if (!user) {
        //     alert("Wrong credentials!");
        //     return;
        // }

        // if (user.status === "banned") {
        //     alert("You are banned!");
        //     return;
        // }

        // if (user.status === "rejected") {
        //     alert("You are rejected!");
        //     return;
        // }

        // if (user.status === "pending") {
        //     alert("Your registration is waiting for approval!");
        //     return;
        // }

        // // Keeping user in Redux and in Local
        // if (user) {
        //     alert("Credentials are matching!");
        //     dispatch(addLoggedUser(user));
        //     navigate("/");
        // }

        // User for sending
        const loggedUser: LoginFormUser = {
            email: loginUserObj.email,
            password: loginUserObj.password,
        };

        loginUserMutation.mutate(loggedUser);
    }

    // Error handling
    // if (usersIsLoading) return <p>Loading...</p>;
    // if (usersError) return <p>{usersError?.message}</p>;
    // if (!users) return <p>No data found.</p>;
    return (
        <div className="auth-wrapper">
            <div className="form-wrapper">
                <div className="auth-logo">LMS</div>
                <div className="auth-heading">Login</div>

                <form>
                    <div className="input-wrapper">
                        <label>Email</label>
                        <input
                            onChange={(e) =>
                                setLoginUserObj({
                                    ...loginUserObj,
                                    email: e.target.value,
                                })
                            }
                            value={loginUserObj.email}
                            type="email"
                        />
                    </div>
                    <div className="input-wrapper">
                        <label>Password</label>
                        <input
                            onChange={(e) =>
                                setLoginUserObj({
                                    ...loginUserObj,
                                    password: e.target.value,
                                })
                            }
                            value={loginUserObj.password}
                            type="password"
                        />
                    </div>

                    <div className="button-wrapper">
                        <button
                            onClick={handleUserLogin}
                            className="btn btn-primary"
                            type="submit"
                        >
                            <span>Login</span>
                        </button>
                    </div>
                </form>

                <p className="login-text">
                    Forgot password? Click{" "}
                    <span onClick={() => navigate("/forgot-password")}>
                        here!
                    </span>{" "}
                </p>

                <p className="login-text">
                    Don't have an account? Register{" "}
                    <span onClick={() => navigate("/register")}>here!</span>{" "}
                </p>
                <p className="login-text">
                    You can <span onClick={() => navigate("/")}>browse</span>{" "}
                    without account, but you cant see all pages!
                </p>
            </div>
        </div>
    );
}

export default Login;
