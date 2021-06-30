import * as actions from "./actionTypes"

export default function reducer(state={user:null},action){
    switch(action.type){
        case actions.LOGIN:
            return {
                user:action.payload.user,
                email:action.payload.email
            }
        case actions.LOGOUT:
            return{
                user:null
            } 
        default:
            return state;    
    }
    
}