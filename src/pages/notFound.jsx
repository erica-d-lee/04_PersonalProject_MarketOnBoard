import React from 'react';
import { BackGround, Window, Header, Text } from '../elements';
import styled from 'styled-components';

const NotFound = (props) => {
  return (
    <BackGround>
      <Window padding='0 0 0 10px'>
        <Header />
        <Title>
          <Text fontSize='x-large' fontWeight='bold'>
            잘못된 경로입니다.
          </Text>
        </Title>
        <div style={{ textAlign: 'center' }}>
          <ToSignUp
            onClick={() => {
              props.history.goBack();
            }}
          >
            돌아가기 &gt;&gt;
          </ToSignUp>
        </div>
      </Window>
    </BackGround>
  );
};

const Title = styled.div`
  text-align: center;
  padding-top: 20px;
`;

const ToSignUp = styled.span`
  margin: 30px 0 0 3px;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.05rem;
  color: #4aa2c5b5;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default NotFound;
