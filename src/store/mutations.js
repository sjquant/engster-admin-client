export default {
  SET_CONTENTS(store, contents) {
    store.contents = contents;
  },
  APPEND_CONTENTS(store, contents) {
    store.contents.push(...contents);
  },
  SET_CONTENT_HAS_NEXT(store, status) {
    store.contentHasNext = status;
  },
  SET_ALL_GENRES(store, genres) {
    store.allGenres = genres
  }
};
