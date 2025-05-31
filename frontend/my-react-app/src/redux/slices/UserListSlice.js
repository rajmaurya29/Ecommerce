import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const UserList=createAsyncThunk(
    "fetchUserList",async (_,thunkAPI)=>{
        try{
            const response= await axios.get("https://ecommerce-1-pt17.onrender.com/api/users/",{ withCredentials:true}
            )
            return response.data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
}
)
const UserListSlice=createSlice({
    name:"UserList",
    initialState:{
        userList:{},
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(UserList.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(UserList.fulfilled,(state,action)=>{
            state.loading=false,
            state.userList=action.payload
        })
        builder.addCase(UserList.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
    }
})

export default UserListSlice.reducer