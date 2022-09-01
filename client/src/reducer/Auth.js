const user = JSON.parse(localStorage.getItem("user"));

const AuthReducer = (state = user || null, { type, payload }) => {
  switch (type) {
    case "AUTH":
      state = payload;
      localStorage.setItem("user", JSON.stringify(state));
      break;

    case "LOGOUT":
      state = null;
      localStorage.setItem("user", state);
      window.location.href = "http://localhost:3000";
      break;

    default:
      return state;
  }
};

export default AuthReducer;
