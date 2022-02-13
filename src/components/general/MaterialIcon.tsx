import React, { FC } from "react";

interface Props {
  icon: string;
  size?: number;
  onClick?: () => void;
  cursor?: "pointer" | "default";
  hoverColor?: "red" | "green" | "yellow";
}

export const MaterialIcon: FC<Props> = ({
  icon,
  size,
  onClick = () => {},
  cursor = "default",
  hoverColor = null,
}) => {
  return (
    <span
      className={`material-icons ${size ? `md-${size}` : ""} ${cursor}_cursor ${
        hoverColor ? `hover_${hoverColor}` : ""
      }`}
      onClick={onClick}
    >
      {icon}
    </span>
  );
};
