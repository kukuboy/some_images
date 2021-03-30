// import ComponentName from "@/components/ComponentName.vue";
// import { mapGetters } from "vuex";
// import mixins from "@/util/mixins";

export default {
  name: "ImagesViews",
  // components:{
  //   ComponentName
  // },
  // mixins:[mixins],
  // computed: {
  //   ...mapGetters(["StoreValue"])
  // },
  data() {
    return {
      page: 1,
      size: 10,
      imagesData: [],
      favorite: [],
      canQuery: true,
      dialogShow: false,
      phone: "18860360510",
      isFavorite: false,
    };
  },
  // watch: {
  //   StoreValue: {
  //     handler(newVal) {
  //     },
  //    immediate: false
  //  }
  //  },
  created() {
    this.query();
  },
  // mounted() {
  //  this.init()
  // },
  // destroyed() {
  // },
  methods: {
    query() {
      let { page, size } = this;
      this.$http
        .img({
          page,
          size,
        })
        .then((res) => {
          console.log(res);
          this.imagesData = this.imagesData.concat(res.data);
          for (let i of this.imagesData) {
            i.imgSrc = JSON.parse(i.imgSrc);
          }
          if (res.data.length < size) this.canQuery = false;
          else this.canQuery = true;
        });
      this.getFavorite();
    },
    getFavorite() {
      this.$http
        .getFavorite({
          phone: this.phone,
        })
        .then((res) => {
          this.favorite = JSON.parse(res.data) || [];
        });
    },
    removeF(val) {
      let index = this.favorite.indexOf(val);
      if (index >= 0) this.favorite.splice(index, 1);
      this.$http.updateFavorite({
        phone: this.phone,
        favorite: JSON.stringify(this.favorite),
      });
    },
    addF(val) {
      this.favorite.push(val);
      this.$http.updateFavorite({
        phone: this.phone,
        favorite: JSON.stringify(this.favorite),
      });
    },
    srcollV(e) {
      if (
        this.canQuery &&
        e.target.scrollTop + e.target.clientHeight + 100 > e.target.scrollHeight
      ) {
        this.canQuery = false;
        this.page++;
        this.query();
      }
    },
  },
};
