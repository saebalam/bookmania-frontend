export const addToCart=(obj)=>{
    console.log("in addToCart action creator ",obj);
    return {
        type: 'ADD_TO_CART',
        payload:obj
    }
}

export const removeFromcart=(_id)=>{
    console.log("in removeFrom action creator ");
    return {
        type: 'REMOVE_FROM_CART',
        payload:_id
    }
}

export const increaseQuantity=(_id)=>{
    console.log("in incre action creator ",_id);
    return {
        type: 'INCREASE_QUANTITY',
        payload:_id
    }
}

export const decreaseQuantity=(_id)=>{
    console.log("in dec action creator ",_id);
    return {
        type: 'DECREASE_QUANTITY',
        payload:_id
    }
}

// export default {cartQuantity,cartQuantityDec}