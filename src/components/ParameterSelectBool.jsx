import propTypes from 'prop-types';
import React from 'react';
import Switch from 'react-switch';

const ParameterSelectBool = ({ checked, onChange }) => {
    return (
        <Switch {...{ checked, onChange }} />
    );
};

ParameterSelectBool.defaultProps = {
    checked: false
};

ParameterSelectBool.propTypes = {
    checked: propTypes.bool,
    onChange: propTypes.func
}

export default ParameterSelectBool;
