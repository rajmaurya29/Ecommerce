import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

export const fetchproducts=createAsyncThunk(
    "fetchproducts",async (_,thunkAPI)=>{
        try{
            const response= await fetch("http://127.0.0.1:8000/api/products/");
            if(!response.ok){
                throw new Error("Failed to fetch products")
            }
            return response.json();

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
});

const ProductSlice=createSlice({
    name:"Products",
    initialState:{
        isLoading:false,
        data:[],
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchproducts.pending,(state)=>{
            state.isLoading=true,
            state.error=null
        })
        builder.addCase(fetchproducts.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.data=action.payload
        })
        builder.addCase(fetchproducts.rejected,(state,action)=>{
            state.isLoading=false,
            state.error=action.payload
        })
    }
})

export default ProductSlice.reducer;