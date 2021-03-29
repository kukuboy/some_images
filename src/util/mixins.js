/*
 * @Description:
 * @Author: 水印红枫
 * @Editor: 水印红枫
 * @Date: 2020-11-19 10:04:50
 * @LastEditors: 水印红枫
 */
import { mapGetters } from "vuex";
// import { checkPlatform } from "@/util/myUtil.js";
let mixin_time;
export default {
  data() {
    return {};
  },
  //过滤器
  //   filters: {
  //     numToString(value) {
  //       return value.toString();
  //     }
  //   },
  destroyed() {
    clearTimeout(mixin_time);
  },
  created() {
    console.time("页面加载时间：");
    document.getElementById("app").classList.add("viewFilter");
    mixin_time = setTimeout(() => {
      console.log("开始出现加载条");
      this.$Dialog.ViewLoading();
    }, 1000);
  },
  computed: {
    //计算属性
    ...mapGetters(["loginSign", "deviceId"]),
  },
  mounted() {
    console.timeEnd("页面加载时间：");
    // setTimeout(() => {
    document.getElementById("app").classList.remove("viewFilter");
    this.$Dialog.ViewLoading({
      state: "end",
    });
    clearTimeout(mixin_time);
    // }, 100000);
  },
  methods: {},
};
