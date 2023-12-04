import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userCurrent: null,
    error: null,
    loading: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state)=>{
            state.loading = true;
        },
        signInSuccess: (state,action)=>{
            state.loading = false
            state.error = null
            state.userCurrent = action.payload
        },
        signInFailure: (state,action)=>{
            state.loading = false
            state.error = action.payload
        }
    }
});

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;
export default userSlice.reducer;