import { t } from 'i18next';

export const LIVE = 'LIVE';
export const ONLINE = 'ONLINE';

export const locationTypes = {
    [LIVE]: {
        id: 1,
        name: t('live'),
    },
    [ONLINE]: {
        id: 2,
        name: t('online'),
    },
};
