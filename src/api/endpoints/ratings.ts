import { PaginationResponse } from '../../common/types';
import { RatingSchema, RatingSchemaRequest } from '../../pages/ratings/types';
import { http } from '../http';

export const ratings = {
    getAllSchemas(page: number, perPage: number = 15): Promise<PaginationResponse<RatingSchema>> {
        return http.get(`/rating-schemas?page=${page}&size=${perPage}`).then((res) => res.data);
    },

    getSchemaById(id: number): Promise<RatingSchema> {
        return http.get(`/rating-schemas/${id}`).then((res) => res.data);
    },

    createSchema(data: RatingSchemaRequest): Promise<RatingSchema> {
        return http.post('/rating-schemas', data).then((res) => res.data);
    },

    updateSchema(id: number, data: RatingSchemaRequest): Promise<RatingSchema> {
        return http.put(`/rating-schemas/${id}`, data).then((res) => res.data);
    },

    deleteSchema(id: number) {
        return http.delete(`/rating-schemas/${id}`).then((res) => res.data);
    },
};
