import { PaginationResponse } from '../../common/types';
import { RatingSchema } from '../../pages/ratings/types';
import { http } from '../http';

export const ratings = {
    getAllSchemas(page: number, perPage: number = 15): Promise<PaginationResponse<RatingSchema>> {
        return http.get(`/rating-schemas?page=${page}&size=${perPage}`).then((res) => res.data);
    },
};
