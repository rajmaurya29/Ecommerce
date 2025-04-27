import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const placeOrder=createAsyncThunk(
    "order",async (orderData,thunkAPI)=>{
        console.log(orderData)
        try{
            const response= await axios.post("http://127.0.0.1:8000/api/orders/addOrder",orderData,{withCredentials:true});
            if(!response.ok){
                throw new Error("Failed to add order")
            }
            return response.data;

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
});




const orderSlice=createSlice({
    name:"Order",
    initialState:{
        loading:false,
        success:false,
        order:{},
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(placeOrder.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(placeOrder.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null,
            state.order=action.payload
        })
        builder.addCase(placeOrder.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        
    }
})


export default orderSlice.reducer;