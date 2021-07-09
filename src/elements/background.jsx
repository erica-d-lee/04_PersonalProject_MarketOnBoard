import React from 'react';
import styled from 'styled-components';
import deck from '../deck.jpg';
import door from '../door.jpg';

const BackGround = (props) => {
  const { children, deck } = props;

  const styles = {
    deck: deck,
  };

  return (
    <React.Fragment>
      <BGContainer {...styles}></BGContainer>
      {children}
    </React.Fragment>
  );
};

BackGround.defaultProps = {
  chidren: null,
  deck: false,
};

const BGContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  top: 0;
  left: 0;
  background-image: ${(props) =>
    props.deck ? `url('${deck}')` : `url('${door}')`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.5;
  z-index: -1;
`;

export default BackGround;
