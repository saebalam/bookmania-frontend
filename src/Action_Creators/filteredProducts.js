const filteredProducts=(filteredProducts)=>{
    console.log("in action filtered",filteredProducts);
    return {
        type: 'filterProducts',
        payload: filteredProducts
    }
}

export default filteredProducts