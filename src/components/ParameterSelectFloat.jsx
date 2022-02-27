import propTypes from 'prop-types';
import {useState} from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

const ParameterSelectFloat = ({defaultFloat, min, max, onChange, step, value}) => {
    const handleChange = (e) => {
        const float = parseFloat(e.target.value);

        onChange(float);
    }

    return (<>
        <RangeSlider
            step={step}
            max={max}
            min={min}
            onChange={handleChange}
            value={value}
        />
    </>
    )
};

ParameterSelectFloat.defaultProps = {
    defaultFloat: 0,
    min: -1,
    max: 1,
    step: .01,
    value: 0
}

ParameterSelectFloat.propTypes = {
    defaultFloat: propTypes.number,
    min: propTypes.number,
    max: propTypes.number,
    onChange: propTypes.func.isRequired,
    step: propTypes.number,
    value: propTypes.number
}

export default ParameterSelectFloat;