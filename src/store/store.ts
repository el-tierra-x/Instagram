import { createStore } from "redux";
import photosReducer from "./photosReducer";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(photosReducer , applyMiddleware(thunk));

export default store;