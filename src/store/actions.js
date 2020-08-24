import { content } from "../api";

export default {
  async FETCH_CONTENTS({ commit }, { cursor = null, limit = 20 }) {
    const { data } = await content.fetchContents({ cursor, limit });

    if (data.length === 0) {
      commit("SET_CONTENT_HAS_NEXT", false);
      return;
    }

    if (cursor) {
      commit("APPEND_CONTENTS", data);
    } else {
      commit("SET_CONTENTS", data);
      commit("SET_CONTENT_HAS_NEXT", true);
    }
  },
  async CREATE_CONTENT(_, content) {
    await content.createContent(content);
  },
};
