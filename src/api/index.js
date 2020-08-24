import { request } from "../utils/axios";

export const content = {
  async fetchContents({ limit = 10, cursor = null }) {
    return request
      .get("/subtitle/contents", { params: { limit, cursor } })
      .then(({ data }) => data);
  },
  async createContent(content) {
    return request.post("/subtitle/contents", content);
  },
};
