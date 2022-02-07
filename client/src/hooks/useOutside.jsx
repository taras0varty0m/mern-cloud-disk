import React from "react";

export const useOutside = (initialIsVisible = false) => {
  const [isShow, setIsShow] = React.useState(initialIsVisible);

  const ref = React.useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) setIsShow(false);
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isShow, setIsShow };
};
