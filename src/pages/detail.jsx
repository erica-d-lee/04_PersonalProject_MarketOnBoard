import React, { useEffect, memo } from 'react';
import { BackGround, Window, Header, Container, Good } from '../elements';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { actionCreators as goodActions } from '../redux/modules/good';
import { history } from '../redux/configStore';
import back from '../back.ico';

const Detail = memo((props) => {
  const dispatch = useDispatch();
  const id = props.match.params.goodId;
  const user_info = useSelector((state) => state.user.user);
  const good_list = useSelector((state) => state.good.list);
  const good_idx = good_list.findIndex((g) => g.id === id);
  const good = good_list[good_idx];

  useEffect(() => {
    if (good) {
      return;
    }
    dispatch(goodActions.getOnePostFB(id));
  }, []);

  const Delete = () => {
    dispatch(goodActions.deleteGoodFB(id, good_idx));
  };

  return (
    <React.Fragment>
      <BackGround deck>
        <Window>
          <Header />
          <Container>
            <Good {...good}>
              {good && good.userid === user_info.userid && (
                <React.Fragment>
                  <Button
                    style={{ marginLeft: '25%' }}
                    key={id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      history.push(`/post/${id}`);
                    }}
                  >
                    수정
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      Delete();
                    }}
                  >
                    삭제
                  </Button>
                </React.Fragment>
              )}
            </Good>
          </Container>
          <Backbtn
            onClick={() => {
              history.goBack();
            }}
          >
            <img src={back} alt='돌아가기' />
          </Backbtn>
        </Window>
      </BackGround>
    </React.Fragment>
  );
});

const Button = styled.button`
  height: 1.8rem;
  border: 3px double #f6fcff;
  border-radius: 5px;
  background-color: #41b4e2e1;
  color: #f6fcff;
  margin: 10px 0 10px 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Backbtn = styled.button`
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

export default memo(Detail);
