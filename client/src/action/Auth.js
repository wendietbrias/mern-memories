import axios from "axios";

export const SignInHandler = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `http://localhost:8000/api/auth/signin`,
      formData
    );
    if (data) {
      window.location.href = "http://localhost:3000/";
      dispatch({ type: "AUTH", payload: data });
    }
  } catch (err) {
    return err;
  }
};

export const SignUpHandler = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `http://localhost:8000/api/auth/signup`,
      formData
    );
    if (data) {
      dispatch({ type: "AUTH", payload: data });
      window.location.href = "http://localhost:3000";
    }
  } catch (err) {
    console.log(err);
  }
};
