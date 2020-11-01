import { request } from "../utils/axios";

export const contentAPI = {
  fetchContents({ limit = 10, cursor = null }) {
    return request
      .get("/subtitle/contents", { params: { limit, cursor } })
      .then(({ data }) => data);
  },
  getContent(id) {
    return request.get(`/subtitle/contents/${id}`).then(({ data }) => data);
  },
  createContent(content) {
    return request.post("/subtitle/contents", content);
  },
  updateContent(id, content) {
    return request.put(`/subtitle/contents/${id}`, content).then(({data}) => data)
  }
};

export const genreAPI = {
  fetchAllGenres() {
    return request
      .get("/subtitle/genres")
      .then(({ data }) => data);
  },
  createGenre(genre) {
    return request.post("/subtitle/contents", { genre });
  },
};