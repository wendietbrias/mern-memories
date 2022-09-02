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
    return err;
  }
};

const DeletePost = (id) => async (dispatch) => {
  try {
    await API.delete(`/delete/${id}`);
    dispatch({ type: "DELETE_POST", payload: id });
  } catch (err) {
    return err;
  }
};

const UpdatePost = (id, formData) => async (dispatch) => {
  try {
    await API.put(`/update/${id}`, formData);
    dispatch({
      type: "UPDATE_POST",
      payload: {
        formData,
        _id: id,
      },
    });
  } catch (err) {
    return err;
  }
};

export { GetAllPosts, CreatePost, DeletePost, UpdatePost };
