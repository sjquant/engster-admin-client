import { authAPI, contentAPI, genreAPI, subtitleAPI } from "../api";

export default {
  async OBTAIN_TOKEN({ commit }, { email, password }) {
    const { user } = await authAPI.obtainToken({ email, password });
    commit("SET_USER", user);
  },
  async REFRESH_TOKEN({ commit }) {
    const { user } = await authAPI.refreshToken();
    commit("SET_USER", user);
  },
  async SIGN_OUT({ commit }) {
    commit("CLEAR_USER");
    await authAPI.signOut();
  },
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
    return data;
  },
  async GET_CONTENT({ commit }, id) {
    const content = await contentAPI.getContent(id);
    commit("SET_CONTENT", content);
    return content;
  },
  async CREATE_CONTENT(_, content) {
    await contentAPI.createContent(content);
  },
  async UPDATE_CONTENT(_, { id, content }) {
    await contentAPI.updateContent(id, content);
  },
  async DELETE_CONTENT(_, id) {
    await contentAPI.deleteContent(id);
  },
  async FETCH_ALL_GENRES({ commit }) {
    const { data } = await genreAPI.fetchAllGenres();
    commit("SET_ALL_GENRES", data);
    return data;
  },
  async FETCH_SUBTITLES({ commit }, { contentId, cursor, limit }) {
    const { data } = await subtitleAPI.fetchSubtitles({
      contentId,
      cursor,
      limit,
    });
    if (cursor) {
      commit("APPEND_SUBTITLES", data);
    } else {
      commit("SET_SUBTITLES", data);
    }
    return data;
  },
};
