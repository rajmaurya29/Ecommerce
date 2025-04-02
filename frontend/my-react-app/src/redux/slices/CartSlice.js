    import { createSlice } from '@reduxjs/toolkit'

    const cartItemsFromStorage=localStorage.getItem("cartItems")?
    JSON.parse(localStorage.getItem("cartItems")):[];


    const cartSlice=createSlice({
        name:"cart",
        initialState: {cartItems:cartItemsFromStorage},
        reducers:{
            addToCart:(state,action)=>{
                const item=action.payload;
                console.log(item);
                const existItem=state.cartItems.find((x)=>x.product===item.product)
                console.log(existItem);
                if(existItem){
                    state.cartItems.forEach((x)=>{
                        if(x.product===item.product){
                            x.qty=item.qty;
                        }
                    })
                }
                else{
                    state.cartItems.push(item);
                }
                localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
            },
            removeFromCart:(state,action)=>{
                console.log("action");
                // state.cartItems=state.cartItems.filter((x)=> x.product!==action.payload);
                var a=[];
                state.cartItems.forEach((x)=>{
                    if(x.product!==action.payload){
                        a.push(x)
                    }
                })
                console.log(a);
                state.cartItems=a;
                localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
            }
            
        }
    })
        
    export const {addToCart,removeFromCart}=cartSlice.actions;
    export default cartSlice.reducer;