export default {
  set(key, value, durationDay = 7) {
    let date = new Date();
    date.setTime(date.getTime() + durationDay * 60 * 60 * 24 * 1000);
    document.cookie = `${key}=${value}; expires=${date.toUTCString()}"; path=/`;
  },
  parse(key) {
    const cookie = document.cookie;

    if (!cookie) {
      return null;
    }

    const value = cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
    return value ? value[2] : null;
  },
};
