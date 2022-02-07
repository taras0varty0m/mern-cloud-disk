import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles, uploadFile } from "../../actions/fileActions";
import { setCurrentDir } from "../../reducers/fileReducer";
import { Button } from "../button/Button";
import Input from "../input/Input";
import { Popup } from "../popup/Popup";
import { FileList } from "./FileList";

export const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.file.currentDir);
  const dirStack = useSelector((state) => state.file.dirStack);
  const [dirName, setDirName] = useState("");

  React.useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createDir(currentDir, dirName));
    setDirName("");
  };

  const backClickHandler = () => {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  };

  const fileUploadHandler = (event) => {
    const files = [...event.target.files];
    files.forEach((file) => {
      dispatch(uploadFile(file));
    });
  };
  return (
    <>
      <div className="flex justify-around mt-2">
        <Button onClick={backClickHandler}>Return</Button>

        <Popup title="Create new folder">
          <form onSubmit={onSubmit}>
            <label className="block mb-5 text-center">
              folder name
              <Input
                autoFocus
                type="text"
                value={dirName}
                required
                onChange={(e) => {
                  setDirName(e.target.value);
                }}
              />
            </label>
            <div className="flex justify-center">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Popup>
        <div className="flex items-center justify-center bg-grey-lighter">
          <label className="flex flex-col items-center px-2 py-4 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue sm:flex-row">
            <span className="text-base leading-normal">Select a file</span>
            <input
              type="file"
              className="hidden"
              onChange={fileUploadHandler}
              multiple
            />
          </label>
        </div>
      </div>

      <FileList />
    </>
  );
};
