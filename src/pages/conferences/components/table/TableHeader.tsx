import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const TableHeader: FC = () => {
    const { t } = useTranslation();
    return (
        <thead>
            <tr>
                <th className="small text_center">{t('id')}</th>
                <th>{t('name')}</th>
                <th>{t('start')}</th>
                <th>{t('end')}</th>
                <th>{t('description')}</th>
                <th className="small text_center">{t('actions')}</th>
            </tr>
        </thead>
    );
};