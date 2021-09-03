/*
 * @Author: your name
 * @Date: 2021-08-30 16:31:53
 * @LastEditTime: 2021-09-02 22:06:29
 * @LastEditors: imsixn
 * @Description: In User Settings Edit
 * @FilePath: \angel-color\src\components\AngelShower\index.js
 */
import React, { Component } from 'react';
import { printAngel } from '@/assets/utils/interpreter'
import './style.scss';

export default class AngelShower extends Component {
  angel='';
  currentAngel = ()=>{
    try {
      let angel = printAngel(this.props.angel);
      this.angel=angel;
    } catch (error) {
      console.log(error,this.angel);
    }
    return this.angel;
  }

  render() {
    return (
      <div className={`angShower ${this.props.error?'error':''}`}  >
        {this.currentAngel()}
      </div>
    )
  }
}

