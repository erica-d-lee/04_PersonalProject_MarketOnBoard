import React from 'react';
import { Image } from '.';
import heart from '../heart.ico';
import unheart from '../unheart.ico';
import styled from 'styled-components';

const Heart = (props) => {
  const icon_url = props.is_like ? heart : unheart;

  return (
    <React.Fragment>
      <Button onClick={props._onClick}>
        <Image shape='circle' size='25' src={icon_url} />
      </Button>
    </React.Fragment>
  );
};

const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 18px;
  background-color: transparent;
  height: 35px;
  width: 35px;
  padding: 0;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    outline: none;
  }
`;

export default Heart;
