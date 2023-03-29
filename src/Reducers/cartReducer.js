const istate = {
    cart: []
}

const cartReducer = (state = istate, action) => {
    // console.log('cart reducer called');
    switch (action.type) {
        case ("ADD_TO_CART"):
            const temp = [...state.cart]
            temp.push(action.payload)
            console.log('temp', temp)
            return {
                ...state,
                cart: temp
            }

        case ("REMOVE_FROM_CART"):
            console.log('payl', action.payload)
            const temp1 = state.cart.filter(item => item._id != action.payload)
            console.log('temp1', temp1)
            return {
                ...state,
                cart: temp1
            }

        case ("INCREASE_QUANTITY"):
            console.log('action.payload', action.payload)
            const cartTemp = [...state.cart]
            const index = state.cart.findIndex(item => item._id == action.payload)
            cartTemp[index].quantity += 1
            // console.log('item', selectedItem)
            return {
                ...state,
                cart: cartTemp
            }
        case ("DECREASE_QUANTITY"):
            console.log('action.payload', action.payload)
            const cartTemp1 = [...state.cart]
            const index1 = state.cart.findIndex(item => item._id == action.payload)
            if(cartTemp1[index1].quantity>1){
                cartTemp1[index1].quantity -= 1
            }
            // console.log('item', selectedItem)
            return {
                ...state,
                cart: cartTemp1
            }
        case ("CLEAR_CART_QUANTITY"): return {
            cartQuantity: state.cartQuantity - action.payload[0].quantity
        }
        default: return state
    }
}

export default cartReducer