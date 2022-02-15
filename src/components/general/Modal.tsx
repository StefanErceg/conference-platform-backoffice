import React, { FC } from "react";
import { MaterialIcon } from "./MaterialIcon";

interface Props {
  close: () => void;
  title?: string;
  body?: JSX.Element;
  footer?: JSX.Element;
}

export const Modal: FC<Props> = ({
  close,
  title,
  body = <></>,
  footer = <></>,
}) => {
  return (
    <div className="modal_wrapper">
      <div className="modal">
        <div className="modal_header">
          <span className="title">{title}</span>
          <div className="close" onClick={close}>
            <MaterialIcon icon="close" size={22} />
          </div>
        </div>
        <div className="modal_body">{body}</div>
        <div className="modal_footer">{footer}</div>
      </div>
    </div>
  );
};
