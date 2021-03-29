<!--
 * @Description: 
 * @Author: 水印红枫
 * @Date: 2020-07-02 16:46:07
 * @LastEditors: 水印红枫
-->
<template>
  <div id="toast" ref="toast" v-show="show">
    <div class="header" v-if="title_show">{{ title }}</div>
    <div class="content" ref="content">{{ content }}</div>
  </div>
</template>

<script>
let time;
export default {
  name: "toast",
  props: {
    title: {
      type: String,
      default: "提示",
    },
    title_show: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: "请选择评价再提交哦",
    },
    showTime: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  watch: {
    show: {
      handler(newVal) {
        this.change(newVal);
      },
      immediate: true,
    },
  },
  mounted() {
    this.show = true;
    this.init();
  },
  destroyed() {
    clearTimeout(time);
  },
  methods: {
    init() {
      this.$refs.toast.style.opacity = 0.8;
      // let content = this.$refs.content;
      // let toast = this.$refs.toast;
      // this.$nextTick(() => {
      //   toast.style.left =
      //     (document.body.clientWidth - content.clientWidth) / 2 + "px";
      // });
    },
    change(val) {
      if (val) {
        time = setTimeout(() => {
          let vm = document.getElementById("toast");
          if (vm !== null) {
            vm.style.opacity = "0";
            clearTimeout(time);
            time = setTimeout(() => {
              document.body.removeChild(vm);
            }, 1000);
          }
        }, this.showTime);
      }
    },
  },
};
</script>

<style scoped>
#toast {
  position: fixed;
  z-index: 100;
  text-align: center;
  max-width: 80%;
  min-width: 60%;
  word-break: break-all;
  opacity: 0;
  border-radius: 0.2rem;
  background-color: black;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  transition: 1s linear;
}

#toast .header {
  height: 1rem;
  line-height: 1rem;
  font-size: 0.75rem;
  color: white;
  padding: 0 0.3rem;
}

#toast .content {
  font-size: 0.3rem;
  color: white;
  padding: 0.2rem 0.3rem;
  line-height: 0.4rem;
}
</style>
