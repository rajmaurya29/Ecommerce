import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

const loginInfoFromStorage=localStorage.getItem("userInfo")?
JSON.parse(localStorage.getItem("userInfo")):null;


export const fetchUser=createAsyncThunk(
    "fetchUser",async ({username,password},thunkAPI)=>{
        try{
            const response= await axios.post(`${API_URL}/api/users/login/`,{"username":username,"password":password},
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
            const response= await axios.post(`${API_URL}/api/users/logout/`,{},
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
        userInfo:loginInfoFromStorage,
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
            const item=action.payload
            let itemList={email:item['email'],id:item['id'],isAdmin:item['isAdmin'],name:item['name'],username:item['username'],_id:item['_id']}
            localStorage.setItem("userInfo",JSON.stringify(itemList))
            // console.log("action-",action.payload)
        })
        builder.addCase(fetchUser.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        builder.addCase(logoutUser.fulfilled,(state)=>{
            state.userInfo=null,
            state.loading=false,
            state.error=null,
            localStorage.removeItem("userInfo")
        })
    }
})

export default UserSlice.reducer