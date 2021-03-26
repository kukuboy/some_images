/*
 * @Description:
 * @Author: 水印红枫
 * @Date: 2020-07-02 16:46:07
 * @LastEditors: 水印红枫
 */

import Vue from "vue";

import Toast from "./toast";
import TipShadow from "./tipShadow";
import Confirm from "./confirm";
import ViewLoading from "./viewLoading";

const Dialog = {
  install(Vue) {
    Object.defineProperty(Vue.prototype, "$Dialog", {
      value: this,
      writable: false
    });
  },
  Toast(options = {}) {
    const ToastFrame = Vue.extend(Toast);
    let vm = document.getElementById("toast");
    if (vm !== null) {
      document.body.removeChild(vm);
    }
    let div = document.createElement("div");
    div.id = "Toast";
    document.body.appendChild(div);
    let $vm = new ToastFrame({
      el: "#Toast"
    });
    if (typeof options === "object") {
      Object.assign($vm, options);
    } else if (typeof options === "string" || typeof options === "number") {
      $vm.content = options;
    }
  },
  TipShadow(options = {}) {
    const TipShadowFrame = Vue.extend(TipShadow);
    let vm = document.getElementById("tipShadow");
    if (vm !== null) {
      document.body.removeChild(vm);
    }
    let div = document.createElement("div");
    div.id = "TipShadow";
    document.body.appendChild(div);
    let $vm = new TipShadowFrame({
      el: "#TipShadow"
    });
    if (typeof options === "object") {
      Object.assign($vm, options);
    } else if (typeof options === "string" || typeof options === "number") {
      $vm.content = options;
    }
  },
  Confirm(options = {}) {
    const ConfirmFrame = Vue.extend(Confirm);
    let vm = document.getElementById("confirm");
    if (vm !== null) {
      document.body.removeChild(vm);
    }
    let div = document.createElement("div");
    div.id = "Confirm";
    document.body.appendChild(div);
    let $vm = new ConfirmFrame({
      el: "#Confirm"
    });
    if (typeof options === "object") {
      Object.assign($vm, options);
    } else if (typeof options === "string" || typeof options === "number") {
      $vm.content = options;
    }
  },
  ViewLoading(options = {}) {
    const ViewLoadingFrame = Vue.extend(ViewLoading);
    let vm = document.getElementById("viewLoading");
    if (vm !== null) {
      document.body.removeChild(vm);
    }
    if (options.state === "end") {
      return;
    }
    let div = document.createElement("div");
    div.id = "ViewLoading";
    document.body.appendChild(div);
    let $vm = new ViewLoadingFrame({
      el: "#ViewLoading"
    });
    if (typeof options === "object") {
      Object.assign($vm, options);
    } else if (typeof options === "string" || typeof options === "number") {
      $vm.content = options;
    }
  }
};
export default Dialog;
