import { combineReducers } from "redux";
import AuthReducer from "./Auth";
import PostsReducer from "./Posts";

export default combineReducers({
  auth: AuthReducer,
  posts: PostsReducer,
});
