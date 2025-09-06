/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from "../../services/userServices";
import { useState } from "react";
import Modal from "../../components/Modal";

function SingleUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    // const queryClient = useQueryClient();
    const [modal, setModal] = useState<boolean>(false);

    // Get users
    const {
        data: users,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(),
    });

    // const deleteUserMutation = useMutation({
    //     mutationFn: deleteUser,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["users"] });
    //         showSuccessToast("User deleted successfully!");
    //     },
    //     onError: () => {
    //         showErrorToast("Failed to delete user!");
    //     },
    // });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{(error as Error).message}</p>;
    if (!users) return <p>No data found.</p>;

    const singleUser = users.data.find((user) => user.id === Number(id));
    console.log("Single User", singleUser);
    if (!singleUser) return <p>User not found.</p>;

    // Open Delete modal
    function handleDeleteModal() {
        setModal(true);
    }

    // Delete user
    function handleUserDelete() {}
    return (
        <div className="single-user">
            <div className="user-card">
                <div className="user-header">
                    <img
                        src={
                            singleUser.profile_image ||
                            "https://via.placeholder.com/120"
                        }
                        alt="Profile picture"
                        className="user-avatar"
                    />
                    <div className="user-info">
                        <h2 className="user-name">{singleUser.name}</h2>
                        <p className="user-email">{singleUser.email}</p>
                        <span className="user-role">
                            {singleUser?.roles.map((role) => (
                                <span key={role.id}>{role.name}</span>
                            ))}
                        </span>
                    </div>
                </div>

                <div className="user-details">
                    <p>
                        <strong>Created:</strong> {singleUser.created_at}
                    </p>
                    <p>
                        <strong>Last Login:</strong>{" "}
                        {singleUser.updated_at || "N/A"}
                    </p>
                    <p>
                        <strong>About:</strong>{" "}
                        {singleUser.username || "No description provided."}
                    </p>
                </div>

                <div className="user-actions">
                    <button className="btn edit">Edit User</button>
                    <button onClick={handleDeleteModal} className="btn delete">
                        Delete User
                    </button>
                    <button
                        onClick={() => navigate("/admin/users")}
                        className="btn"
                    >
                        Back to users
                    </button>
                </div>
            </div>
            <div className={modal ? "d-block" : "d-none"}>
                <Modal>
                    {" "}
                    <>
                        <div
                            className="p-20"
                            onClick={() => setModal(false)}
                            style={{
                                textAlign: "right",
                                cursor: "pointer",
                                color: "black",
                            }}
                        >
                            X
                        </div>
                        <div>
                            <div className="user-actions">
                                <h3>Delete this user?</h3>
                                <button className="btn edit mt-16">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUserDelete}
                                    className="btn btn-danger ml-8"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </>
                </Modal>
            </div>
        </div>
    );
}

export default SingleUser;
