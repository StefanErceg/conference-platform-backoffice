import React, { FC } from "react";
import loader from "../../assets/loader.gif";

interface Props {
  loaded: boolean;
}

export const Loader: FC<Props> = ({ loaded, children }) => {
  return (
    <>
      {loaded ? (
        children
      ) : (
        <div className="loader_wrapper">
          <img src={loader} alt="loading..." />
        </div>
      )}
    </>
  );
};
