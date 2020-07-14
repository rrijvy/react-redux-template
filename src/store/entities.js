import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectsReducer from "./projects";
import userReducer from "./users";
import productsReducer from "./products";

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  products: productsReducer,
  user: userReducer,
});
