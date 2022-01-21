import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { printAngel } from "@/assets/utils/interpreter";
import './style.scss';

export default class ResultTag extends Component {
  static defaultProps={
    tag:'',
    result:'',
    showAngel:false,
  }
  render() {
    return (
      <span title={this.props.showAngel?printAngel(this.props.result):this.props.result} className='tagCon' >
        ${this.props.tag}
      </span>
    )
  }
}
ResultTag.propTypes = {
  tag:PropTypes.number.isRequired,
  result:PropTypes.string.isRequired,
  showAngel:PropTypes.bool,
}