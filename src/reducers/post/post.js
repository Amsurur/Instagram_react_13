import { createSlice } from "@reduxjs/toolkit"



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
            .addCase(getData.pending, (state) => {
                state.loading = true
            }),

            builder.addCase(getData.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            }),
 
            builder.addCase(getData.rejected, (state) => {
                state.loading = false
            }),
           
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
