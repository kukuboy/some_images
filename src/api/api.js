import Axios from "axios";
// import query from 'querystring'
import Dialog from "@/util/dialog/dialog";

// Vue.use(Axios)
const httpA = Axios.create({
  timeout: 5000,
  // headers: {
  //   'Content-Type': 'application/json'
  // }
});

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, "$http", {
      value: this, // 设置值
      writable: false, // 是否可以改变，默认false，更改会报undefined
    });
    // httpA.defaults.baseURL = process.env.VUE_APP_BASEURL;
    // httpA.defaults.headers.common['token'] = localStorage.invest_h5_token
    sessionStorage.asking = "\n";
    // 设置请求拦截器
    httpA.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    // 设置响应拦截器
    httpA.interceptors.response.use(
      (res) => {
        sessionStorage.asking = sessionStorage.asking.replace(
          "the api:" + res.config.url + " is asking\n",
          ""
        );
        // 统一判断，如果请求成功返回数据
        let data = res.data;
        let code = data.code;
        if (code) {
          return data;
        } else {
          Dialog.Toast({
            content: data.msg,
          });
          return data;
        }
      },
      (error) => {
        if (error.config) {
          sessionStorage.asking = sessionStorage.asking.replace(
            "the api:" + error.config.url + " is asking\n",
            ""
          );
        }
        console.log(error);
        return Promise.reject(error);
      }
    );
  },
  //TODO: 接口api
  //TODO: 直接调用
  //TODO：错误接口捕捉
  errorHandler(err) {
    console.log("捕捉到错误", err);
  },
  //TODO: 获取图片
  img(params) {
    return httpA({
      url: "/some_images/getImg",
      params,
      method: "GET",
    });
  },
  //TODO: 查看我的喜爱
  getFavorite(data) {
    return httpA({
      url: "/myApp/getFavorite",
      data,
      method: "POST",
    });
  },
  //TODO: 查看我的喜爱
  updateFavorite(data) {
    return httpA({
      url: "/myApp/updateFavorite",
      data,
      method: "POST",
    });
  },
};
