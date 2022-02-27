import React, { FC } from 'react';

interface Props {
    icon: string;
    color?: 'red' | 'green' | 'yellow' | 'blue';
    size?: number;
    onClick?: () => void;
    cursor?: 'pointer' | 'default';
    hoverColor?: 'red' | 'green' | 'yellow' | 'blue';
    className?: string;
}

export const MaterialIcon: FC<Props> = ({
    icon,
    color = '',
    size,
    onClick = () => {},
    cursor = 'default',
    hoverColor = null,
    className = '',
}) => {
    return (
        <span
            className={`material-icons ${size ? `md-${size}` : ''} ${cursor}_cursor ${
                hoverColor ? `hover_${hoverColor}` : ''
            } ${color ? color : ''} ${className}`}
            onClick={onClick}
        >
            {icon}
        </span>
    );
};
