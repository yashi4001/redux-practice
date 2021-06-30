import * as actions from "./actionTypes"

let id=1;

export default function reducer(state=[],action){
    switch(action.type){
        case actions.BUG_ADDED:
            return [
                ...state,{
                    ID:id++,
                    description:action.payload.description,
                    resolved:false
                }
            ]
        case actions.BUG_REMOVE:
            return state.filter(bug=>bug.ID!==action.payload.ID);
        case actions.BUG_RESOLVE:
            return state.map(bug=>bug.ID===action.payload.ID?{...bug,resolved:true}:bug);
        default:
            return state;
    }
}