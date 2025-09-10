/* eslint-disable @typescript-eslint/no-unused-vars */
import { lazy, Suspense } from "react";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SingleUser from "./pages/single-pages/SingleUser";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { ToastContainer } from "react-toastify";
import ResetPassword from "./pages/ResetPassword";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Courses = lazy(() => import("./pages/Courses"));

// Admin
const CourseManagement = lazy(() => import("./pages/admin/CourseManagement"));
const Users = lazy(() => import("./pages/admin/Users"));

function App() {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<h2>Loading...</h2>}>
                    <ToastContainer position="top-right" autoClose={3000} />
                    <Routes>
                        <Route
                            path="/register"
                            element={
                                <PublicRoute>
                                    <Register />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="/reset-password"
                            element={<ResetPassword />}
                        />

                        <Route element={<Layout />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoute>
                                        <Profile />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/quiz"
                                element={
                                    <PrivateRoute>
                                        <Quiz />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/courses"
                                element={
                                    <PrivateRoute>
                                        <Courses />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/admin/course-management"
                                element={
                                    <PrivateRoute>
                                        <CourseManagement />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/admin/users"
                                element={
                                    <PrivateRoute>
                                        <Users />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/admin/users/:id"
                                element={
                                    <PrivateRoute>
                                        <SingleUser />
                                    </PrivateRoute>
                                }
                            />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
