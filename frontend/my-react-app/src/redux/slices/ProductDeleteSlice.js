import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const ProductDelete=createAsyncThunk(
    "productDelete",async (id,thunkAPI)=>{
        try{
            const response= await axios.delete(`http://127.0.0.1:8000/api/products/delete/${id}/`,{ withCredentials:true}
            )
            return response.data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
}
)
const ProductDeleteSlice=createSlice({
    name:"ProductDeleteSlice",
    initialState:{
        success:false,
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(ProductDelete.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(ProductDelete.fulfilled,(state,action)=>{
            state.loading=true,
            state.success=true
        })
        builder.addCase(ProductDelete.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
    }
})

export default ProductDeleteSlice.reducer