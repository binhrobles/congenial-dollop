import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'antd';

function Foyer(props) {
  return (
    <Row align="bottom" justify="center" style={{ padding: 10 }}>
      <Button type="primary">Play</Button>
    </Row>
  );
}

Foyer.propTypes = {
  roomID: PropTypes.string.isRequired,
  playerToken: PropTypes.string.isRequired,
};

export default Foyer;
