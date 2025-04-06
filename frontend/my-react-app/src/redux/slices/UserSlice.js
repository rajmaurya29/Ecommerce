import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUser=createAsyncThunk(
    "fetchUser",async ({username,password},thunkAPI)=>{
        try{
            console.log("ldkjf");
            const response= await axios.post("http://127.0.0.1:8000/api/users/login/",{"username":username,"password":password},
               { withCredentials:true}
            )
            console.log(response)
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
        })
        builder.addCase(fetchUser.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
    }
})

export default UserSlice.reducer