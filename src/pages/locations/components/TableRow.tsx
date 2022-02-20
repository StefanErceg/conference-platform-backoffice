import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../api';
import { MaterialIcon } from '../../../components/general/MaterialIcon';
import { TableActions } from '../../../components/general/TableActions';
import { TooltipWrapper } from '../../../components/general/TooltipWrapper';
import { Location } from '../types';
import { LIVE, locationTypes } from '../utils';

interface Props {
    location: Location;
    openModal: (location: Location | null) => void;
    deleteLocation: (id: number) => void;
}

export const TableRow: FC<Props> = ({ location, openModal, deleteLocation }) => {
    const { t } = useTranslation();
    const { id, name, address, room, city, locationTypeName: type, active } = location;

    const cityName = city?.name || '';

    const deleteHandler = async () => {
        try {
            await api.locations.delete(location?.id);
            deleteLocation(id);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <tr>
            <td className="small text_center">{id}</td>
            <td>{name}</td>
            <td>{address}</td>
            <td>{room}</td>
            <td>{cityName ? cityName : ' / '}</td>
            <td className="small text_center">
                <TooltipWrapper text={locationTypes[type]?.name}>
                    <MaterialIcon
                        icon={`${type === LIVE ? 'location_city' : 'cloud'}`}
                        color={type === LIVE ? 'blue' : 'yellow'}
                    />
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
