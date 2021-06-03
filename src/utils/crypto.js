import CryptoJS from 'crypto-js'

export const keyStr = 'shchongqilhfdsodjsojddoahdoahfoafhh'
export const ivStr = 'chongqipayjfhqqldh8'

// 加密函数
export function encrypt(str, KEY, IV) {
  const key = CryptoJS.enc.Utf8.parse(KEY)
  const iv = CryptoJS.enc.Utf8.parse(IV)
  var encrypted = CryptoJS.AES.encrypt(str, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

// 解密函数
export function decrypt(word, KEY, IV) {
  const key = CryptoJS.enc.Utf8.parse(KEY)
  const iv = CryptoJS.enc.Utf8.parse(IV)
  var decrypted = CryptoJS.AES.decrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
