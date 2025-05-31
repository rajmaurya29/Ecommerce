import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const ProductUpdate=createAsyncThunk(
    "productUpdateList",async ([data,id],thunkAPI)=>{
        try{
            // console.log(data)
            const response= await axios.put(`https://ecommerce-1-pt17.onrender.com/api/products/update/${id}/`,data,{ withCredentials:true}
            )
            return response.data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
}
)
const ProductUpdateSlice=createSlice({
    name:"productUpdateSlice",
    initialState:{
        success:false,
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(ProductUpdate.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(ProductUpdate.fulfilled,(state)=>{
            state.loading=false,
            state.success=true
        })
        builder.addCase(ProductUpdate.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
    }
})

export default ProductUpdateSlice.reducer