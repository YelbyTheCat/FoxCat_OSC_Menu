import {Tab} from 'bootstrap';
import React, {useEffect, useState} from 'react';
import {Card, Container, Tabs} from 'react-bootstrap';
import useWebSocket, {ReadyState} from 'react-use-websocket';

import Controls from './Controls';
import Header from './Header';
import Parameters from './Parameters';
import ParametersWithConfig from './ParametersWithConfig';
import WSAlert from './WSAlert';

// The App should be in charge of setting up connection.
// The App will then render the components that makes up the rest of everything.

const App = () => {
  const [avatarConfig, setAvatarConfig] = useState(null);
  const [parameters, setParameters] = useState({});
  const [socketUrl] = useState('ws://localhost:8080');

  // useWebSocket React Hook
  const {sendJsonMessage, lastMessage, readyState} = useWebSocket(socketUrl);

  // When lastMessage is recieved . . .
  useEffect(() => {
    if (lastMessage?.data) {
      const parsed = JSON.parse(lastMessage.data);
      if (parsed.address === '/avatar/config') {
        setAvatarConfig(parsed.value);
      }
      else {
        handleChange(parsed.address, parsed.value, true);
      }
    }
  }, [lastMessage])

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const handleChange = (address, value, fromVRChat) => {
    setParameters(parameters => ({
      ...parameters,
      [address]: value
    }));

    if (!fromVRChat) {
      sendJsonMessage({address: address, value: value})
    };
  };

  return (
    <Container className="mt-3" fluid>
      <Header />
      <WSAlert {...{connectionStatus}} />
      <Card bg="light" body className="mb-3 shadow">
        <Tabs>
          <Tab eventKey="param" title="Parameters">
            {avatarConfig ? <ParametersWithConfig {...{avatarConfig, handleChange, parameters}} /> : <Parameters {...{handleChange, parameters}} />}
          </Tab>
          <Tab eventKey="control" title="Controls">
            <Controls {...{handleChange, parameters}} />
          </Tab>
        </Tabs>
      </Card>

      <Card className="mb-3 shadow" body>
        <Card body>
          <pre>{JSON.stringify(parameters, 0, 2)}</pre>
        </Card>
      </Card>
    </Container>
  );
}

export default App;
