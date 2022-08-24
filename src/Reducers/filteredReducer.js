const initState={
    filteredProducts:[]
}

const filteredReducer=(state=initState,action)=>{
    console.log(" in filterd reducer ",action.payload);
    switch(action.type){
        case("filterProducts"): return {
            // action.payload.map(user=>user.id)
            filteredProducts:action.payload
        }
        default: return state
    }
}

export default filteredReducer