import React from 'react';
import PropTypes from 'prop-types';

const DatePicker = ({ value, onChange }) => {
  const handleChange = event => onChange(event.target.onChange);
  return <input value={value} type="date" onChange={handleChange} />;
};

DatePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default DatePicker;
