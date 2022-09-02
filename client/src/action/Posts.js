import axios from "axios";

const token = JSON.parse(localStorage.getItem("user"));

const API = axios.create({
  baseURL: `http://localhost:8000/api/post`,
});

API.interceptors.request.use((req) => {
  if (token) {
    req.headers.Authorization = `bearer ${token}`;
  }

  return req;
});

function errorHandler(dispatch, msg) {
  return dispatch({
    type: "OPEN_ALERT",
    payload: {
      isOpen: true,
      variant: "bg-red-50",
      textVariant: "text-red-500",
      msg: msg,
    },
  });
}

const GetAllPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/api/post/all`);
    dispatch({ type: "GET_ALL_POSTS", payload: data });
  } catch (err) {
    return err;
  }
};

const CreatePost = (formData) => async (dispatch) => {
  try {
    const { data } = await API.post(`/create`, formData);
    if (data) {
      dispatch({ type: "CREATE_POST", payload: data });
    }
  } catch (err) {
    errorHandler(dispatch, "Please signin or signup");
  }
};

const DeletePost = (id) => async (dispatch) => {
  try {
    await API.delete(`/delete/${id}`);
    dispatch({ type: "DELETE_POST", payload: id });
  } catch (err) {
    errorHandler(dispatch, "Please signin or signup");
  }
};

const UpdatePost = (id, formData) => async (dispatch) => {
  try {
    const { data } = await API.put(`/update/${id}`, formData);
    if (data) {
      dispatch({
        type: "UPDATE_POST",
        payload: {
          formData: data,
          _id: id,
        },
      });
    }
  } catch (err) {
    errorHandler(dispatch, "Please signin or signup");
  }
};

const LikePost = (id, userId) => async (dispatch) => {
  try {
    const { data } = await API.patch(`/like/${id}`, { userId: userId });
    if (data) {
      dispatch({
        type: "UPDATE_POST",
        payload: {
          _id: id,
          formData: data,
        },
      });
    }
  } catch (err) {
    errorHandler(dispatch, "Please signin or signup");
  }
};

export { GetAllPosts, CreatePost, DeletePost, UpdatePost, LikePost };
