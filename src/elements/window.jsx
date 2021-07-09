import React from 'react';
import styled from 'styled-components';

const Window = (props) => {
  return (
    <React.Fragment>
      <WindowBox>{props.children}</WindowBox>
    </React.Fragment>
  );
};

const WindowBox = styled.div`
  width: 20vw;
  min-width: 400px;
  height: 70vh;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -35vh;
  margin-left: -200px;
  border-radius: 20px;
  box-shadow: 0px 10px 50px #b8b8b8;
`;

export default Window;
