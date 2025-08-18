/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

type AuthState = {
    loggedInUser: User | null;
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
        addLoggedUser: (state, action: PayloadAction<User>) => {
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
