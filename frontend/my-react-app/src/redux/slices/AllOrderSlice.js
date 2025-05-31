import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllOrder=createAsyncThunk(
    "fetchAllOrder",async (_,thunkAPI)=>{
        // console.log(orderData)
        try{
            // console.log(id);
            const response= await axios.get("https://ecommerce-1-pt17.onrender.com/api/orders/allOrders",{withCredentials:true});
            // console.log(response.data);
            // console.log("fetchOrder")
            return response.data;

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
});




const allOrderSlice=createSlice({
    name:"allOrder",
    initialState:{
        loading:false,
        allOrders:{},
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllOrder.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(fetchAllOrder.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null,
            state.allOrders=action.payload
        })
        builder.addCase(fetchAllOrder.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        
    }
})

export default allOrderSlice.reducer;