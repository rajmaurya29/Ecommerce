import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;


export const PostReview=createAsyncThunk(
    "postReview",async ([review,id],thunkAPI)=>{
        try{
            // console.log(review)
            const response= await axios.post(`${API_URL}/api/products/review/${id}/`,review,{ withCredentials:true}
            )
            return response.data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
}
)
const ReviewSlice=createSlice({
    name:"reviewSlice",
    initialState:{
        success:false,
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(PostReview.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(PostReview.fulfilled,(state)=>{
            state.loading=false,
            state.success=true
        })
        builder.addCase(PostReview.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
    }
})

export default ReviewSlice.reducer