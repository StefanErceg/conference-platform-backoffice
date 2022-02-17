import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MaterialIcon } from '../../../components/general/MaterialIcon';
import { TableActions } from '../../../components/general/TableActions';
import { TooltipWrapper } from '../../../components/general/TooltipWrapper';
import { Location } from '../types';

interface Props {
    location: Location;
    openModal: (location: Location | null) => void;
    deleteLocation: (id: number) => void;
}

export const TableRow: FC<Props> = ({ location, openModal, deleteLocation }) => {
    const { t } = useTranslation();
    const {
        id,
        name,
        address,
        room,
        city: { name: cityName },
        locationTypeName: type,
        active,
    } = location;

    const LIVE = 'LIVE';
    const ONLINE = 'ONLINE';

    const deleteHandler = async () => {};
    return (
        <tr>
            <td className="small text_center">{id}</td>
            <td>{name}</td>
            <td>{address}</td>
            <td>{room}</td>
            <td>{cityName}</td>
            <td className="small text_center">
                <TooltipWrapper text={type === LIVE ? t('live') : t('online')}>
                    <MaterialIcon icon={`${type === LIVE ? 'location_city' : 'cloud'}`} />
                </TooltipWrapper>
            </td>
            <td className="small text_center">
                <MaterialIcon icon={`${active ? 'check' : 'clear'}`} color={`${active ? 'green' : 'red'}`} />
            </td>
            <TableActions
                onEdit={() => {
                    openModal(location);
                }}
                onDelete={deleteHandler}
            />
        </tr>
    );
};
