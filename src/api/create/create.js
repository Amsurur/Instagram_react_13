

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { axiosRequest } from '../../utils/axiosRequest';



export const addUser = createAsyncThunk("post/addUser", async (params, { dispatch }) => {
    
    const { title, content, files } = params

    let form = new FormData();
    form.append("Title", title)
    form.append("Content", content)
    
    for(let i = 0 ; i < files.length; i++){
      form.append("Images" , files[i])
    }

    try {
    
        const { data } = await axiosRequest.post(`Post/add-post`, form, 'Content-Type: multipart/form-data')
        dispatch()
 
    }
    catch (error) {
        console.log(error)
       
    }
})






