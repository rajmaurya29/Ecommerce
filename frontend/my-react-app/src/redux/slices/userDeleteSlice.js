import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;


export const UserDelete=createAsyncThunk(
    "userDelete",async (id,thunkAPI)=>{
        try{
            const response= await axios.delete(`${API_URL}/api/users/delete/${id}/`,{ withCredentials:true}
            )
            return response.data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    
}
)
const UserDeleteSlice=createSlice({
    name:"UserDeleteSlice",
    initialState:{
        success:false,
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(UserDelete.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        builder.addCase(UserDelete.fulfilled,(state,action)=>{
            state.loading=true,
            state.success=true
        })
        builder.addCase(UserDelete.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
    }
})

export default UserDeleteSlice.reducer