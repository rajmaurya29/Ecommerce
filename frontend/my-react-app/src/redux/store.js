import { configureStore } from '@reduxjs/toolkit'   
import ProductSlice from './slices/ProductSlice'
import  cartSlice from './slices/CartSlice'
import UserSlice from './slices/UserSlice'
import orderSlice from './slices/OrderSlice'
import orderDetailSlice from './slices/OrderDetail'
import payOrderSlice from './slices/PayOrderSlice'
import allOrderSlice from './slices/AllOrderSlice'
import UserListSlice from './slices/UserListSlice'
import UserDeleteSlice from './slices/userDeleteSlice'

export const store=configureStore({
    reducer:{
        products:ProductSlice,
        cart:cartSlice,
        user:UserSlice,
        order:orderSlice,
        orders:orderDetailSlice,
        pay:payOrderSlice,
        allOrder:allOrderSlice,
        userList:UserListSlice,
        userDelete:UserDeleteSlice

    }
});