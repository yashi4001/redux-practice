import * as actions from "./actionTypes"

export function bugAdd(description){
    return{
        type:actions.BUG_ADDED,
        payload:{
            description:description
        }
    };
}

export function bugRemove(id){
    return{
        type:actions.BUG_REMOVE,
        payload:{
            ID:id
        }
    };
}

export function bugResolve(id){
    return{
        type:actions.BUG_RESOLVE,
        payload:{
            ID:id
        }
    }
}