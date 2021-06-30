import * as actions from "./actionTypes"

export function login(user,mail){
    return{
        type:actions.LOGIN,
        payload:{
            user:user,
            email:mail
        }
    }
}

export function logout(){
    return{
        type:actions.LOGOUT,
        payload:{

        }
    }
}