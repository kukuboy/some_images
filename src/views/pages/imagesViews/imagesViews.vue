<template>
  <div class="ImagesViews" scroll="srcollV">
    <div
      class="ImagesViews-imgFrame"
      v-for="(items, index) in imagesData"
      :key="'imgFrame' + index"
      v-show="!isFavorite || (isFavorite && favorite.includes(items.href))"
    >
      <img
        class="ImagesViews-imgFrame-img"
        v-for="(item, index) in items.imgSrc"
        :key="'img' + index"
        v-lazy="item"
      />
      <i
        class="ImagesViews-imgFrame-favorite iconfont icon-xiai1"
        v-if="favorite.includes(items.href)"
        @click="removeF(items.href)"
      ></i>
      <i
        class="ImagesViews-imgFrame-favorite iconfont icon-xiai"
        v-else
        @click="addF(items.href)"
      ></i>
    </div>
    <i
      class="ImagesViews-user iconfont icon-yonghu"
      @click="dialogShow = true"
    ></i>
    <div v-show="dialogShow" class="ImagesViews-dialog">
      <input class="ImagesViews-dialog-input" v-model="phone" />
      <div
        class="ImagesViews-dialog-button"
        @click="
          isFavorite = !isFavorite;
          dialogShow = false;
        "
      >
        {{ isFavorite ? "退出我的喜欢" : "进入我的喜欢" }}
      </div>
      <div class="ImagesViews-dialog-button" @click="dialogShow = false">
        退出
      </div>
    </div>
  </div>
</template>

<script src="./imagesViews.js"></script>

<style scoped lang="scss">
@import "./imagesViews.scss";
</style>
