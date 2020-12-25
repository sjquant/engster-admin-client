import { throttle } from "throttle-debounce";

const scrollCheck = (fn, distance) => {
  let scrollEventHeight = document.documentElement.scrollHeight;
  let viewportScrollTop = Math.max(
    window.pageYOffset || 0,
    document.documentElement.scrollTop
  );
  let viewportBottom =
    viewportScrollTop + document.documentElement.clientHeight;

  if (scrollEventHeight - viewportBottom <= distance) fn();
};

export const scrollMixin = {
  data() {
    return {
      $_scrollListener: null,
    };
  },
  deactivated() {
    if (this.$_scrollListener)
      window.removeEventListener("scroll", this.$_scrollListener);
  },
  beforDestroy() {
    if (this.$_scrollListener)
      window.removeEventListener("scroll", this.$_scrollListener);
  },
  methods: {
    onScroll(callback, { delay = 500, distance = 200 } = {}) {
      this.$_scrollListener = throttle(delay, () =>
        scrollCheck(callback, distance)
      );

      window.addEventListener("scroll", this.$_scrollListener);
    },
  },
};

export default scrollMixin;
