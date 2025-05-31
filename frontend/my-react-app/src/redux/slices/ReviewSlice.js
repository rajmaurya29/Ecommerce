import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const PostReview=createAsyncThunk(
    "postReview",async ([review,id],thunkAPI)=>{
        try{
            console.log(review)
            const response= await axios.post(`https://ecommerce-1-pt17.onrender.com/api/products/review/${id}/`,review,{ withCredentials:true}
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