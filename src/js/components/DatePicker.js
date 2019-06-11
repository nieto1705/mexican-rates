import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
    this.handleChange = event => this.props.onChange(event.target.value);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      return { value: props.value };
    }
    return {};
  }
  componentDidMount() {
    this.inputRef.setAttribute('max', this.props.max);
  }
  render() {
    return (
      <input
        type="date"
        ref={ref => (this.inputRef = ref)}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

DatePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  max: PropTypes.string
};
