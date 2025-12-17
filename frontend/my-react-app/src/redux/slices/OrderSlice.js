import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

export const placeOrder=createAsyncThunk(
    "order",async (orderData,thunkAPI)=>{
        // console.log(orderData)
        try{
            const response= await axios.post(`${API_URL}/api/orders/addOrder`,orderData,{withCredentials:true});
            // console.log(response.data)
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
    reducers:{
        resetOrder:(state)=>{
            state.loading=false,
            state.success=false,
            state.order={},
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(placeOrder.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(placeOrder.fulfilled,(state,action)=>{
            state.success=true,
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

export const {resetOrder} = orderSlice.actions
export default orderSlice.reducer;