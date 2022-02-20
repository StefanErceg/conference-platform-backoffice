export interface RatingProperty {
    id: number;
    name: string;
    description: string;
    rangeStart: number;
    rangeEnd: number;
}

export interface RatingPropertyRequest {
    name: string;
    description: string;
    rangeStart: number;
    rangeEnd: number;
}

export interface RatingSchema {
    id: number;
    name: string;
    properties: RatingProperty[];
}

export interface RatingSchemaRequest {
    name: string;
    properties: RatingProperty[];
}
