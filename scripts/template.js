/**
 * @author 水印红枫
 * @date 2020/6/30 8:54
 * @Description:
 */
/*
 * @Description: 页面快速生成脚本
 * @Date: 2018-12-06 10:28:08
 * @LastEditTime: 2020-11-19 14:06:36
 */
const fs = require("fs");
const path = require("path");
const basePath = path.resolve(__dirname, "../src");

const dirName = process.argv[2];
if (!dirName) {
  console.log("文件夹名称不能为空！");
  console.log("示例：yarn tem PageName");
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

<script src="./${dirName}.js"></script>

<style scoped lang="scss">
@import "./${dirName}.scss";
</style>
`;

// js 模版
const jsTemp = `// import ComponentName from "@/components/ComponentName.vue";
// import { mapGetters } from "vuex";
// import mixins from "@/util/mixins";

export default {
  name: "${capPirName}"
  // components:{
  //   ComponentName
  // },
  // mixins:[mixins],
  // computed: {
  //   ...mapGetters(["StoreValue"])
  // },
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
}`;

// scss 模版
const scssTemp = `.${capPirName} {
  width: 100%;
}`;

if (!fs.existsSync(`${basePath}/views/pages`)) {
  fs.mkdirSync(`${basePath}/views/pages`);
}
fs.mkdirSync(`${basePath}/views/pages/${dirName}`); // mkdir
process.chdir(`${basePath}/views/pages/${dirName}`); // cd views
fs.writeFileSync(`${dirName}.vue`, VueTemp); // vue
fs.writeFileSync(`${dirName}.js`, jsTemp); // js
fs.writeFileSync(`${dirName}.scss`, scssTemp); // scss

process.exit(0);
