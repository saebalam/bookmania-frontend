export const wishlistQuantityInc=()=>{
    console.log("in action craetor wishlist");
    return {
        type: 'INCREASE_WISHLIST_QUANTITY',
    }
}


export const wishlistQuantityClear=(quantity)=>{
    console.log("in action craetor wishlist");
    return {
        type: 'CLEAR_WISHLIST_QUANTITY',
    }
}
