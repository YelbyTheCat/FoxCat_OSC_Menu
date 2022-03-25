import React from 'react'
import PropTypes from 'prop-types'
import {Col, Form, Row} from 'react-bootstrap';

import ParameterSelectBool from './ParameterSelectBool';
import ParameterSelectFloat from './ParameterSelectFloat';
import ParameterSelectInt from './ParameterSelectInt';

const ParametersWithConfig = ({avatarConfig, parameters, handleChange}) => {
  return (
    <>
      <div className="mt-3">
        NAME: {avatarConfig.name}
        <br />
        ID: {avatarConfig.id}
      </div>

      <Form className="mt-3">
        <Row>
          {avatarConfig.parameters.map((parameter, index) => {
            if (!parameter.input) {
              return null;
            }
            switch (parameter.output.type) {
              case 'Bool':
                return (
                  <Col className="border p-2 rounded" key={index} md={3} sm={6} xs={12}>
                    <Form.Label className="d-flex justify-content-center">Boolean: {parameter.name}</Form.Label>
                    <div className="d-flex justify-content-center">
                      <ParameterSelectBool checked={!!parameters[`/avatar/parameters/${parameter.name}`]} onChange={(newValue) => handleChange(`/avatar/parameters/${parameter.name}`, newValue, false)} />
                    </div>
                  </Col>
                )
              case 'Int':
                return (
                  <Col className="border p-2 rounded" key={index} md={3} sm={6} xs={12}>
                    <Form.Label className="d-flex justify-content-center">Integer: {parameter.name}</Form.Label>
                    <ParameterSelectInt className="d-flex justify-content-center" onChange={(newValue) => handleChange(`/avatar/parameters/${parameter.name}`, newValue, false)} value={parameters[`/avatar/parameters/${parameter.name}`]} />
                  </Col>
                )
              case 'Float':
                return (
                  <Col className="border p-2 rounded" key={index} md={3} sm={6} xs={12}>
                    <Form.Label className="d-flex justify-content-center">Float: {parameter.name}</Form.Label>
                    <ParameterSelectFloat className="d-flex justify-content-center" onChange={(newValue) => handleChange(`/avatar/parameters/${parameter.name}`, newValue, false)} value={parameters[`/avatar/parameters/${parameter.name}`]} />
                  </Col>
                )
              default:
                return (<>
                  <Form.Label>N/A</Form.Label>
                  the frick is this parameter supposed to be ??? (${parameter.name})
                </>
                )
            }
          })}
        </Row>
      </Form>
    </>
  )
}

ParametersWithConfig.propTypes = {
  // Could be better
  avatarConfig: PropTypes.object,
  // Could be better
  parameters: PropTypes.object,
  handleChange: PropTypes.func.isRequired
}

export default ParametersWithConfig
