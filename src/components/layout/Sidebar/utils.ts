import i18n from '../../../locale/i18n';

export const navLinks = [
    {
        text: i18n.t('nav.conferences'),
        path: '/conferences',
        icon: 'group_add',
    },
    {
        text: i18n.t('nav.resources'),
        path: '/resources',
        icon: 'web_asset',
    },
    {
        text: i18n.t('nav.ratings'),
        path: '/ratings',
        icon: 'thumb_up',
    },
    {
        text: i18n.t('nav.locations'),
        path: '/locations',
        icon: 'location_on',
    },
    {
        text: i18n.t('nav.cities'),
        path: '/cities',
        icon: 'location_city',
    },
    {
        text: i18n.t('nav.countries'),
        path: '/countries',
        icon: 'flag',
    },
    {
        text: i18n.t('nav.logout'),
        path: '/login',
        icon: 'logout',
    },
];
