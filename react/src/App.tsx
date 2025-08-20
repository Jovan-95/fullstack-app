/* eslint-disable @typescript-eslint/no-unused-vars */
import { lazy, Suspense } from "react";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SingleUser from "./pages/single-pages/SingleUser";

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
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />

                        <Route element={<Layout />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/quiz" element={<Quiz />} />
                            <Route path="/courses" element={<Courses />} />
                            <Route
                                path="/admin/course-management"
                                element={<CourseManagement />}
                            />
                            <Route path="/admin/users" element={<Users />} />
                            <Route
                                path="/admin/users/:id"
                                element={<SingleUser />}
                            />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
