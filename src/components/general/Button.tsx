import React, { FC } from "react";

interface Props {
  text: string;
  onClick: (event: MouseEvent) => void;
  icon?: string;
}

export const Button = () => {
  return (
    <button className="btn_general">
      <div className="icon">
        <span className="material-icons md-18">add_circle_outline</span>
      </div>
      <span className="text">Add conference</span>
    </button>
  );
};
