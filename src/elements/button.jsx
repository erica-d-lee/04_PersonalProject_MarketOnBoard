import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { text, full, _onClick } = props;
  const styles = {
    full: full,
  };

  return (
    <React.Fragment>
      <Btn {...styles} onClick={_onClick}>
        {text}
      </Btn>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: null,
  big: false,
  is_noti: false,
};

const Btn = styled.button`
  font-size: 0.8rem;
  color: #f6fcff;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #41b4e2e1;
  border: 3px double white;
  &:hover {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  padding: 0px;
`;

export default Button;
