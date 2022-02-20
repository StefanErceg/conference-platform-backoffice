import { PaginationResponse } from '../../common/types';
import { Location, LocationRequest } from '../../pages/locations/types';
import { http } from '../http';

export const locations = {
    getAll(page: number, perPage: number = 15): Promise<PaginationResponse<Location>> {
        return http.get(`/locations?page=${page}&size=${perPage}`).then((res) => res.data);
    },

    create(data: LocationRequest) {
        return http.post('/locations', data).then((res) => res.data);
    },

    update(id: number, data: LocationRequest) {
        return http.put(`/locations/${id}`, data).then((res) => res.data);
    },

    delete(id: number) {
        return http.delete(`/locations/${id}`).then((res) => res.data);
    },
};
