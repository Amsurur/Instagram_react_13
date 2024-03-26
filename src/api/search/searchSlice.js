import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosRequest } from "../../utils/axiosRequest";





export const searchData=createAsyncThunk("search/searchData",async (name)=>{
    try {
        const {data}=await axiosRequest.get(`User/get-users?UserName=${name}`)
   return data.data
    } catch (error) {
        console.log(error);
    }
})

export const dellAll=createAsyncThunk("search/dellAll",async (_,{dispatch})=>{
    try {
        const {data}=await axiosRequest.delete(`SearchHistory/delete-user-search-histories`)
  dispatch(getHistory())
    } catch (error) {
        console.log(error);
    }
})



export const getHistory=createAsyncThunk("search/getHistory",async()=>{
    try {
        const {data}=await axiosRequest.get(`SearchHistory/get-user-search-histories`)
    return data.data
    } catch (error) {
        console.log(error);
    }
})
export const postSearch=createAsyncThunk("search/postSearch",async(id,{dispatch})=>{
    try {
        const {data}=await axiosRequest.post(`SearchHistory/add-user-search-history?UserSearchId=${id}`)

dispatch(getHistory())
    } catch (error) {
        console.log(error);
    }
})
export const delUser=createAsyncThunk("search/delUser",async(id,{dispatch})=>{
    try {
        const {data}=await axiosRequest.delete(`SearchHistory/delete-user-search-history?id=${id}`)
     dispatch(getHistory())
    } catch (error) {
        console.log(error);
    }
})

export const searchSlice = createSlice({
    name: 'search',
    initialState:{
  value:0,
  data:[],
  data1:[]
    },
    reducers: {
      increment: (state) => {
   
        state.value += 1
      },
      decrement: (state) => {
        state.value -= 1
      },
      incrementByAmount: (state, action) => {
        state.value += action.payload
      },
  
    },
  extraReducers: (builder) =>{
    builder.addCase(searchData.fulfilled,(state,action)=>{
        state.data=action.payload
    })
    builder.addCase(getHistory.fulfilled,(state,action)=>{
        state.data1=action.payload
    })
  }
    
  })
  
  // Action creators are generated for each case reducer function
  export const { increment, decrement, incrementByAmount } = searchSlice.actions
  
  export default searchSlice.reducer