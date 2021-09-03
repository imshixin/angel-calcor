import React, { Component } from 'react'
import CalcProcess from '../CalcProcess'
import './style.scss'
export default class AdvancedCalcor extends Component {
  constructor(props){
    super(props);
    this.state = {
      value:'',
    }
  }
  onRunning=()=>{
    this.setState({
      value:this.textarea.value,
    })
  }
  render() {
    return (
      <div className='advancedCon' >
        <textarea className='inputTa' ref={(node)=>this.textarea=node} ></textarea>
        <button onClick={this.onRunning} className='runBtn' >计算</button>
        <div className="calcProcessPanel">
          计算结果：
          <CalcProcess inputCalc={this.state.value} ></CalcProcess>
        </div>
      </div>
    )
  }
}
