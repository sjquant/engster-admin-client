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
    return request.post("/auth/sign-out").then(({ data }) => data);
  },
};

export const contentAPI = {
  fetchContents({ limit = 10, cursor = null }) {
    return request
      .get("/contents", { params: { limit, cursor } })
      .then(({ data }) => data);
  },
  getContent(id) {
    return request.get(`/contents/${id}`).then(({ data }) => data);
  },
  createContent(content) {
    return request.post("/contents", content);
  },
  updateContent(id, content) {
    return request.put(`/contents/${id}`, content).then(({ data }) => data);
  },
  deleteContent(id) {
    return request.delete(`/contents/${id}`).then(({ data }) => data);
  },
};

export const genreAPI = {
  fetchAllGenres() {
    return request.get("/genres").then(({ data }) => data);
  },
  createGenre(genre) {
    return request.post("/genres", { genre });
  },
};
