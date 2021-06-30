import { createStore } from "redux";
import reducer from "./userReducer"

const userStore=createStore(reducer);

export default userStore;