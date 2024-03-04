import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("mainStore", () => {

  const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  function open(url, storeId) {
    url = url + `?storeId=${storeId}`
    if (isiOS) {
      window.location.href = url;
    } else {
      window.open(url);
    }
  }


  return {
    open,
    isiOS
  };
});
