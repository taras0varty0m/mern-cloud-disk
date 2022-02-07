import React from "react";

export const PopupHeader = (props) => {
  return (
    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
      {props.children}
    </div>
  );
};
