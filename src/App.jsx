import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import Controls from './components/Controls';

import ParameterSelectBool from './components/ParameterSelectBool';
import ParameterSelectFloat from './components/ParameterSelectFloat';
import ParameterSelectInt from './components/ParameterSelectInt';

const App = () => {
  const [parameters, setParameters] = useState({});
  const [avatarConfig, setAvatarConfig] = useState(null);

  const socket = useRef(null);

  //Call listeners
  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8080");
    socket.current.onopen = () => console.log("ws opened");
    socket.current.onclose = () => console.log("ws closed");

    const wsCurrent = socket.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  const handleChange = (address, value, fromVRChat) => {
    setParameters(parameters => ({
      ...parameters,
      [address]: value
    }));

    if (!fromVRChat) {
      socket.current.send(JSON.stringify({ address: address, value: value }))
    };
  };

  useEffect(() => {
    if (!socket.current) return;

    socket.current.onmessage = e => {
      const parsed = JSON.parse(e.data);
      if (parsed.address === '/avatar/config') {
        setAvatarConfig(parsed.value);
      }
      else {
        handleChange(parsed.address, parsed.value, true);
      }
    };
  }, []);

  return (
    <Container className="mt-3" fluid>
      <Card className="mb-3 shadow text-white" bg="dark">
        <Card.Body>
          <h5>
            FoxCat OSC Menu
          </h5>
        </Card.Body>
      </Card>
      <Card className="mb-3 shadow" bg="light">
        <Card.Body>
          <Tabs>
            <Tab eventKey="param" title="Parameters">
              <Form>
                {!avatarConfig ? <>
                  <Form.Label>Collar</Form.Label>
                  <br />
                  <ParameterSelectBool checked={!!parameters['/avatar/parameters/BellChoker']} onChange={(newValue) => handleChange('/avatar/parameters/BellChoker', newValue, false)} value={parameters['/avatar/parameters/BellChoker']} />
                  <br />
                  <Form.Label>Top</Form.Label>
                  <ParameterSelectInt max={10} onChange={(newValue) => handleChange('/avatar/parameters/top', newValue, false)} value={parameters['/avatar/parameters/top']} />
                  <Form.Label>Bottom</Form.Label>
                  <ParameterSelectInt max={10} onChange={(newValue) => handleChange('/avatar/parameters/bottom', newValue, false)} value={parameters['/avatar/parameters/bottom']} />
                  <Form.Label>Pen Color</Form.Label>
                  <ParameterSelectFloat max={1.0} onChange={(newValue) => handleChange('/avatar/parameters/M_Color', newValue, false)} value={parameters['/avatar/parameters/M_Color']} />
                </> : <>
                  NAME: {avatarConfig.name}
                  ID: {avatarConfig.id}
                  <Row>
                    {avatarConfig.parameters.map((parameter, index) => {
                      if (!parameter.input) {
                        return null;
                      }
                      switch (parameter.output.type) {
                        case 'Bool':
                          return (
                            <Col className="d-flex" key={index} md={3} sm={6} xs={12}>
                              <div>
                                <ParameterSelectBool checked={!!parameters[`/avatar/parameters/${parameter.name}`]} onChange={(newValue) => handleChange(`/avatar/parameters/${parameter.name}`, newValue, false)} />
                              </div>
                              <div style={{ paddingLeft: ".5rem" }}>
                                Bool: {parameter.name}
                              </div>
                            </Col>
                          )
                        case 'Int':
                          return (
                            <Col key={index} md={3} sm={6} xs={12}>
                              <Form.Label>Integer: {parameter.name}</Form.Label>
                              <ParameterSelectInt onChange={(newValue) => handleChange(`/avatar/parameters/${parameter.name}`, newValue, false)} value={parameters[`/avatar/parameters/${parameter.name}`]} />
                            </Col>
                          )
                        case 'Float':
                          return (
                            <Col key={index} md={3} sm={6} xs={12}>
                              <Form.Label>Float: {parameter.name}</Form.Label>
                              <ParameterSelectFloat onChange={(newValue) => handleChange(`/avatar/parameters/${parameter.name}`, newValue, false)} value={parameters[`/avatar/parameters/${parameter.name}`]} />
                            </Col>
                          )
                        default:
                          return (<>
                            <Form.Label>N/A</Form.Label>
                            the frick is this parameter supposed to be ??? (${parameter.name})
                          </>
                          )
                      }
                    })};
                  </Row>
                </>
                }
              </Form>
            </Tab>
            <Tab eventKey="control" title="Controls">
              <Controls {...{ handleChange, parameters }} />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
      <Card className="mb-3 shadow">
        <Card.Body>
          <pre>{JSON.stringify(parameters, 0, 2)}</pre>
        </Card.Body>
      </Card>
    </Container >
  );
}

export default App;
