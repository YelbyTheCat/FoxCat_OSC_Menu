import React from 'react';
import propTypes from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';

import { INPUTS_AXES, INPUTS_BUTTONS, INPUT_ROOT } from '../constants';
import ParameterSelectBool from './ParameterSelectBool';
import ParameterSelectFloat from './ParameterSelectFloat';

const Controls = ({ handleChange, parameters }) => (
  <Form className="mt-3">
    <Row>
      {INPUTS_AXES.map((input, index) => (
        <Col key={index} md={3} sm={6} xs={12}>
          <Form.Label>
            {input}
          </Form.Label>
          <ParameterSelectFloat onChange={(newValue) => handleChange(`${INPUT_ROOT}${input}`, newValue, false)} value={parameters[`${INPUT_ROOT}${input}`]} /> <br />
        </Col>
      ))}
    </Row>

    <Row>
      {INPUTS_BUTTONS.map((input, index) => (
        <Col className="d-flex" key={index} md={3} sm={6} xs={12}>
          <div>
            <ParameterSelectBool checked={!!parameters[`${INPUT_ROOT}${input}`]} className="pr-5" onChange={(newValue) => handleChange(`${INPUT_ROOT}${input}`, newValue, false)} />
          </div>
          <div style={{ paddingLeft: ".5rem" }}>
            {input}
          </div>
        </Col>
      ))}
    </Row>
  </Form>
);

Controls.defaultProps = {
  handleChange: () => console.log("No handleChange received in Controls.jsx"),
  parameters: {}
}

Controls.propTypes = {
  handleChange: propTypes.func.isRequired,
  parameters: propTypes.object.isRequired
};

export default Controls;
