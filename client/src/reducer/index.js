import { combineReducers } from "redux";
import AuthReducer from "./Auth";
import PostsReducer from "./Posts";
import AlertReducer from "./Alert";

export default combineReducers({
  auth: AuthReducer,
  posts: PostsReducer,
  alert: AlertReducer,
});
