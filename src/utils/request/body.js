
import md5 from 'blueimp-md5'
import {encryptBy,decryptBy} from './DES.js'

const eventType =['generate','refresh_token','invalid']

const tokenclientId = 'a6f3b527f7a8dafe'
const tokenclientSecret ='7c4713c4cbe424f5e7f1301d74d7b4b0'
const tokenyan = 'security.authorize.token.sign.str'

const wechatClientId ='349326110ff95ad9'
const wechatClientSecret ='c781a8b3ec0f034f790f92ed17ce798a'
const wechatyan = 'security.authorize.wechat.sign.str'

const registerClientId ='a242947e0324eeb5'
const registerClientSecret ='0b0ccf2800fe04f7f7010ee23f8c1ed2'
const registeryan = 'security.authorize.register.sign.str'

const wechatWebClientId ='5c63961c0fd99af7'
const wechatWebClientSecret ='af034f63961c0fd99af7f790f92ed17c'
const wechatWebyan = 'security.authorize.wechat.sign.str'

const publicYarn = '43e87423091aa85818ef9c42d8c9e4ca'


//票据加密body
export const tokenEncryption = (option)=>{
    let json = {}
    json.clientId = tokenclientId;
    function encrydata(option){
        let data ={}
        data['clientSecret']=tokenclientSecret
        data['eventType'] =eventType[option.type]
        let newData =mergejson(data,option)
        return encryptBy(JSON.stringify(newData),0)
    }
    json.data = encrydata(option)
    json.sign = md5(`${tokenclientId}|${json.data}|${tokenyan}`)
    return json;
}

//授权加密后body
export const wechatWebEncryption = (option)=>{
  let json = {}
  json.clientId = wechatWebClientId;
  function encrydata(option){
      let data ={}
      data['clientSecret']=wechatWebClientSecret
      let newData =mergejson(data,option)
      return encryptBy(JSON.stringify(newData),1)
  }
  json.data = encrydata(option)
  json.sign = md5(`${wechatWebClientId}|${json.data}|${wechatWebyan}`)
  return json;
}

//注册加密后body
export const registerEncryption = (option)=>{
  let json = {}
  json.clientId = registerClientId;
  function encrydata(option){
      let data ={}
      data['clientSecret']=registerClientSecret
      let newData =mergejson(data,option)
      return encryptBy(JSON.stringify(newData),2)
  }
  json.data = encrydata(option)
  json.sign = md5(`${registerClientId}|${json.data}|${registeryan}`)
  return json;
}

export const publicEncryption = (option)=>{
  let json = {}
  json.data =  encryptBy(JSON.stringify(option),3);
  json.sign = md5(`${json.data}|${publicYarn}`)
  return json
}
/**
 * 
 * @param {*} message 解密内容
 * @param {*} index 0：授权 1：微信授权 2：注册
 */
export const decryptBody = (message,index) =>{
    return decryptBy(message,index)
}
function  mergejson(jsonbject1, jsonbject2) {
    const resultJsonObject = {};
    for (const attr in jsonbject1) {
      resultJsonObject[attr] = jsonbject1[attr];
    }
    for (const attr in jsonbject2) {
      resultJsonObject[attr] = jsonbject2[attr];
    }
    return resultJsonObject;
  };