import React from 'react';
import img from '../logo.ico';
import styled from 'styled-components';

const Logo = (props) => {
  return <Img src={img} />;
};

const Img = styled.img`
  width: 55px;
  height: 55px;
  border: 1px dashed #41b4e2e1;
  border-radius: 30px;
`;

export default Logo;
