import React, { Component } from 'react'
import { interpret } from '@/assets/utils/interpreter.mjs'
import './style.scss';
import ResultTag from '../ResultTag';
import AngelShower from '../AngelShower'
export default class CalcProcess extends Component {
  // constructor(props){
  //   super(props);
  // }
  opacity=1
  replaceSingleTag = (input, results) => { /* 将前面计算的结果替换 */
    return (<ResultTag tag={input.substring(1)} result={results[input.substring(1) - 0]} />)
  }
  replaceAllTag=(input,results)=>{
    let nums = input.split(/(\$\d+)/);
    return nums.map((v) => {
      return v.startsWith('$') ? (<ResultTag showAngel={this.props.showAngel} tag={v.substring(1)} result={results[v.substring(1) - 0]} />) : v;
    });
  }
  replaceCalc = (input, results) => {
    if(!this.props.showAngel){
      return this.replaceAllTag(input,results);
    }
    let inputs = input.split(/[+\-*/]/g).filter((v) => v !== '');
    let symbols = input.split(/\$?\d*\.?\d+/).filter((v) => v !== '');
    let inputs_tags = inputs.map((v,i)=>{
      return v.startsWith("$")?v:(<AngelShower angel={v} isInt={i!==0&&(symbols[i-1]==='*'||symbols[i-1]==='/')}  />)
    })
    let output=[]
    inputs.forEach((v,i)=>{
      if(inputs[i].startsWith("$")){
        output.push(this.replaceSingleTag(inputs_tags[i], results))
      }else{
        output.push(inputs_tags[i])
      }
      if(i!==inputs.length-1) output.push(symbols[i])
    })
    // console.log(symbols);
    // console.log(inputs);
    return output;
  }
  onCalc = (inputs) => {
    try {
      if (!inputs) return '';
      let { states, results } = interpret(inputs);
      return states.map((v, i) => {
        return (<li className='calcItem' key={i} >
          {this.replaceCalc(v.replace(/^\(/, '').replace(/\)$/, '')/* 剔除开头结尾的括号 */, results)}{/*前算式*/}
          {' = '}{/* 等于号 */}
          {this.props.showAngel?<AngelShower angel={results[i]} isInt={false} input={false} />:results[i]} {/* 结果 */}
          {i + 1 < states.length ? <ResultTag showAngel={this.props.showAngel} result={results[i]} tag={i + 1} /> : ''}{/* 结果标签 */}
          </li>);
      })
    } catch (error) {
      console.log('error', error);
      return (<li  >计算错误:{error.message}</li>);
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
