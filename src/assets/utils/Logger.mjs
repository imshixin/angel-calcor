/*
 * @Author: imsixn
 * @Date: 2021-12-21 20:28:43
 * @LastEditors: imsixn
 * @LastEditTime: 2021-12-21 20:31:47
 * @Description: file content
 */
export {
  log
}

function log(){
  if(process.env.NODE_ENV==='development'){
    console.log(...arguments);
  }
}