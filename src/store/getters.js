export default {
  isAdmin({ user }) {
    return (user && user.is_admin)
  },
  contentCursor({ contents }) {
    if (contents.length === 0) return null;
    return contents[contents.length - 1].id;
  },
};
