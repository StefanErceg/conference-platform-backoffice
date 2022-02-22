import React, { FC, Ref } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { RatingProperty } from '../../../types';

interface Props {
    id: number;
    name: string;
    description: string;
    rangeStart: number;
    rangeEnd: number;
    provided: DraggableProvided;
    selectedPropertyId: number | null;
}

export const RatingPropertyRow: FC<Props> = ({
    id,
    name,
    description,
    rangeStart,
    rangeEnd,
    provided,
    selectedPropertyId,
}) => {
    return (
        <div
            className={`row margin_10 border_all border_radius_5 padding_10 rating_property_row ${
                selectedPropertyId === id ? 'rating_property_dragged' : ''
            }`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <span className="col_3 border_right margin_left_10 padding_right_10 margin_right_10">{name}</span>
            <span className="col_7 border_right padding_right_10 margin_right_10">{description}</span>
            <span className="col_1 border_right padding_right_10 margin_right_10 text_center">{rangeStart}</span>
            <span className="col_1 text_center">{rangeEnd}</span>
        </div>
    );
};
