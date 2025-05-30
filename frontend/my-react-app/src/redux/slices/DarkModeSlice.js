import { createSlice } from '@reduxjs/toolkit'

const DarkModeFromStorage=localStorage.getItem("Mode")?
JSON.parse(localStorage.getItem("Mode")):false;




const DarkModeSlice=createSlice({
    name:"DarkMode",
    initialState: {Mode:DarkModeFromStorage},
    reducers:{
        turnOn:(state)=>{
            
            state.Mode=true;
            localStorage.setItem('Mode',JSON.stringify(state.Mode));
        },
        turnOff:(state)=>{
           
            state.Mode=false;
            localStorage.setItem('Mode',JSON.stringify(state.Mode));
        }
        
    }
})
    
export const {turnOn,turnOff}=DarkModeSlice.actions;
export default DarkModeSlice.reducer;