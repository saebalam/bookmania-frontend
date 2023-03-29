import redux from 'react-redux'

const add=()=>{
    return {
        type:'add',
        payload:10
    }
}

const state={
    counter:10
}

const reducer=(state=state,action)=>{
    switch(action.type){
        case("add"): return {
            ...state,
            counter:state.counter + action.payload
        }
    }
}