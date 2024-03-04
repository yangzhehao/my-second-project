import CryptoJS from "crypto-js";

let key = [
  "1301d74d7b4b0f54",
  "5707c115702786b1",
  "9e9d02a9347a8c03",
  "32c8dfd8619f112a3143b6c9f5f8c0c3",
];

export const encryptBy = (message, index) => {
  function encryptByDES(message, key) {
    let keyHex = CryptoJS.enc.Utf8.parse(key[index]);
    let option = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 };
    let encrypted = CryptoJS.DES.encrypt(message, keyHex, option);
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  }
  return encryptByDES(message, key);
};
//DES解密
export const decryptBy = (message, index) => {
  //DES  ECB模式解密
  function decryptByDES(message, key) {
    let keyHex = CryptoJS.enc.Utf8.parse(key[index]);
    let decrypted = CryptoJS.DES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(message),
      },
      keyHex,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    let result_value = decrypted.toString(CryptoJS.enc.Utf8);
    return result_value;
  }
  return decryptByDES(message, key);
};
