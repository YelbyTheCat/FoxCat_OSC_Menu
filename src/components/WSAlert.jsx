import React from 'react'
import PropTypes from 'prop-types'
import {Alert} from 'react-bootstrap';
import {ExclamationTriangleFill} from 'react-bootstrap-icons';

const WSAlert = ({connectionStatus}) => {
  switch (connectionStatus) {
    case 'Connecting':
      return (
        <Alert variant="info">
          Websocket Connecting . . .
        </Alert>
      )
    case 'Open':
      return (
        <Alert variant="success">
          Websocket Connected!
        </Alert>
      )
    case 'Closing':
      return (
        <Alert variant="warning">
          Websocket Closing . . .
        </Alert>
      )
    case 'Closed':
      return (
        <Alert variant="danger">
          <ExclamationTriangleFill className="me-2" size={21} />Websocket Closed!
        </Alert>
      )
    case 'Uninstantiated':
      return (
        <Alert variant="secondary">
          Websocket Uninstantiated . . .
        </Alert>
      )
    default:
      return null;
  }
};

WSAlert.propTypes = {
  connectionStatus: PropTypes.oneOf(['Connecting', 'Open', 'Closing', 'Closed', 'Uninstantiated']).isRequired
}

export default WSAlert
