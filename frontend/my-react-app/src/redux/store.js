import { configureStore } from '@reduxjs/toolkit'   
import ProductSlice from './slices/ProductSlice'
import  cartSlice from './slices/CartSlice'
import UserSlice from './slices/UserSlice'

export const store=configureStore({
    reducer:{
        products:ProductSlice,
        cart:cartSlice,
        user:UserSlice
        
    }
});