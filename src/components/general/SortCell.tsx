import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SortDirection, SortingProps } from '../../hooks/useSorting';
import { MaterialIcon } from './MaterialIcon';

interface Props extends SortingProps {
    property: string;
    className?: string;
    aligment?: 'center' | 'left';
}

export const SortCell: FC<Props> = ({
    className = '',
    property = '',
    sortProperty,
    sortDirection,
    changeProperty,
    toggleDirection,
    children,
    aligment = 'left',
}) => {
    const handleSelect = () => {
        if (sortProperty === property) toggleDirection();
        else changeProperty(property);
    };

    const icon = useMemo(() => {
        if (sortProperty !== property) return null;
        if (sortDirection === 'asc') return 'arrow_drop_down';
        return 'arrow_drop_up';
    }, [sortDirection, sortProperty]);

    return (
        <th className={`${className} sort_th`} onClick={handleSelect}>
            <div className={`row align_center ${aligment === 'center' ? 'justify_center' : ''}`}>
                {children}
                {icon && <MaterialIcon icon={icon} size={18} cursor="pointer" />}
            </div>
        </th>
    );
};
