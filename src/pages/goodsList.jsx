import React, { memo, useEffect } from 'react';
import { BackGround, Window, Header, Container, Good } from '../elements';
import styled from 'styled-components';
import sell from '../sell.png';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as goodActions } from '../redux/modules/good';
import InfinityScroll from '../shared/infinityScroll';

const GoodsList = memo((props) => {
  const dispatch = useDispatch();
  const good_list = useSelector((state) => state.good.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.good.is_loading);
  const paging = useSelector((state) => state.good.paging);
  const { history } = props;

  useEffect(() => {
    if (good_list.length < 2) {
      dispatch(goodActions.getGoodFB());
    }
  }, []);

  return (
    <BackGround deck>
      <Window big>
        <Header />
        <Container>
          <InfinityScroll
            callNext={() => {
              dispatch(goodActions.getGoodFB(paging.next));
            }}
            is_next={paging.next ? true : false}
            loading={is_loading}
          >
            {good_list.map((g, idx) => {
              return (
                <Good
                  key={g.id}
                  {...g}
                  _onClick={() => {
                    history.push(`/good/${g.id}`);
                  }}
                />
              );
            })}
          </InfinityScroll>
        </Container>
        <Button
          onClick={() => {
            history.push('/post');
          }}
        >
          <img src={sell} alt='게시글 등록하기' />
        </Button>
      </Window>
    </BackGround>
  );
});

const Button = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #fc882986;
  border: 3px double white;
  &:hover {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  padding-top: 5px;
  z-index: 2;
  position: absolute;
  right: 10px;
  bottom: 10px;
  & > img {
    width: 30px;
    height: 30px;
    opacity: 0.7;
  }
`;

export default memo(GoodsList);
