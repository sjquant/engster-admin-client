export default {
  isAdmin({ user }) {
    return user && user.is_admin;
  },
  contentCursor({ contents }) {
    if (contents.length === 0) return null;
    return contents[contents.length - 1].id;
  },
  subtitleCursor({ subtitles }) {
    if (subtitles.length === 0) return null;
    return subtitles[subtitles.length - 1].id;
  },
};
