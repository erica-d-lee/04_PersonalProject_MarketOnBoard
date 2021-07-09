import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  const { fontSize, children, color, fontWeight } = props;

  const styles = {
    fontSize: fontSize,
    color: color,
    fontWeight: fontWeight,
  };

  return (
    <React.Fragment>
      <Span {...styles}>{children}</Span>
    </React.Fragment>
  );
};

Text.defaultProps = {
  fontSize: '1rem',
  children: null,
  color: '#4aa2c5e0',
  fontWeight: 'normal',
};

const Span = styled.p`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
`;

export default Text;
