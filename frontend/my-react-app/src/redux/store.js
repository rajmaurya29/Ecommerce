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
import GetUserSlice from './slices/GetUserSlice'
import UserAdminUpdateSlice from './slices/UserAdminUpdate'
import ProductDeleteSlice from './slices/ProductDeleteSlice'
import  ProductUpdateSlice  from './slices/ProductUpdate'
import  CreateProductSlice  from './slices/CreateProductSlice'
import  OrderAdminSlice  from './slices/OrderAdminSlice'
import  DeliveredOrderSlice  from './slices/DeliveredOrderSlice'
import  ReviewSlice  from './slices/ReviewSlice'

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
        userDelete:UserDeleteSlice,
        userDetail:GetUserSlice,
        userUpdate:UserAdminUpdateSlice,
        productDelete:ProductDeleteSlice,
        productUpdate:ProductUpdateSlice,
        productCreate:CreateProductSlice,
        allOrdersAdmin:OrderAdminSlice,
        deliveredOrderAdmin:DeliveredOrderSlice,
        reviewProduct:ReviewSlice


    }
});