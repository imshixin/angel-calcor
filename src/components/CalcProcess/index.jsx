import React, { Component } from 'react'
import { interpret } from '@/assets/utils/interpreter.mjs'
export default class CalcProcess extends Component {
  // constructor(props){
  //   super(props);
  // }
  onCalc = (inputs) => {
    try {
      if (!inputs) return '';
      let { states, results } = interpret(inputs);
      return states.map((v, i) => {
        console.log(i<states.length);
        return (<li key={i} >{v +' = '+ results[i]} {i+1<states.length?`($${i+1})`:''}</li>);
      })
    } catch (error) {
      console.log('error',error);
      return (<li>计算错误：{error.message}</li>);
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.onCalc(this.props.inputCalc)}
        </ul>
      </div>
    )
  }
}
