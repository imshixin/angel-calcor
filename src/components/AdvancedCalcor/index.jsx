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
        <p>高级角度计算器</p>
        <textarea className='inputTa' ref={(node)=>this.textarea=node} ></textarea>
        <div className='btnCon' >
        <button onClick={this.onRunning} className='runBtn' >计算</button>
        <button onClick={()=>{this.textarea.value=''}} className='clsBtn' >清空</button>
        </div>
        <div className="calcProcessPanel" >
          计算结果：
          <CalcProcess inputCalc={this.state.value} ></CalcProcess>
        </div>
      </div>
    )
  }
}
