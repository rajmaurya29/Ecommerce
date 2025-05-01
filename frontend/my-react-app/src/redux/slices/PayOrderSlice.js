import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const payOrder=createAsyncThunk(
    "order",async (id,thunkAPI)=>{
        // console.log(orderData)
        try{
            const response= await axios.put(`http://127.0.0.1:8000/api/orders/pay/${id}/`,{withCredentials:true});
            // console.log(response.data)
            return response.data;

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
});




const payOrderSlice=createSlice({
    name:"payOrder",
    initialState:{
        loading:false,
        success:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(payOrder.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(payOrder.fulfilled,(state)=>{
            state.success=true,
            state.loading=false,
            state.error=null
        })
        builder.addCase(payOrder.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        
    }
})

export default payOrderSlice.reducer;