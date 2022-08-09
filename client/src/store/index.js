import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'authorise',
    initialState: { isLoggedIn: false},
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem("userId");
            state.isLoggedIn = false;
        },
    },
});

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer
})