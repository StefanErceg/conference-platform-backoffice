import { City } from '../cities/types';

export interface Location {
    id: number;
    name: string;
    active: boolean;
    address: string;
    room: string;
    city: City;
    locationTypeName: string;
}

export interface LocationRequest {
    name: string;
    active: boolean;
    address: string;
    room: string;
    city: City;
    locationTypeName: string;
}
