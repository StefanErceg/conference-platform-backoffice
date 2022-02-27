import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SortCell } from '../../../components/general/SortCell';
import { SortingProps } from '../../../hooks/useSorting';

export const TableHeader: FC<SortingProps> = (props) => {
    const { t } = useTranslation();
    return (
        <thead>
            <tr>
                <SortCell property="id" className="small" aligment="center" {...props}>
                    {t('id')}
                </SortCell>
                <SortCell property="name" {...props}>
                    {t('name')}
                </SortCell>
                <th>{t('properties')}</th>
                <th className="small text_center">{t('actions')}</th>
            </tr>
        </thead>
    );
};
