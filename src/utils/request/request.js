import axios from "axios";
import { getStorage } from "@/utils/common.js";
import { useStore } from "@/store/store.js";
const store = useStore();
import {
  tokenEncryption,
  wechatWebEncryption,
  publicEncryption,
  decryptBody,
} from "./body.js";
const initOptions = {
  // baseURL:import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  method: "POST",
};
let request;
/**
 *
 * @param {type} 1获取session3rd 0获取token   其他情况不用传type
 * @params {needEncryption} 是否需要加密
 * @params {needNotify}   是否需要提示消息
 * @returns primose {retcode:0,...data}
 */
function fetch({
  url,
  data = {},
  type,
  loading = false,
  homeType,
  needEncryption = true,
  needNotify = true,
}) {
  if (loading) {

    uni.showLoading({
      title: "加载中",
      mask: true,
    });

  }

  request = axios.create(initOptions);
  // 添加请求拦截器
  request.interceptors.request.use(
    function (config) {
      const requestHeader = {};
      const session = getStorage("userSession") || "";
      const _token = getStorage("userToken") || "";

      if (typeof type == "undefined") {
        requestHeader["Session-3rd"] = session.session3rd;
        requestHeader["Authorize-Token"] = _token.token;
      }
      if (type == 0) {
        // 获取token需要携带session
        requestHeader["Session-3rd"] = session.session3rd;
      }
      config.responseType = "jsonp";
      config.headers["Content-Type"] = "application/jsonp";
      config.headers = { ...config.headers, ...requestHeader };
      console.log('请求数据', config.data);
      //需要data加密
      if (needEncryption) {
        config.data = encryptionBody(config.data, type);
      } else {
        config.data = { data: { ...config.data } };
      }
      return config;
    },
    function (error) {
      console.log("请求拦截错误");
      return Promise.reject(error);
    }
  );
  // 添加响应拦截器
  request.interceptors.response.use(
    function (response) {
      hideLoading();
      return JSON.parse(response.data);
    },
    function (error) {
      console.log("返回拦截错误");
      return Promise.reject(error);
    }
  );

  return request({ url, data })
    .then((res) => {
      if (res.retcode == 0) {
        const d = res.data ? alldecryptBody(res.data, type) : res;
        return { retcode: res.retcode, ...d };
      }
      //retcode 不为0 提示消息
      return err_retcode(res, homeType, needNotify);
    })
    .catch((err) => {
      uni.showToast({
        title: "请求异常",
        icon: "error",
        mask: true,
      });
      return Promise.reject(err);
    });

}
const errMessage = {
  "-1": "系统繁忙",
};

function err_retcode(data, homeType, needNotify) {
  if (data.retcode == -5) {
    //token过期重新去首页获取token
    uni.removeStorageSync("userToken");
    uni.removeStorageSync("userSession");
    let storeId = '';
    if (homeType != 0) {
      storeId = getStorage('registerIds');
    }
    store.openLink(store.openUrl, homeType, storeId);
  } else if (data.retcode == -301) {
    //code无效不作处理
    return data;
  } else if (data.retcode == -14 && needNotify) {
    uni.showToast({
      title: data.memo,
      icon: "error",
      mask: true,
    });
    return data;
  } else {
    //如果不需要提示外面自行处理提示信息
    if (needNotify) {
      const message = errMessage[data.retcode] || "请求异常";
      uni.showToast({
        title: message,
        icon: "error",
        mask: true,
      });
    }
    return data;
  }
}

function hideLoading() {
  uni.hideLoading();
}

function encryptionBody(params, type) {
  if (type === 0) {
    return tokenEncryption(params);
  } else if (type === 1) {
    return wechatWebEncryption(params);
  } else {
    return publicEncryption(params);
  }
}
function alldecryptBody(data, type) {
  if (type === 0) {
    return JSON.parse(decryptBody(data, type));
  } else if (type === 1) {
    return JSON.parse(decryptBody(data, type));
  } else if (type === 2) {
    return JSON.parse(decryptBody(data, type));
  } else if (type === 3) {
    return JSON.parse(data);
  } else {
    return JSON.parse(decryptBody(data, 3));
  }
}

export default fetch;
