import React, { memo, useSelector } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Image, User, Text, Heart } from '.';
import { actionCreators as goodActions } from '../redux/modules/good';
import { firestore } from '../shared/firebase';

const Good = memo((props) => {
  const {
    username,
    goodimg,
    datetime,
    content,
    likecnt,
    _onClick,
    children,
    id,
    is_like,
  } = props;
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Container onClick={_onClick}>
        <Post>
          <ImgBox>
            <Image shape='rectangle' src={goodimg} />
          </ImgBox>
          <Write>
            <User username={username} />
            <Text fontSize='0.8rem' color='#8f2d06a9' fontWeight='600'>
              {datetime}
            </Text>
            <Content>
              <span
                style={{
                  fontWeight: '600',
                  color: '#4aa2c5e0',
                }}
              >
                {content}
              </span>
            </Content>
          </Write>
        </Post>
        <HeartBox>
          <Heart
            _onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(goodActions.toggleLikeFB(id));
            }}
            is_like={is_like}
          />
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: '800',
              color: '#8f2d06a9',
            }}
          >
            {is_like ? likecnt + 1 : likecnt}명이 이 상품을 찜했습니다!
          </span>
          {children}
        </HeartBox>
      </Container>
    </React.Fragment>
  );
});

Good.defaultProps = {
  goodimg: null,
  userimg: null,
  username: null,
  datetime: null,
  content: null,
  likecnt: 0,
  mine: false,
  children: null,
  is_like: false,
};

const Container = styled.div`
  height: 270px;
  display: flex;
  flex-direction: column;
  border-top: 5px solid #ddd;
  padding: 5px 10px 5px 10px;
`;

const ImgBox = styled.div`
  width: 200px;
  position: relative;
  overflow: hidden;
`;

const Post = styled.div`
  display: flex;
  flex-direction: left;
  height: 25vh;
  padding-top: 20px;
`;

const Write = styled.div`
  max-width: 175px;
  max-height: 25vh;
  padding-left: 10px;
`;

const Content = styled.div`
  max-width: 97%;
  max-height: 11vh;
  word-break: break-all;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #8cadb9df;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
`;

const HeartBox = styled.div`
  height: 3vh;
  display: flex;
  flex-direction: left;
  align-items: center;
  padding-left: 5px;
  padding-bottom: 10px;
`;

export default memo(Good);
