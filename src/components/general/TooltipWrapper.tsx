import React, { FC } from "react";

interface Props {
  text: string;
  direction?: "left" | "right";
}

export const TooltipWrapper: FC<Props> = ({
  text = "",
  direction = "left",
  children,
}) => {
  return (
    <div className={`tooltip_${direction}`}>
      {children}
      <span className="tooltip_content">{text}</span>
    </div>
  );
};
