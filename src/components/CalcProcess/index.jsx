import React, { Component } from 'react'
import { interpret } from '@/assets/utils/interpreter.mjs'
import './style.scss';
import ResultTag from '../ResultTag';
export default class CalcProcess extends Component {
  // constructor(props){
  //   super(props);
  // }
  replaceTag = (input,results) => {
    let inputs = input.split(/(\$\d+)/);
    return inputs.map((v)=>{
      return v.startsWith('$')?(<ResultTag tag={v.substring(1)} result={results[v.substring(1)-0]} />):v;
    });
  }
  onCalc = (inputs) => {
    try {
      if (!inputs) return '';
      let { states, results } = interpret(inputs);
      return states.map((v, i) => {
        return (<li className='calcItem' key={i} >
          {this.replaceTag(v.replace(/^\(/, '').replace(/\)$/, ''),results) }
          {' = '+ results[i]}
          {i + 1 < states.length ? (<ResultTag result={results[i]} tag={i + 1} />) : ''}</li>);
      })
    } catch (error) {
      console.log('error', error);
      return (<li  >计算错误：{error.message}</li>);
    }
  }

  render() {
    return (
      <ul className='calcList' >

        {this.onCalc(this.props.inputCalc)}
      </ul>
    )
  }
}
