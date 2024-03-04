// import axios from "@/utils/request/request.js";



//微信授权接口
export function authorize_wechat(params = {}) {
  return '';
  return axios({
    url: "/apis/authorize/wechat",
    ...params,
  });
}
//token接口
export function authorize_token(params = {}) {
  return axios({
    url: "/apis/authorize/token",
    ...params,
  });
}
