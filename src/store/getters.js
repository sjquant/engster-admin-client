export default {
  contentCursor({ contents }) {
    if (contents.length === 0) return null;
    return contents[contents.length - 1].id;
  },
};
