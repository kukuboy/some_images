/**
 * @author 水印红枫
 * @date 2020/6/30 8:54
 * @Description:
 */
/*
 * @Description: 组件快速生成脚本
 * @Date: 2018-12-06 10:26:23
 * @LastEditTime: 2020-09-16 13:40:23
 */

const fs = require("fs");
const path = require("path");
const basePath = path.resolve(__dirname, "../src");

const dirName = process.argv[2];
if (!dirName) {
  console.log("文件夹名称不能为空！");
  console.log("示例：yarn com ComponmentName");
  process.exit(0);
}
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);

/**
 * @msg: vue页面模版
 */
const VueTemp = `<template>
  <div class="${capPirName}">
    ${capPirName}
  </div>
</template>

<script>
// import ComponentName from "@/components/ComponentName.vue";
// import { mapGetters } from "vuex";

export default {
  name: "${capPirName}"
  // components:{
  //   ComponentName
  // },
  // computed: {
  //   ...mapGetters(["StoreValue"])
  // },
  // props: {
  // }
  // data() {
  //  return {
  //  }
  // }
  // watch: {
  //   StoreValue: {
  //     handler(newVal) {
  //     },
  //    immediate: false
  //  }
  //  },
  // mounted() {
  //  this.init()
  // },
  // destroyed() {
  // },
  // methods: {
  //  init() {
  //  }
  // }
};
</script>
<style scoped lang="scss">
.${capPirName} {
  width: 100%;
}
</style>
`;
if (!fs.existsSync(`${basePath}/components`)) {
  fs.mkdirSync(`${basePath}/components`);
}
process.chdir(`${basePath}/components`); // cd views
fs.writeFileSync(`${dirName}.vue`, VueTemp); // vue

process.exit(0);
