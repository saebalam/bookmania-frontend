const homePageProducts=(featuredProducts)=>{
    // console.log("in action payload",featuredProducts);
    return {
        type: 'featuredProducts',
        payload: featuredProducts
    }
}

export default homePageProducts