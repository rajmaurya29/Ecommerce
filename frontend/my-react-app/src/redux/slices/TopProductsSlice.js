import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

export const topProducts=createAsyncThunk(
    "topProducts",async (_,thunkAPI)=>{
        // console.log(orderData)
        try{
            // console.log("ok");
            const response= await axios.get(`${API_URL}/api/products/carousel/`);
            // console.log(response.data);
            return response.data;

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
});




const TopProductsSlice=createSlice({
    name:"orderDetail",
    initialState:{
        loading:false,
        carousel:[],
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(topProducts.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(topProducts.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null,
            state.carousel=action.payload
        })
        builder.addCase(topProducts.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        
    }
})

export default TopProductsSlice.reducer;