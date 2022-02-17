import { PaginationResponse } from "../common/types";
import { City } from "../pages/cities/types";
import { http } from "./http";

export const cities = {
  getAll(
    page: number,
    perPage: number = 15
  ): Promise<PaginationResponse<City>> {
    return http
      .get(`/cities?page=${page}&size=${perPage}`)
      .then((res) => res.data);
  },

  create(name: string, countryId: number) {
    return http.post("/cities", { name, countryId }).then((res) => res.data);
  },

  update(id: number, name: string, countryId: number) {
    return http
      .put(`/cities/${id}`, { name, countryId })
      .then((res) => res.data);
  },

  delete(id: number) {
    return http.delete(`/cities/${id}`).then((res) => res.data);
  },
};
