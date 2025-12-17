import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;


export const GetUser=createAsyncThunk(
    "getUser",async (id,thunkAPI)=>{
        try{
            const response= await axios.get(`${API_URL}/api/users/editUser/${id}/`,{ withCredentials:true}
            )
            return response.data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
}
)
const GetUserSlice=createSlice({
    name:"GetUser",
    initialState:{
        UserDetail:{},
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(GetUser.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(GetUser.fulfilled,(state,action)=>{
            state.loading=false,
            state.UserDetail=action.payload
        })
        builder.addCase(GetUser.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
    }
})

export default GetUserSlice.reducer