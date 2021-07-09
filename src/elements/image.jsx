import styled from 'styled-components';
import React from 'react';

const Image = (props) => {
  const { shape, src, size } = props;

  const styles = {
    src: src,
    size: size,
  };

  if (shape === 'circle') {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === 'rectangle') {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  return <React.Fragment></React.Fragment>;
};

Image.defaultProps = {
  shape: 'circle',
  src: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  size: 36,
};

const AspectOutter = styled.div`
  width: 100%;
  min-width: 100px;
  height: 100px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 5px 5px white inset;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-position: center;
  margin: 4px 8px 4px 4px;
`;

export default Image;
