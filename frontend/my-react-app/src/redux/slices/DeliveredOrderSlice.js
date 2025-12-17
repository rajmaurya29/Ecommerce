import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

export const deliveredOrder=createAsyncThunk(
    "deliveredOrder",async (id,thunkAPI)=>{
        // console.log(orderData)
        try{
            // console.log(id);
            const response= await axios.put(`${API_URL}/api/orders/delivered/${id}/`,{},{withCredentials:true});
            // console.log(response.data)
            return response.data;

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
});




const DeliveredOrderSlice=createSlice({
    name:"deliveredOrderSlice",
    initialState:{
        loading:false,
        success:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(deliveredOrder.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(deliveredOrder.fulfilled,(state)=>{
            state.success=true,
            state.loading=false,
            state.error=null
        })
        builder.addCase(deliveredOrder.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        
    }
})

export default DeliveredOrderSlice.reducer;