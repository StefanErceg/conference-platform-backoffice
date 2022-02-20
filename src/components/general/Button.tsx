import React, { FC } from 'react';
import { MaterialIcon } from './MaterialIcon';

interface Props {
    text: string;
    onClick: () => void;
    icon?: string;
    className?: string;
}

export const Button: FC<Props> = ({ text, onClick, icon = null, className = '' }) => {
    return (
        <button className={`btn_general ${className}`} onClick={(event) => onClick()}>
            {icon ? (
                <div className="icon">
                    <MaterialIcon icon={icon} size={18} />
                </div>
            ) : null}
            <span className="text">{text}</span>
        </button>
    );
};
