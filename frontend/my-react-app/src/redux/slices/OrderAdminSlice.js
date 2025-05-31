import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const orderAdmin=createAsyncThunk(
    "OrderAdmin",async (_,thunkAPI)=>{
        // console.log(orderData)
        try{
            // console.log(id);
            const response= await axios.get("https://ecommerce-1-pt17.onrender.com/api/orders/ordersAdmin",{withCredentials:true});
            // console.log(response.data);
            // console.log("fetchOrder")
            return response.data;

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
});




const OrderAdminSlice=createSlice({
    name:"OrderAdminSlice",
    initialState:{
        loading:false,
        Orders:{},
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(orderAdmin.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(orderAdmin.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null,
            state.Orders=action.payload
        })
        builder.addCase(orderAdmin.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        
    }
})

export default OrderAdminSlice.reducer;