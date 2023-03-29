const istate={
    featuredProducts:[]
}

const homePageReducer=(state=istate,action)=>{
    // console.log("reducer ",action.payload);
    switch(action.type){
        case("featuredProducts"): return {
            // action.payload.map(user=>user.id)
            featuredProducts:[...state.featuredProducts , action.payload]
        }
        default: return state
    }
}

export default homePageReducer