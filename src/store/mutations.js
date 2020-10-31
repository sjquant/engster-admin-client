export default {
  SET_CONTENT(state, content) {
    state.content = content
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
    state.allGenres = genres
  }
};
