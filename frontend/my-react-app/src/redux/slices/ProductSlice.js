import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

export const fetchproducts=createAsyncThunk(
    "fetchproducts",async (keyword,thunkAPI)=>{
        try{
            const response= await fetch(`http://127.0.0.1:8000/api/products${keyword}`);
            if(!response.ok){
                throw new Error("Failed to fetch products")
            }
            return response.json();

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
});


export const fetchproductDetails=createAsyncThunk(
    "fetchproductDetails",async (id,thunkAPI)=>{
        try{
            const response= await fetch(`http://127.0.0.1:8000/api/products/${id}`);
            if(!response.ok){
                throw new Error("Failed to fetch product")
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
        error:null,
        productLoading:false,
        productData:[],
        productError:null,
        page:0,
        pages:0
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchproducts.pending,(state)=>{
            state.isLoading=true,
            state.error=null
        })
        builder.addCase(fetchproducts.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.data=action.payload.products
            state.page=action.payload.page
            state.pages=action.payload.pages
        })
        builder.addCase(fetchproducts.rejected,(state,action)=>{
            state.isLoading=false,
            state.error=action.payload
        })
        builder.addCase(fetchproductDetails.pending,(state)=>{
            state.productLoading=true,
            state.productError=null
        })
        builder.addCase(fetchproductDetails.fulfilled,(state,action)=>{
            state.productLoading=false,
            state.productData=action.payload
        })
        builder.addCase(fetchproductDetails.rejected,(state,action)=>{
            state.productLoading=false,
            state.productError=action.payload
        })
    }
})

export default ProductSlice.reducer;