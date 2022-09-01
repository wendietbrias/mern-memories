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

export { GetAllPosts, CreatePost };
