import axios from "axios";
import toast from "react-hot-toast";

import { setUser } from "../reducers/userReducer";

const registration = (email, password) => async (dispatch) => {
  toast.promise(
    axios.post("http://localhost:5000/api/auth/registration", {
      email,
      password,
    }),
    {
      loading: "Loading",
      success: ({ data }) => {
        dispatch(setUser(data.user));
        localStorage.setItem("token", data.token);

        return data.message;
      },
      error: ({ response }) => response.data.message,
    }
  );
};

const login = (email, password) => async (dispatch) => {
  toast.promise(
    axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    }),
    {
      loading: "Loading",
      success: ({ data }) => {
        dispatch(setUser(data.user));
        localStorage.setItem("token", data.token);

        return "Login success";
      },
      error: ({ response }) => response.data.message,
    }
  );
};

const auth = () => async (dispatch) => {
  try {
    const response = await axios
      .get("http://localhost:5000/api/auth/auth", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .catch((error) => {
        localStorage.removeItem("token");

        return error.response;
      });
    if (response?.status === 200) {
      dispatch(setUser(response.data.user));
    }
  } catch (error) {
    console.error(error);
  }
};

export { auth, login, registration };
