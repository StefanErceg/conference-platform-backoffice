import { create } from 'lodash';
import { PaginationResponse } from '../../common/types';
import { Resource, ResourceRequest } from '../../pages/resources/types';
import { http } from '../http';

export const resources = {
    getAll(page: number, perPage: number = 15): Promise<PaginationResponse<Resource>> {
        return http.get(`/resources?page=${page}&size=${perPage}`).then((res) => res.data);
    },

    create(data: ResourceRequest) {
        return http.post('/resources', data).then((res) => res.data);
    },

    update(id: number, data: ResourceRequest) {
        return http.put(`/resources/${id}`, data).then((res) => res.data);
    },

    delete(id: number) {
        return http.delete(`/resources/${id}`).then((res) => res.data);
    },
};
