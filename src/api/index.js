import { request } from "../utils";

const { axiosObj } = request;

axiosObj.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    if ([401, 403].indexOf(error.response.status) >= 0) {
      window.location = "/login";
      return;
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  obtainToken({ email, password }) {
    return request
      .post("/auth/obtain-token", { email, password })
      .then(({ data }) => {
        request.setCSRFHeader();
        return data;
      });
  },
  refreshToken() {
    return request.post("/auth/refresh-token").then(({ data }) => {
      request.setCSRFHeader();
      return data;
    });
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
  fetchSubtitles(options = {}) {
    const { contentId, cursor, limit = 20 } = options;
    return request
      .get("/subtitles", {
        params: { content_id: contentId, cursor, limit },
      })
      .then(({ data }) => data);
  },
  fetchTranslations(subtitleId, options = {}) {
    const { status, limit, offset } = options;
    return request
      .get(`/subtitles/${subtitleId}/translations`, {
        params: {
          status,
          limit,
          offset,
        },
      })
      .then(({ data }) => data);
  },
  uploadSubtitleCSV({ file, contentId }) {
    const formData = new FormData();
    formData.append("input", file);

    return request
      .post("/subtitles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: { content_id: contentId },
      })
      .then(({ data }) => data);
  },
  downloadAsCSV({ contentId, filename = "file.csv" }) {
    return request
      .post(
        "/subtitles/download-as-csv",
        { content_id: contentId },
        {
          headers: {
            Accept: "text/csv",
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      )
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
  convert2CSV({ subtitle, translation, filename = "file.csv" }) {
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

export const translationAPI = {
  addTranslationCSV(file) {
    const formData = new FormData();
    formData.append("file", file);
    return request.post("/translations/add-csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  fetchTranslations(options = {}) {
    const { status, limit = 20, offset } = options;
    return request
      .get("/translations", {
        params: {
          status,
          limit,
          offset,
        },
      })
      .then(({ data }) => data);
  },
  fetchReveiws(translationId, options = {}) {
    const { limit = 20, offset } = options;
    return request
      .get(`/translations/${translationId}/reviews`, {
        params: {
          limit,
          offset,
        },
      })
      .then(({ data }) => data);
  },
  createReview(translationId, { status, message }) {
    return request
      .post(`/translations/${translationId}/reviews`, { status, message })
      .then(({ data }) => data);
  },
};
