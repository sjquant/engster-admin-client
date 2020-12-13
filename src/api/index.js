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

export const subtitleAPI = {
  fetchSubtitles({ contentId, cursor, limit }) {
    return request
      .get("/subtitles", { params: { content_id: contentId, cursor, limit } })
      .then(({ data }) => data);
  },
  downloadCSV({ subtitle, translation, filename = "file.csv" }) {
    const formData = new FormData();
    formData.append("subtitle", subtitle);
    if (translation) formData.append("translation", translation);

    return request
      .post("/subtitles/convert-to-csv", formData, {
        headers: {
          Accept: "text/csv",
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      })
      .then(({ data }) => {
        const url = window.URL.createObjectURL(
          new Blob(
            [
              new Uint8Array([0xef, 0xbb, 0xbf]), // UTF-8 BOM
              data,
            ],
            { type: "text/csv;charset=utf-8" }
          )
        );
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", filename); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  },
};
