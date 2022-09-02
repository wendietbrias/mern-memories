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

    case "DELETE_POST":
      const filtered = state.filter((data) =>
        data._id !== payload ? data : ""
      );
      state = filtered;
      return state;
      break;

    case "UPDATE_POST":
      const updated = state.map((data) =>
        data._id === payload?._id ? payload.formData : data
      );

      state = updated;

      return state;
      break;

    default:
      return state;
  }
};

export default PostsReducer;
