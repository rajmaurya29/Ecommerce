import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUser=createAsyncThunk(
    "fetchUser",async ({username,password},thunkAPI)=>{
        try{
            const response= await axios.post("http://127.0.0.1:8000/api/users/login/",{"username":username,"password":password},
               { withCredentials:true}
            )
            return response.data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
}
)
export const logoutUser=createAsyncThunk(
    "logoutUser",async (_,thunkAPI)=>{
        try{
            const response= await axios.post("http://127.0.0.1:8000/api/users/logout/",{},
               { withCredentials:true}
            )
            return response.data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
}
)

const UserSlice=createSlice({
    name:"User",
    initialState:{
        userInfo:null,
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading=false,
            state.userInfo=action.payload
            console.log("action-",action.payload)
        })
        builder.addCase(fetchUser.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        builder.addCase(logoutUser.fulfilled,(state)=>{
            state.userInfo=null,
            state.loading=false,
            state.error=null
        })
    }
})

export default UserSlice.reducer