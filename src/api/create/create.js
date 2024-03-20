

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { axiosRequest } from '../../utils/axiosRequest';

// const api  = import.meta.env.VITE_APP_API_URL


export const addUser = createAsyncThunk("todo/addUser", async (obj, { dispatch }) => {

    let form = new FormData();
    form.append("Title", obj.title)
    form.append("Content", obj.content)
    form.append("Images", obj.img)


    try {
        const { data } = await axiosRequest.post(`Post/add-post`, form, 'Content-Type: multipart/form-data')
        dispatch(getData())
        
 
    }
    catch (error) {
        console.log(error)
       
    }
})




