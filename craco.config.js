/*
 * @Author: your name
 * @Date: 2021-08-30 16:40:32
 * @LastEditTime: 2021-08-30 16:41:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \angel-color\craco.config.js
 */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpack:{
    alias:{
      '@':path.resolve('src'),

    }
  }
}
