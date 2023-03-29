export const cartQuantityInc=()=>{
    console.log("in action craetor cartinc");
    return {
        type: 'INCREASE_CART_QUANTITY',
        
    }
}

export const cartQuantityDec=()=>{
    console.log("in action craetor cartdec");
    return {
        type: 'DECREASE_CART_QUANTITY',
    }
}

export const cartQuantityClear=(quantity)=>{
    console.log("in action craetor cartdec");
    return {
        type: 'CLEAR_CART_QUANTITY',
        payload: quantity
    }
}

// export default {cartQuantity,cartQuantityDec}