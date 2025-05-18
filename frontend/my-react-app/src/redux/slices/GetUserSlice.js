import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const GetUser=createAsyncThunk(
    "getUser",async (id,thunkAPI)=>{
        try{
            const response= await axios.get(`http://127.0.0.1:8000/api/users/editUser/${id}/`,{ withCredentials:true}
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