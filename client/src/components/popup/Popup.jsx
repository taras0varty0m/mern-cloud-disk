import React from "react";
import { useOutside } from "../../hooks/useOutside";
import { Button } from "../button/Button";
import { PopupBody } from "./PopupBody";
import { PopupHeader } from "./PopupHeader";

export const Popup = (props) => {
  const { ref, isShow, setIsShow } = useOutside();
  return (
    <>
      <Button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setIsShow(true)}
      >
        {props.title}
      </Button>
      {isShow && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
            <div className="relative w-auto my-6 mx-auto max-w-3xl" ref={ref}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <PopupHeader>
                  <h3 className="text-3xl font-semibold">{props.title}</h3>

                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsShow(false)}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </PopupHeader>

                <PopupBody>{props.children}</PopupBody>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};
