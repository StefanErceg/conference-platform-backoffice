import { PaginationResponse } from '../../common/types';
import { Conference, ConferenceRequest } from '../../pages/conferences/types';
import { http } from '../http';

export const conferences = {
    getAll(page: number, perPage: number = 15, sort: string = 'id,asc'): Promise<PaginationResponse<Conference>> {
        return http.get(`/conferences?page=${page}&size=${perPage}&sort=${sort}`).then((res) => res.data);
    },
    getById(id: number): Promise<Conference> {
        return http.get(`/conferences/${id}`).then((res) => res.data);
    },

    create(data: ConferenceRequest): Promise<Conference> {
        return http.post('/conferences', data).then((res) => res.data);
    },
    update(id: number, data: ConferenceRequest): Promise<Conference> {
        return http.put(`/conferences/${id}`, data).then((res) => res.data);
    },
    delete(id: number) {
        return http.delete(`/conferences/${id}`).then((res) => res.data);
    },
};
