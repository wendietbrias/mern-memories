const PostsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "GET_ALL_POSTS":
      state = payload;
      return state;
      break;

    case "CREATE_POST":
      state = [...state, payload];
      return state;
      break;

    default:
      return state;
  }
};

export default PostsReducer;
