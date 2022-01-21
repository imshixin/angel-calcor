import React, { Component } from 'react'
import CalcProcess from '../CalcProcess'
import './style.scss'
export default class AdvancedCalcor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      showAngel: true,
    }
  }
  onRunning = () => {
    this.setState({
      value: this.textarea.value,
    })
  }
  onShowAngelChange=(e)=>{
    console.log(e.target.checked);
    this.setState({
      showAngel:!this.state.showAngel
    })
  }
  render() {
    return (
      <div className='advancedCon' >
        <p>高级角度计算器<a target={'_blank'} rel='noreferrer' href='https://blog.xinit.xyz/articles/2021/09/04/1630740655093.html#toc_h2_3' className='help'> ? </a></p>
        <textarea className='inputTa' ref={(node) => this.textarea = node} ></textarea>
        <div className='btnCon' >
          <button onClick={this.onRunning} className='runBtn' >计算</button>
          <button onClick={() => { this.textarea.value = '' }} className='clsBtn' >清空</button>
        </div>
        <div className="calcProcessPanel" >
          <div className='processTitle'>
            <span>计算结果：</span>
            <span className='showPanel'>
              <label htmlFor='showAngel' >
                <span className='iconfont icon-qiehuan'></span>
                {this.state.showAngel ? '角度' : '小数'}
              </label>
              <input id='showAngel' type={'checkbox'} checked={this.state.showAngel} onChange={this.onShowAngelChange}>
              </input>
            </span>
          </div>
          <CalcProcess inputCalc={this.state.value} showAngel={this.state.showAngel} ></CalcProcess>
        </div>
      </div>
    )
  }
}
