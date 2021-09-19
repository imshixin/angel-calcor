/*
 * @Author: imsixn
 * @Date: 2021-08-30 16:26:23
 * @LastEditTime: 2021-09-13 22:25:27
 * @LastEditors: imsixn
 * @Description: In User Settings Edit
 * @FilePath: \angel-color\src\components\SimpleCalcor\index.js
 */
import React, { Component } from 'react'
import './style.scss'
import AngelShower from '../AngelShower'
import { numAdd, numMinus, numMultiply, numDivide } from '@/assets/utils/interpreter.mjs'
import { check } from '../../assets/utils/interpreter.mjs'
const methodEnum = {
  add: 'add',
  minus: 'minus',
  multiply: 'multiply',
  divide: 'divide',
}
const methods = {
  add: numAdd,
  minus: numMinus,
  multiply: numMultiply,
  divide: numDivide,
}

function RadioInput(props) {
  return (
    <span>
      <input onClick={props.clickcall} className='radioInput' type="radio" name="method" value={props.type} id={props.type} defaultChecked={props.defaultChecked} />
      <label htmlFor={props.type} className={`iconfont ${props.fontClass}`} style={{ color: props.fontColor }}></label>
    </span>
  )
}

export default class SimpleCalcor extends Component {
  constructor(props) {
    super(props);
    this.radioChange = this.radioChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.state = {
      value1: '0',
      value2: '0',
      value1Error: false,
      value2Error: false,
      calcType: methodEnum['add'],
      result: '0.0000',
    }
  }
  radioChange(e) {
    console.error(e.target.value);
    const { value1, value2 } = this.state;
    let result = '';
    try {
      result = methods[e.target.value](value1, value2);
    } catch (error) {
      console.error(error);
    }
    this.setState({
      calcType: methodEnum[e.target.value],
      result
    })

  }
  inputChange(e) {
    const { value1, value2, calcType } = this.state;
    let operator = '';
    let result = '';
    try {
      switch (e.target) {
        case this.input1:
          operator = 'value1';
          result = methods[methodEnum[calcType]](e.target.value, value2)
          break;
        case this.input2:
          operator = 'value2';
          result = methods[methodEnum[calcType]](value1, e.target.value)
          break;
        default:
          break;
      }
      check(e.target.value);
    } catch (ex) {
      if(ex.name!=='TypeError'){
        this.setState({[operator+'Error']:true})
        return;
      }
    }
    this.setState({
      [operator]: e.target.value,
      [operator+'Error']:false,
      result
    })
  }
  render() {
    return (
      <div className='simpleCalcCon'>
        <p>简易角度计算器</p>
        <div className='angInputCon'>
          <input placeholder='0.0000' type="text" onChange={this.inputChange} ref={(node) => this.input1 = node} className='angInput' />
          <AngelShower angel={this.state.value1} error={this.state.value1Error} />
        </div>
        <div className="radioBox">
          <RadioInput type='add' clickcall={this.radioChange} fontColor='red' fontClass='icon-jia' defaultChecked />
          <RadioInput type='minus' clickcall={this.radioChange} fontColor='blue' fontClass='icon--hao' />
          <RadioInput type='multiply' clickcall={this.radioChange} fontColor='green' fontClass='icon-chenghao' />
          <RadioInput type='divide' clickcall={this.radioChange} fontColor='yellow' fontClass='icon-chuhao' />
        </div>
        <div className='angInputCon' >
          <input placeholder='0.0000' type="text" onChange={this.inputChange} ref={(node) => this.input2 = node} className='angInput' />
          <AngelShower angel={this.state.value2} error={this.state.value2Error} />
        </div>
        <div className="resultPanel angInputCon">
        =
          <AngelShower angel={this.state.result} />
        </div>
      </div>
    )
  }
}

