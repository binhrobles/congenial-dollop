import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'antd';
import FoyerBuddies from '../Components/foyerBuddies';

function Foyer(props) {
  const { roomID, playerToken } = props;
  return (
    <>
      <Row align="top" justify="center" style={{ padding: 30 }}>
        <FoyerBuddies roomID={roomID} />
      </Row>
      <Row align="bottom" justify="center" style={{ padding: 10 }}>
        <Button type="primary">Play</Button>
      </Row>
    </>
  );
}

Foyer.propTypes = {
  roomID: PropTypes.string.isRequired,
  playerToken: PropTypes.string.isRequired,
};

export default Foyer;
