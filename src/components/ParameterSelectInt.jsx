import propTypes from 'prop-types';
import React from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

const ParameterSelectInt = ({ min, max, onChange, step, value }) => {
    const handleChange = (e) => {
        const int = parseInt(e.target.value);

        onChange(int);
    }

    return (
        <RangeSlider
            step={step}
            max={max}
            min={min}
            onChange={handleChange}
            value={value}
        />
    )
};

ParameterSelectInt.defaultProps = {
    min: 0,
    max: 255,
    step: 1,
    value: 0
}

ParameterSelectInt.propTypes = {
    min: propTypes.number,
    max: propTypes.number,
    onChange: propTypes.func.isRequired,
    step: propTypes.number,
    value: propTypes.number
}

export default ParameterSelectInt;
