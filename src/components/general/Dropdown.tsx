import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownItem } from '../../common/types';
import { MaterialIcon } from './MaterialIcon';

interface Props {
    items: DropdownItem[];
    selectedItem: number | null;
    selectItem: (id: number) => void;
    nonSelectedText?: string;
}

export const Dropdown: FC<Props> = ({ items = [], selectedItem = null, selectItem, nonSelectedText = '' }) => {
    const { t } = useTranslation();
    const [contentDisplayed, setContentDisplayed] = useState(false);

    const toggle = () => {
        setContentDisplayed(!contentDisplayed);
    };

    const select = (id: number) => {
        selectItem(id);
        toggle();
    };
    return (
        <div className="dropdown">
            <span className="select_toggler" onClick={toggle}>
                {(selectedItem && items?.find(({ id }) => id === selectedItem)?.name) || nonSelectedText || t('select')}
                <MaterialIcon icon={!contentDisplayed ? 'expand_more' : 'expand_less'} />
            </span>
            <div className={`dropdown_content ${contentDisplayed ? 'active' : ''}`}>
                {items?.map(({ id, name }) => (
                    <span
                        key={id}
                        className={`dropdown_item ${id === selectedItem ? 'selected' : ''}`}
                        onClick={() => select(id)}
                    >
                        {name}
                    </span>
                ))}
            </div>
        </div>
    );
};
