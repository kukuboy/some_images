<!--
 * @Description: 
 * @Author: 水印红枫
 * @Editor: 水印红枫
 * @Date: 2020-11-19 14:42:35
 * @LastEditors: 水印红枫
-->
// 上下伸缩加载五彩块
<template>
  <div id="viewLoading">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "viewLoading"
};
</script>

<style scoped>
#viewLoading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 36vh 2.25rem;
  z-index: 100;
}

#viewLoading div {
  width: 0.2rem;
  height: 1rem;
  margin: 0.2rem;
  display: inline-block;
  background-color: #e83030;
  border-radius: 40%;
}

#viewLoading div:nth-child(1) {
  animation: loading 0.4s ease 0s infinite alternate;
}

#viewLoading div:nth-child(2) {
  animation: loading 0.4s ease 0.08s infinite alternate;
}

#viewLoading div:nth-child(3) {
  animation: loading 0.4s ease 0.16s infinite alternate;
}

#viewLoading div:nth-child(4) {
  animation: loading 0.4s ease 0.24s infinite alternate;
}

#viewLoading div:nth-child(5) {
  animation: loading 0.4s ease 0.32s infinite alternate;
}

@keyframes loading {
  from {
    /*缩放y轴*/
    transform: scaleY(0.3);
  }

  to {
    transform: scaleY(2);
  }
}
</style>
