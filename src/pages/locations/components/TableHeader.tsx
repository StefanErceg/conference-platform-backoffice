import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SortCell } from '../../../components/general/SortCell';
import { SortingProps } from '../../../hooks/useSorting';

export const TableHeader: FC<SortingProps> = (props) => {
    const { t } = useTranslation();
    return (
        <thead>
            <tr>
                <SortCell property="id" aligment="center" className="small " {...props}>
                    {t('id')}
                </SortCell>
                <SortCell property="name" {...props}>
                    {t('name')}
                </SortCell>
                <SortCell property="address" {...props}>
                    {t('address')}
                </SortCell>
                <th>{t('room')}</th>
                <th>{t('city')}</th>
                <th className="small text_center">{t('type')}</th>
                <th className="small text_center">{t('active')}</th>
                <th className="small text_center">{t('actions')}</th>
            </tr>
        </thead>
    );
};
