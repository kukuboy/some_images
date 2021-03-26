export default {
  install: function(Vue) {
    Vue.filter("NumHidden", (val = 0) => {
      let num =
        val.length % 2 === 0 ? val.length / 2 : Math.ceil(val.length / 2);
      let middle = Array.prototype.join.call({ length: num + 1 }, "*");
      return (
        val.substring(0, (val.length - num) / 2) +
        middle +
        val.substring((val.length + num) / 2)
      );
    });
  }
};
