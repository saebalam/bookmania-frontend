const istate={
    cartQuantity:0
}

const cartQuantityReducer=(state=istate,action)=>{
    console.log('cart reducer called');
    switch(action.type){
        case("INCREASE_CART_QUANTITY"): return {
            cartQuantity:state.cartQuantity+1
        }
        case("DECREASE_CART_QUANTITY"): return {
            cartQuantity:state.cartQuantity-1
        }
        case("CLEAR_CART_QUANTITY"): return {
            cartQuantity:state.cartQuantity - action.payload[0].quantity
        }
        default: return state
    }
}

export default cartQuantityReducer