import axios from "axios";
import toast from "react-hot-toast";

import { addFile, setFiles } from "../reducers/fileReducer";

const getFiles = (dirId) => async (dispatch) => {
  toast.promise(
    axios.get(
      `http://localhost:5000/api/files${dirId ? `?parent=${dirId}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ),
    {
      loading: "Loading files",
      success: ({ data }) => {
        dispatch(setFiles(data));

        return "Files loaded";
      },
      error: ({ response }) => response.data.message,
    }
  );
};

const createDir = (dirId, name) => (dispatch) => {
  toast.promise(
    axios.post(
      "http://localhost:5000/api/files",
      {
        name,
        parent: dirId,
        type: "dir",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ),
    {
      loading: "Loading files",
      success: ({ data }) => {
        dispatch(addFile(data));

        return "Files loaded";
      },
      error: ({ response }) => response.data.message,
    }
  );
};

const uploadFile = (file, dirId) => (dispatch) => {
  const formData = new FormData();
  formData.append("file", file);
  if (dirId) formData.append("dir", dirId);
  toast.promise(
    axios.post("http://localhost:5000/api/files/upload", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader("content-length") ||
            progressEvent.target.getResponseHeader(
              "x-decompressed-content-length"
            );
        console.log("total", totalLength);
        if (totalLength) {
          let progress = Math.round((progressEvent.loaded * 100) / totalLength);
          console.log(progress);
        }
      },
    }),
    {
      loading: "Loading files",
      success: ({ data }) => {
        dispatch(addFile(data));

        return "Files loaded";
      },
      error: ({ response }) => response.data.message,
    }
  );
};

export { getFiles, createDir, uploadFile };
