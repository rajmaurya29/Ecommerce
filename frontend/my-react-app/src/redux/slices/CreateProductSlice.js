import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;


export const CreateProduct=createAsyncThunk(
    "createProduct",async (data,thunkAPI)=>{
        try{
            // console.log(data)
            const response= await axios.post(`${API_URL}/api/products/create/`,data,{ withCredentials:true}
            )
            return response.data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
}
)
const CreateProductSlice=createSlice({
    name:"createProductSlice",
    initialState:{
        success:false,
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(CreateProduct.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(CreateProduct.fulfilled,(state)=>{
            state.loading=false,
            state.success=true
        })
        builder.addCase(CreateProduct.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
    }
})

export default CreateProductSlice.reducer