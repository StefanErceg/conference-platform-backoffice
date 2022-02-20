import React, { FC } from 'react';
import { TableActions } from '../../../components/general/TableActions';
import { RatingSchema } from '../types';

interface Props {
    ratingSchema: RatingSchema;
    deleteSchema: (id: number) => void;
}

export const TableRow: FC<Props> = ({ ratingSchema, deleteSchema }) => {
    const { id = 0, name = '', properties = [] } = ratingSchema;

    const propertiesField = properties?.map(({ name }) => name).join(' | ');

    const editHandler = () => {};

    const deleteHandler = () => {};
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{propertiesField}</td>
            <TableActions onEdit={editHandler} onDelete={deleteHandler} />
        </tr>
    );
};
