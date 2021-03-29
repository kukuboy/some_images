<template>
  <div class="home">
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  destroyed() {
    window.removeEventListener("unload", this.saveState); // 解决刷新后vux内容丢失问题
    window.removeEventListener("popstate", this.fun, false); //false阻止默认事件
  },
  data() {
    return {
      preloadData: [],
      resizeEvt: "orientationchange" in window ? "orientationchange" : "resize",
      scrollBottom: true,
    };
  },
  mounted() {
    this.init();
    this.preload();
  },
  methods: {
    init() {
      // 解决刷新后vux内容丢失问题
      window.addEventListener("unload", this.saveState);
      // 监听后退
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", this.fun, false); //false阻止默认事件
      }
      window.onscroll = () => {
        let clientHeight =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
        let scrollTop =
          document.documentElement.scrollTop == 0
            ? document.body.scrollTop
            : document.documentElement.scrollTop;
        let scrollHeight =
          document.documentElement.scrollTop == 0
            ? document.body.scrollHeight
            : document.documentElement.scrollHeight;
        if (clientHeight + scrollTop + 30 >= scrollHeight) {
          if (this.scrollBottom) {
            this.scrollBottom = false;
            // this.$sensors.trackSlide(this.$route.meta, "滑动到底部");
          }
        } else {
          this.scrollBottom = true;
        }
      };
    },
    fun() {
      console.log("监听到页面进行了后退");
    },
    saveState() {
      this.clearState();
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
      sessionStorage.setItem("state_page", 1);
    },
    clearState() {
      //刷新后清空的数据放在这里
    },
    preload() {
      setTimeout(() => {
        for (let i of this.preloadData) {
          let image = new Image();
          image.onload = function () {
            image.onload = null;
          };
          image.src = i;
        }
      }, 3000);
    },
  },
};
</script>
