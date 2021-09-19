import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default class ResultTag extends Component {

  render() {
    return (
      <span title={this.props.result} className='tagCon' >
        ${this.props.tag}
      </span>
    )
  }
}
ResultTag.propTypes = {
  tag:PropTypes.string.isRequired,
  result:PropTypes.string.isRequired,
}