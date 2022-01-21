/*
 * @Author: your name
 * @Date: 2021-08-30 16:31:53
 * @LastEditTime: 2022-01-20 22:35:48
 * @LastEditors: imsixn
 * @Description: In User Settings Edit
 * @FilePath: \angel-color\src\components\AngelShower\index.js
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { printAngel } from '@/assets/utils/interpreter'
import './style.scss';

class AngelShower extends Component {
  angel='';
  static defaultProps={
    angel:'',
    isInt:false,
    input:false,
  }
  currentAngel = ()=>{
    try {
      let angel = this.props.isInt?Math.round(this.props.angel):printAngel(this.props.angel);
      this.angel=angel;
    } catch (error) {
      console.log(error,this.angel);
    }
    return this.angel;
  }

  render() {
    return (
      <div className={`angShower ${this.props.input?'input':'show'}  ${this.props.error?'error':''}`}  >
        {this.props.isInt && <div className='help'>?</div>}{this.currentAngel()}

      </div>
    )
  }
}
AngelShower.propTypes = {
  angel:propTypes.string.isRequired,
  isInt:propTypes.bool,
  input:propTypes.bool.isRequired,
}

export default AngelShower