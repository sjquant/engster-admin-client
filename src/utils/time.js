export default {
  sec2time(sec) {
    return new Date(sec * 1000).toISOString().substr(11, 8);
  },
};
