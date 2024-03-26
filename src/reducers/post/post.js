import { createSlice } from "@reduxjs/toolkit"
import { addUser } from "../../api/create/create"



export const postSlice = createSlice({

    name: 'post',
    initialState: {
        value: 0,

        data: [],
        loading: false,


    },
    reducers: {
    },

    extraReducers: (builder) => {
          
            builder
                .addCase(addUser.pending, (state) => {
                    state.loading = true
                }),

            builder.addCase(addUser.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            }),

            builder.addCase(addUser.rejected, (state) => {
                state.loading = false
            })
          
    }




})

export const { } = postSlice.actions

export default postSlice.reducer
