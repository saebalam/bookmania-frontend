const istate={
    wishlistQuantity:0
}

const wishlistQuantityReducer=(state=istate,action)=>{
    console.log('wishlist reducer called');
    switch(action.type){
        case("INCREASE_WISHLIST_QUANTITY"): return {
            wishlistQuantity:state.wishlistQuantity+1
        }
        case("CLEAR_WISHLIST_QUANTITY"): return {
            wishlistQuantity:state.wishlistQuantity - 1
        }
        default: return state
    }
}

export default wishlistQuantityReducer