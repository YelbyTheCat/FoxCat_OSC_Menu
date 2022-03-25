import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Col, Form, Row} from 'react-bootstrap';
import ParameterSelectBool from './ParameterSelectBool';

const Parameters = ({handleChange, parameters}) => {

  useEffect(() => {
    console.log(parameters);
  }, [parameters]);

  return (
    <Form>
      Hi! Since there is no Avatar config loaded, we are gonna try our best to watch out for what VRChat tells us!
      <br />
      (this is gonna be . . . scary)
      <Row>
        {Object.keys(parameters).map((parameter, index) => {
          if (typeof (parameters[parameter]) === typeof (true)) {
            return (
              <Col className="border p-2 rounded" key={index} md={3} sm={6} xs={12}>
                <Form.Label>{parameter}</Form.Label>
                <div className="d-flex justify-content-center">
                  <ParameterSelectBool checked={!!parameters[parameter]} onChange={(newValue) => handleChange(parameter, newValue, false)} />
                </div>
              </Col>
            )
          }
          else {
            return (
              <Col className="border p-2 rounded" key={index} md={3} sm={6} xs={12}>
                <Form.Label>{parameter}</Form.Label>
                <div>
                  Not sure if Int or Float . . .
                </div>
              </Col>
            )
          }
        })}
      </Row>

    </Form>
  )
}

Parameters.propTypes = {
  // Could be better
  parameters: PropTypes.object,
  handleChange: PropTypes.func.isRequired
}

export default Parameters
