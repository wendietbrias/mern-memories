import axios from "axios";

export const SignInHandler = (formData) => async (dispatch) => {
  dispatch({
    type: "OPEN_ALERT",
    payload: {
      variant: "bg-green-100",
      textVariant: "text-green-600",
      msg: "Process...",
    },
  });
  try {
    const { data } = await axios.post(
      `http://localhost:8000/api/auth/signin`,
      formData
    );
    if (data) {
      window.location.href = "http://localhost:3000/";
      dispatch({ type: "AUTH", payload: data });
      dispatch({
        type: "OPEN_ALERT",
        payload: {
          variant: "bg-green-100",
          textVariant: "text-green-600",
          msg: "Success login...",
        },
      });
    }
  } catch (err) {
    const { response } = err;
    const { data } = response;
    dispatch({
      type: "OPEN_ALERT",
      payload: {
        variant: "bg-red-100",
        textVariant: "text-red-600",
        msg: data.msg,
      },
    });
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
