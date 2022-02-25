import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { MaterialIcon } from '../../general/MaterialIcon';

interface Props {
    path: string;
    text: string;
    icon: string;
}

export const SidebarLink: FC<Props> = ({ path, text, icon }) => {
    let history = useHistory();

    const handleSelect = () => {
        history.push(path);
    };

    const selected = history.location.pathname.includes(path);

    return (
        <li className={`${selected ? 'selected' : ''}`} onClick={handleSelect}>
            <div className="icon">
                <MaterialIcon icon={icon} size={24} />
            </div>
            <span className="text">{text}</span>
        </li>
    );
};
