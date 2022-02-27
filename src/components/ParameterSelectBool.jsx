import propTypes from 'prop-types';
import {useState} from 'react';
import Switch from 'react-switch';

const ParameterSelectBool = ({ checked, onChange }) => {
    return (
        <Switch checked={checked} onChange={onChange} />
    );
};

ParameterSelectBool.defaultProps = {
    checked: false
};

ParameterSelectBool.propTypes = {
    checked: propTypes.number,
    onChange: propTypes.func
    
}

export default ParameterSelectBool;