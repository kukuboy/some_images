<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
let deTimer;
export default {
  name: "App",
  destroyed() {
    window.removeEventListener(this.resizeEvt, this.adjustRem(), false);
    clearInterval(deTimer);
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 调整rem尺寸
      this.adjustRem();
      // 去除广告
      this.adRemove();
      // 修复字体放大手机上rem尺寸错误的问题
      window.addEventListener(this.resizeEvt, this.adjustRem(), false);
    },
    adjustRem() {
      let clientWidth = document.documentElement.clientWidth;
      if (!clientWidth) return;
      let pxOneRem = clientWidth / 7.5;
      document.documentElement.style.fontSize = pxOneRem + "px";
      // 纠错函数
      function adapt() {
        let d = window.document.createElement("div");
        d.style.width = "1rem";
        d.style.display = "none";
        let head = window.document.getElementsByTagName("head")[0];
        head.appendChild(d);
        let defaultFontSize = parseFloat(
          window.getComputedStyle(d, null).getPropertyValue("width")
        );
        return defaultFontSize;
      }
      pxOneRem = (pxOneRem * pxOneRem) / adapt();
      document.documentElement.style.fontSize = pxOneRem + "px";
    },
    adRemove() {
      //以下代码为删除嵌入广告
      let del_times = 0;
      function adGo() {
        let iframe = document.getElementsByTagName("iframe")[0];
        if (iframe) {
          console.log(iframe);

          //循环 iframe 父类，直到找到body和body的下一级，然后整个嵌入的代码删除。
          let bodyNode = { tagName: "" },
            iframeParent,
            targetNode = iframe.parentNode;
          while (bodyNode.tagName != "BODY") {
            bodyNode = targetNode;
            if (bodyNode.tagName != "BODY") {
              iframeParent = targetNode;
              targetNode = targetNode.parentNode;
            }
          }
          if (iframeParent)
            //如果iframe有父类
            bodyNode.removeChild(iframeParent);
          else bodyNode.removeChild(iframe);
        }
        del_times++;
        if (del_times > 10) clearInterval(deTimer);
      }
      deTimer = setInterval(adGo(), 500); //把这个1000, 调低一点，比如200
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body {
  margin: 0;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
