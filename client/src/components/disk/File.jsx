import React from "react";
import file_image from "../../assets/file.png";
import folder_image from "../../assets/folder.png";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../reducers/fileReducer";
export const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);

  const openDirHandler = () => {
    if (file.type === "dir") {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  };
  return (
    <tr className="hover:bg-gray-50" onClick={openDirHandler}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="ml-4">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10"
              src={file.type === "dir" ? folder_image : file_image}
              alt="icon"
            />
          </div>
          <div className="text-sm font-medium text-gray-900">{file.name}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{file.date.slice(0, 10)}</td>
      <td className="px-6 py-4 whitespace-nowrap">{file.size}</td>
    </tr>
  );
};
