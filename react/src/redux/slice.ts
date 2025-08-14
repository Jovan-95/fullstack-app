/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    loggedInUser: null;
};

const initialState: AuthState = {
    loggedInUser:
        JSON.parse(localStorage.getItem("loggedInUser") as string) || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Add logic for login
        addLoggedUser: (state, action) => {
            state.loggedInUser = action.payload;
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(state.loggedInUser)
            );
        },

        // Add logic for logout
        logoutUser: (state) => {
            state.loggedInUser = null;
            localStorage.removeItem("loggedInUser");
        },
    },
});

export const { addLoggedUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
