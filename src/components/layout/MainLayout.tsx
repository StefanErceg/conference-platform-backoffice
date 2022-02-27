import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Sidebar } from './Sidebar';

interface Props {
    sidebarExclude?: string;
}

export const MainLayout: FC<Props> = ({ children, sidebarExclude }) => {
    const history = useHistory();

    const sidebarDisabled = sidebarExclude && history.location.pathname.includes(sidebarExclude);
    return (
        <div className="main_layout">
            {!sidebarDisabled && <Sidebar />}
            <div className="main_content">{children}</div>
        </div>
    );
};
