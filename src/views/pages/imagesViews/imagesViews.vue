<template>
  <div class="ImagesViews">
    <img
      class="ImagesViews-img"
      v-for="(item, index) in imagesData"
      :key="'img' + index"
      :src="item.imgSrc"
    />
    <img :src="imagesData[0].imgSrc"
  </div>
</template>

<script src="./imagesViews.js"></script>

<style scoped lang="scss">
@import "./imagesViews.scss";
</style>
