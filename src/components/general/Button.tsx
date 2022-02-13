import React, { FC } from "react";
import { MaterialIcon } from "./MaterialIcon";

interface Props {
  text: string;
  onClick: () => void;
  icon?: string;
}

export const Button: FC<Props> = ({
  text,
  onClick,
  icon = "add_circle_outline",
}) => {
  return (
    <button className="btn_general" onClick={(event) => onClick()}>
      <div className="icon">
        <MaterialIcon icon={icon} size={18} />
      </div>
      <span className="text">{text}</span>
    </button>
  );
};
