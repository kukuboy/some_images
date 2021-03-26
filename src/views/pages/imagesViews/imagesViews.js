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
        });
    },
  },
};
