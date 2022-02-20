import { City } from '../cities/types';

export interface Location {
    id: number;
    name: string;
    active: boolean;
    address: string;
    room: string;
    city: City;
    locationTypeName: 'LIVE' | 'ONLINE';
}

export interface LocationRequest {
    name: string;
    address: string;
    active: boolean;
    room: string;
    cityId: number | null;
    locationTypeId: number;
}
