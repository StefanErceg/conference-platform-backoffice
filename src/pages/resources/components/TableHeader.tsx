import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const TableHeader: FC = () => {
    const { t } = useTranslation();
    return (
        <thead>
            <tr>
                <th className="small text_center">{t('id')}</th>
                <th>{t('name')}</th>
                <th>{t('identifier')}</th>
                <th>{t('description')}</th>
                <th>{t('type')}</th>
                <th className="small text_center">{t('actions')}</th>
            </tr>
        </thead>
    );
};
