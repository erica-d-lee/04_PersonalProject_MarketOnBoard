import React, { useState, useRef } from 'react';
import {
  BackGround,
  Container,
  Header,
  Text,
  Window,
  Image,
} from '../elements';
import styled from 'styled-components';
import search from '../search.ico';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as goodActions } from '../redux/modules/good';
import { actionCreators as imageActions } from '../redux/modules/image';
import { history } from '../redux/configStore';
import back from '../back.ico';
import { useEffect } from 'react';
import swal from 'sweetalert';

const Post = (props) => {
  const dispatch = useDispatch();
  const fileInput = useRef();
  const uploading = useSelector((state) => state.image.uploading);
  const preview = useSelector((state) => state.image.preview);
  const good_list = useSelector((state) => state.good.list);
  const good_id = history.location.pathname.split('/post/')[1];
  const editmode = good_id ? true : false;
  let _good = editmode ? good_list.find((g) => g.id === good_id) : null;
  const [content, setContent] = useState(_good ? _good.content : '');

  useEffect(() => {
    if (editmode && !_good) {
      window.alert('게시글 정보를 확인할 수 없어 뒤로 돌아갑니다.');
      history.goBack();
      return;
    }
    if (editmode) {
      dispatch(imageActions.setPreview(_good.goodimg));
    }
  }, []);

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const changeContent = (e) => {
    if (!e.target.value || e.target.value === '') {
      swal('내용을 입력해주세요!');
      return;
    }
    setContent(e.target.value);
  };

  const addGood = () => {
    dispatch(goodActions.addGoodFB(content));
  };

  const editGood = () => {
    dispatch(goodActions.editGoodFB(good_id, content));
  };

  const uploadFB = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      swal('상품 이미지를 등록해주세요!');
      return;
    }
    dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
  };

  return (
    <React.Fragment>
      <BackGround deck>
        <Window big>
          <Header />
          <Container>
            <TitleBox>
              <Text fontSize='x-large' fontWeight='bold'>
                {editmode ? '상품 정보 수정하기' : '상품 등록하기'}
              </Text>
            </TitleBox>
            <InputBox>
              <Text fontSize='small'>
                {editmode
                  ? '아래, 등록하신 상품의 사진입니다😉'
                  : '먼저, 상품의 사진을 보여주세요😉'}
              </Text>
              {editmode ? null : (
                <Label for='file'>
                  <Input
                    type='file'
                    ref={fileInput}
                    onChange={selectFile}
                    disabled={uploading}
                    accept='image/*'
                    id='file'
                  />
                  찾기
                  <Icon src={search} alt='찾기' />
                </Label>
              )}
            </InputBox>
            <div style={{ padding: '1rem' }}>
              <Text fontSize='large' fontWeight='bold'>
                미리보기
              </Text>
              <Preview>
                <Image
                  shape='rectangle'
                  src={
                    preview
                      ? preview
                      : 'https://cdn.icon-icons.com/icons2/82/PNG/128/button_no_15721.png'
                  }
                />
              </Preview>
            </div>
            <WriteBox>
              {editmode ? (
                <div>
                  <Text fontSize='large' fontWeight='bold'>
                    등록된 내용
                  </Text>
                  <div
                    style={{
                      border: '2px solid #39aad6ae',
                      borderRadius: '5px',
                      padding: '0 5px 0 5px',
                    }}
                  >
                    <Text fontSize='small'>{_good.content}</Text>
                  </div>
                </div>
              ) : (
                ''
              )}
              <Text fontSize='large' fontWeight='bold'>
                {editmode ? '내용 수정' : '내용 작성'}
              </Text>
              <Textarea
                onChange={changeContent}
                placeholder='이 상품의 매력은 무엇인가요? 사용하시는 분께 어떤 경험을 선물하게 될까요? 자유롭게 적어주세요! :)'
                rows='10'
                required
              />
              {/* <Fieldset>
                <Legend>이미지 위치 선택</Legend>
                <Layoutl>
                  <Layouti
                    type='radio'
                    name='layout'
                    value='image-left'
                    onChange={changeLayoutType}
                  />
                  왼쪽
                </Layoutl>
                <Layoutl>
                  <Layouti
                    type='radio'
                    name='layout'
                    value='image-right'
                    onChange={changeLayoutType}
                  />
                  오른쪽
                </Layoutl>
                <Layoutl>
                  <Layouti
                    type='radio'
                    name='layout'
                    value='image-above'
                    onChange={changeLayoutType}
                  />
                  위
                </Layoutl>
              </Fieldset> */}
              {editmode ? (
                <Button
                  type='submit'
                  onClick={() => {
                    editGood();
                  }}
                >
                  게시글 수정
                </Button>
              ) : (
                <Button
                  type='submit'
                  onClick={() => {
                    addGood();
                    uploadFB();
                  }}
                >
                  게시글 작성
                </Button>
              )}
            </WriteBox>
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
};

const TitleBox = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const InputBox = styled.div`
  text-align: center;
`;

const Label = styled.label`
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: small;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  background-color: #39aad6ae;
  display: inline-block;
  padding: 6px 12px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Input = styled.input`
  display: none;
`;

const Icon = styled.img`
  height: 0.7rem;
  margin: 0px 0px 0px 5px;
`;

const Preview = styled.div`
  height: 23rem;
  overflow: hidden;
`;

const WriteBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Textarea = styled.textarea`
  color: #3c7499;
  resize: none;
  &::placeholder {
    color: #87a3b6dd;
    font-style: oblique;
  }
  border: 2px solid #39aad6ae;
  border-radius: 5px;
  outline: none;
  caret-color: #39aad6ae;
  &:focus {
    border: 3px solid #39aad6ae;
  }
`;

// const Fieldset = styled.fieldset`
//   border: 2px solid #39aad6ae;
//   border-radius: 5px;
//   margin-top: 10px;
//   display: flex;
//   justify-content: space-between;
//   padding-left: 30px;
//   padding-right: 30px;
// `;

// const Legend = styled.legend`
//   color: #4aa2c5e0;
//   font-weight: bold;
//   text-align: center;
//   letter-spacing: 0.05rem;
// `;

// const Layoutl = styled.label`
//   color: #4aa2c5e0;
//   font-weight: bold;
// `;

// const Layouti = styled.input``;

const Button = styled.button`
  height: 1.8rem;
  margin-top: 20px;
  background-color: #39aad6ae;
  color: white;
  font-weight: 600;
  letter-spacing: 0.05rem;
  border: none;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
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

export default Post;
