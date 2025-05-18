import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const UserAdminUpdate=createAsyncThunk(
    "userAdminUpdate",async ([userData,id],thunkAPI)=>{
        try{
            // console.log(userData);
            // console.log(id)
            const response= await axios.put(`http://127.0.0.1:8000/api/users/admin/${id}/`,userData,{ withCredentials:true}
            )
            return response.data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
}
)
const UserAdminUpdateSlice=createSlice({
    name:"userAdminUpdate",
    initialState:{
        success:false,
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(UserAdminUpdate.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(UserAdminUpdate.fulfilled,(state,action)=>{
            state.loading=false,
            state.success=true
        })
        builder.addCase(UserAdminUpdate.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
    }
})

export default UserAdminUpdateSlice.reducer