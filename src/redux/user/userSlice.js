/*import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singInSuccess: (state, action) => {
      state.currentUser = action.payload;

      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { singInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;*/

import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singInSuccess: (state, action) => {
      state.currentUser = action.payload; // Successfully setting current user
      state.error = null; // Resetting error on successful sign-in
    },
    signInFailure: (state, action) => {
      state.error = action.payload; // Setting error on sign-in failure
    },
    updateUsersuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    updateUserfail: (state, action) => {
      state.error = action.payload;
    },
    deleteUsersuccess: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    deleteUserfail: (state, action) => {
      state.error = action.payload;
    },
    signoutUsersuccess: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    signoutUserfail: (state, action) => {
      state.error = action.payload;
    },
    listUsersuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    listUserfail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  singInSuccess,
  signInFailure,
  updateUsersuccess,
  updateUserfail,
  deleteUserfail,
  deleteUsersuccess,
  signoutUserfail,
  signoutUsersuccess,
  listUsersuccess,
  listUserfail,
} = userSlice.actions;

export default userSlice.reducer;
