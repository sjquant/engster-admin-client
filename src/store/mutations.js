export default {
  // Auth
  SET_USER(state, user) {
    if (!user) return;
    state.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  },
  CLEAR_USER(state) {
    state.user = null
    localStorage.removeItem("user")
  },
  // Content
  SET_CONTENT(state, content) {
    state.content = content;
  },
  SET_CONTENTS(state, contents) {
    state.contents = contents;
  },
  APPEND_CONTENTS(state, contents) {
    state.contents.push(...contents);
  },
  SET_CONTENT_HAS_NEXT(state, status) {
    state.contentHasNext = status;
  },
  SET_ALL_GENRES(state, genres) {
    state.allGenres = genres;
  },
};
