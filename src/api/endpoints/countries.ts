import { PaginationResponse } from '../../common/types';
import { Country } from '../../pages/countries/types';
import { http } from '../http';

export const countries = {
    getAll(page: number, perPage: number = 15): Promise<PaginationResponse<Country>> {
        return http.get(`/countries?page=${page}&size=${perPage}`).then((res) => res.data);
    },

    create(name: string): Promise<Country> {
        return http.post('/countries', { name }).then((res) => res.data);
    },

    update(id: number, name: string): Promise<Country> {
        return http.put(`/countries/${id}`, { name }).then((res) => res.data);
    },

    delete(id: number) {
        return http.delete(`/countries/${id}`).then((res) => res.data);
    },
};
