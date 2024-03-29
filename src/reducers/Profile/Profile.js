import { createSlice } from '@reduxjs/toolkit'
import { GetPostByUser, getFollowers, getFollowings, getPosts, getProfileById } from '../../api/profile/profile';


export const profile = createSlice({
    name: "profile",
    initialState: {
        userProfile: [],
        editUserById: {},
        postUser: [],
        followingsUser: [],
        followersUser: [],
        posts: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfileById.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getProfileById.fulfilled, (state, action) => {
            state.userProfile = action.payload
        });
        builder.addCase(GetPostByUser.fulfilled, (state, action) => {
            state.postUser = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getFollowings.fulfilled, (state, action) => {
            state.followingsUser = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getFollowers.fulfilled, (state, action) => {
            state.followersUser = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload
        });
    },
})


export default profile.reducer
