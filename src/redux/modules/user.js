import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, deleteCookie } from "../../shared/cookie";
import { auth } from '../../shared/firebase';
import firebase from 'firebase/app';
import swal from 'sweetalert';

// 액션 타입
const LOG_OUT = 'LOG_OUT';
const GET_USER = 'GET_USER';
const SET_USER = 'SET_USER';

// 액션 생성 함수
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({user}));


// initialState
const initialState = {
  user: null,
  is_login: false,
};

// 리듀서
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
				draft.is_login = true;
      }),
		[LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
				draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// middleware actions
const loginFB = (userid, password) => {
  return function (dispatch, getState, {history}) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth.signInWithEmailAndPassword(userid, password).then((user) => {
        // console.log(user);

        dispatch(setUser({
          username: user.user.displayName,
          userid: userid,
          userimg: '',
          uid: user.user.uid,
        }));
        swal('환영합니다! :)');
        history.push('/');
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        if (errorCode === 'auth/invalid-email') {
          swal('잘못된 이메일 형식입니다.')
        };
        if (errorCode === 'auth/user-not-found') {
          swal('등록되지 않은 아이디입니다. 탑승권 발급을 진행해 주세요.')
        }
        if (errorCode === 'auth/wrong-password') {
          swal('비밀번호가 틀렸습니다.')
        }
      });
    });
  };
};

const signupFB = (userid, password, username) => {
  return function (dispatch, getState, {history}) {
    auth.createUserWithEmailAndPassword(userid, password).then((user) => {
      auth.currentUser.updateProfile({
        displayName: username,
      }).then(() => {
        dispatch(setUser({username: username, userid: userid, userimg: '', uid: user.user.uid,}));
        history.push('/');
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode, errorMessage);
      if (errorCode === 'auth/email-already-in-use') {
        swal('이미 존재하는 아이디입니다. 다른 아이디를 입력해 주세요.')
      }

      if (errorCode === 'auth/invalid-email') {
        swal('아이디는 올바른 이메일 형식으로 입력해 주세요.')
      }
    });
  }
}

const loginCheckFB = () => {
  return function (dispatch, getState, {history}) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({
          username: user.displayName,
          userimg: '',
          userid: user.email,
          uid: user.uid,
        }));
      } else {
        dispatch(logOut());
      }
    })
  }
}

const logoutFB = () => {
  return function (dispatch, getState, {history}) {
    auth.signOut().then(() => {
      dispatch(logOut());
      swal('감사합니다. 다음에 다시 뵙겠습니다!').then(() => {
        history.push('/login');
      })
  
    });
  };
};

// Export actionCreators
const actionCreators = {
  getUser,
  logOut,
  loginFB,
  signupFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };