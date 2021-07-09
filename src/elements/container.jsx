import React from 'react';
import styled from 'styled-components';

const Container = (props) => {
  const { children } = props;

  return (
    <React.Fragment>
      <ContainerBox>{children}</ContainerBox>
    </React.Fragment>
  );
};

Container.defaultProps = {
  children: null,
};

const ContainerBox = styled.div`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 100%;
  max-height: 60vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  position: relative;
`;

export default Container;
