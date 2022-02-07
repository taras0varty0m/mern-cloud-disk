import React from "react";
import { useSelector } from "react-redux";
import { File } from "./File";
import emptyBoxGif from "../../assets/emptyBoxGif.gif";
export const FileList = () => {
  const files = useSelector((state) => state.file.files).map((file, key) => (
    <File key={key} file={file} />
  ));
  const columns = ["Name", "Date", "Size"];
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  {columns.map((col, key = { col }) => (
                    <th
                      key={key}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files.length ? (
                  files
                ) : (
                  <tr>
                    <td colSpan={columns.length}>
                      <div className="flex justify-center">
                        <img src={emptyBoxGif} />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
