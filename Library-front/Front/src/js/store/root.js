import { combineReducers } from "redux";
import {reducer as auth } from "./auth";
import {reducer as books } from "./books";

const createRootReducer = combineReducers({ auth, books });

export default createRootReducer;
