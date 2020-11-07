import { request } from "../utils";

export const authAPI = {
  obtainToken({ email, password }) {
    return request
      .post("/auth/obtain-token", { email, password })
      .then(({ data }) => data);
  },
  refreshToken() {
    return request.post("/auth/refresh-token").then(({ data }) => data);
  },
  signOut() {
    return request.post("/auth/sign-out").then(({data}) => data)
  }
};

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
    return request
      .put(`/subtitle/contents/${id}`, content)
      .then(({ data }) => data);
  },
};

export const genreAPI = {
  fetchAllGenres() {
    return request.get("/subtitle/genres").then(({ data }) => data);
  },
  createGenre(genre) {
    return request.post("/subtitle/contents", { genre });
  },
};
