import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;


export const fetchDetail=createAsyncThunk(
    "fetchDetail",async (id,thunkAPI)=>{
        // console.log(orderData)
        try{
            // console.log(id);
            const response= await axios.get(`${API_URL}/api/orders/${id}`,{withCredentials:true});
            // console.log(response.data);
            return response.data;

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
});




const orderDetailSlice=createSlice({
    name:"orderDetail",
    initialState:{
        loading:false,
        order:{},
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchDetail.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(fetchDetail.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null,
            state.order=action.payload
        })
        builder.addCase(fetchDetail.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        
    }
})

export default orderDetailSlice.reducer;