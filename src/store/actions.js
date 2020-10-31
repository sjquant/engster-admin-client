import { contentAPI, genreAPI } from "../api";

export default {
  async FETCH_CONTENTS({ commit }, { cursor = null, limit = 20 }) {
    const { data } = await contentAPI.fetchContents({ cursor, limit });

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
  async GET_CONTENT({commit}, id) {
    const content = await contentAPI.getContent(id)
    commit("SET_CONTENT", content)
  },
  async CREATE_CONTENT(_, content) {
    await contentAPI.createContent(content);
  },
  async FETCH_ALL_GENRES({ commit }) {
    const { data } = await genreAPI.fetchAllGenres()
    commit("SET_ALL_GENRES", data)
  }
};
