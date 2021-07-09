import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import {firestore, storage} from '../../shared/firebase';
import moment from 'moment';
import { actionCreators as imageActions } from './image';
import swal from 'sweetalert';

// actions
const SET_GOOD = 'SET_GOOD';
const ADD_GOOD = 'ADD_GOOD';
const DELETE_GOOD = 'DELETE_GOOD';
const EDIT_GOOD = 'EDIT_GOOD';
const LOADING = 'LOADING';
const LIKE_TOGGLE = 'LIKE_TOGGLE';

const setGood = createAction(SET_GOOD, (good_list, paging) => ({good_list, paging}));
const addGood = createAction(ADD_GOOD, (good) => ({good}));
const loading = createAction(LOADING, (is_loading) => ({is_loading}));
const deleteGood = createAction(DELETE_GOOD, (good_idx) => ({good_idx}));
const editGood = createAction(EDIT_GOOD, (good_id, good) => ({good_id, good}));
const likeToggle = createAction(LIKE_TOGGLE, (good_id, is_like = null) => ({good_id, is_like}));

// 개별 상품 페이지가 포함하는 정보
const initialGood = {
    userid: 0,
    username: '익명',
    userimg: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
    goodimg: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    content: '',
    is_like: false,
    likecnt: 0,
};

// initialState
const initialState = {
  list: [],
  paging: {start: null, next: null, size: 10},
  is_loading: false,
}

// reducer
export default handleActions(
  {
    [SET_GOOD]: (state, action) => produce(state, (draft) => {
      draft.list.push(...action.payload.good_list);
      draft.paging = action.payload.paging;
      draft.is_loading = false;
    }),
    [ADD_GOOD]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.good);
    }),
    [DELETE_GOOD]: (state, action) => produce(state, (draft) => {
      draft.list.splice(action.payload.good_idx, 1);
    }),
    [LOADING]: (state, action) => produce(state, (draft) => {
      draft.is_loading = action.payload.is_loading;
    }),
    [LIKE_TOGGLE]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((g) => g.id === action.payload.good_id);
      draft.list[idx].is_like = action.payload.is_like;
    })
  }, initialState
);

// middleware actions
const getGoodFB = (start = null, size = 10) => {
  return function (dispatch, getState, {history}) {
    let _paging = getState().good.paging;
    if (_paging.start && !_paging.next) {
      return;
    }
    dispatch(loading(true));
    const goodDB = firestore.collection('good');
    let query = goodDB.orderBy('datetime', 'desc');
    if (start) {
      query = query.startAt(start);
    }
    query.limit(size + 1).get().then((docs) => {
      let good_list = [];
        let paging = {
          start: docs.docs[0],
          next: docs.docs.length === size + 1? docs.docs[docs.docs.length - 1]: null,
          size: size,
        };
        docs.forEach((doc) => {
        let _good = doc.data();
        let good = Object.keys(_good).reduce((acc, cur) => {
          if (cur.indexOf('user_') !== -1) {
            return { ...acc, user_info: { ...acc.user_info, [cur]: _good[cur]},
            };
          }
          return { ...acc, [cur]: _good[cur]};
        },
        { id: doc.id, user_info: {}}
        );
        good_list.push(good);
        });
        if (paging.next) {
          good_list.pop();
        }
        if (getState().user.user) {
          dispatch(setIsLike(good_list, paging));
        } else {
          dispatch(setGood(good_list, paging));
        }
    });
  };
};

const addGoodFB = (content) => {
  return function (dispatch, getState, {history}) {
    const goodDB = firestore.collection('good');
    const _user = getState().user.user;
    const _image = getState().image.preview;
    // console.log(typeof _image);
    const _good = {
      ...initialGood,
      username: _user.username,
      userid: _user.userid,
      userimg: _user.userimg,
      content: content,
      // goodimg: _image,
      datetime: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    const _upload = storage.ref(`images/${_good.userid}_${new Date().getTime()}`).putString(_image, 'data_url');
    _upload.then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        // console.log(url);
        return url;
      }).then(url => {
        goodDB.add({..._good, goodimg: url}).then((doc) => {
          let good = {..._good, id: doc.id, goodimg: url};
          dispatch(addGood(good));
          history.replace('/');
          dispatch(imageActions.setPreview(null));
        }).catch((err) => {
          swal('상품 등록에 실패했습니다.');
          console.log('post 작성 실패!', err);
        });
      });
    }).catch((err) => {
      swal('이미지 업로드에 실패했습니다.');
      console.log('이미지 업로드 실패!', err);
    })
  };
};

const deleteGoodFB = (id, idx) => {
  return function (dispatch, getState, {history}) {
    const goodDB = firestore.collection('good');
    const good = goodDB.doc(id);
    good.get().then((doc) => {
        const imgurl = doc.data().goodimg;
        const imgnum = imgurl.split('_')[1].split('?')[0];
        const userid = doc.data().userid;
        const imgname = `${userid}_${imgnum}`;
        dispatch(imageActions.deleteImageFB(imgurl, imgname));
    }).then(() => {
      good.delete().then(() => {
        swal('게시글 삭제가 완료되었습니다.');
        // console.log('게시글을 FB에서 지웠다!');
      }).catch((err) => {
        swal('게시글 삭제에 실패했습니다.');
        console.log('게시글을 FB에서 지우는 데 오류가 발생했다!', err);
      });
      dispatch(deleteGood(idx));
    history.replace('/');
    });
  };
};

const editGoodFB = (good_id, good) => {
  return function (dispatch, getState, {history}) {
    if (!good_id) {
      console.log('게시글 정보가 없습니다.');
      return;
    }
    const _image = getState().image.preview;
    const _good_idx = getState().good.list.findIndex((g) => g.id === good_id);
    const _good = getState().good.list[_good_idx];
    const goodDB = firestore.collection('good');
    if (_image === good.goodimg) {
      goodDB.doc(good_id).update(good).then((doc) => {
        dispatch(editGood(good_id, { ...good }));
        dispatch(imageActions.setPreview(null));
        history.replace('/');
      });
      return;
    } else {
      const userid = getState().user.user.uid;
      const _upload = storage.ref(`images/${userid}_${new Date().getTime()}`).putString(_image, 'data_url');
      _upload.then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          return url;
        }).then((url) => {
          goodDB.doc(good_id).update({ ...good, goodimg: url}).then((doc) => {
            dispatch(editGood(good_id, { ...good, goodimg: url}));
            dispatch(imageActions.setPreview(null));
            history.replace('/');
          });
        }).catch((err) => {
          swal('이미지 수정에 실패했습니다!');
          console.log('이미지 수정에 실패했습니다.', err);
        });
      });
    };
  };
};

const toggleLikeFB = (good_id) => {
  return function (dispatch, getState, {history}) {
    if (!getState().user.user) {
      return;
    }
    const goodDB = firestore.collection('good');
    const likeDB = firestore.collection('like');
    const _idx = getState().good.list.findIndex((g) => g.id === good_id);
    const _good = getState().good.list[_idx];
    const userid = getState().user.user.uid;
    if (_good.is_like) {
      likeDB.where('good_id', '==', _good.id).where('userid','==',userid).get().then((docs) => {
        let batch = firestore.batch();
        docs.forEach((doc) => {
          batch.delete(likeDB.doc(doc.id));
        });
        batch.update(goodDB.doc(good_id), {
          likecnt: _good.likecnt - 1 < 1 ? _good.likecnt : _good.likecnt - 1,
        });
        batch.commit().then(() => {
          dispatch(likeToggle(good_id, !_good.is_like));
        });
      }).catch((err) => {
        console.log(err);
      });
    } else {
      likeDB.add({good_id: good_id, userid: userid}).then((doc) => {
        goodDB.doc(good_id).update({likecnt: _good.likecnt + 1}).then(doc => {dispatch(likeToggle(good_id, !_good.is_like));
        });
      });
    };
  };
};

const setIsLike = (_good_list, paging) => {
  return function (dispatch, getState, {history}) {
    if (!getState().user.is_login) {
      return;
    }
    const likeDB = firestore.collection('like');
    const good_ids = _good_list.map((g) => g.id);
    let like_query = likeDB.where('good_id', 'in', good_ids);
    like_query.get().then((like_docs) => {
      let like_list = {};
      like_docs.forEach((doc) => {
        if (like_list[doc.data().good_id]) {
          like_list[doc.data().good_id] = [ ...like_list[doc.data().good_id], doc.data().userid,
        ];
        } else {
          like_list[doc.data().good_id] = [doc.data().userid];
        }
      });
      const userid = getState().user.user.uid;
      let good_list = _good_list.map((g) => {
        if (like_list[g.id] && like_list[g.id].indexOf(userid) !== -1) {
          return { ...g, is_like: true };
        }
        return g;
      });
      dispatch(setGood(good_list, paging));
    });
  };
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, {history}) {
    const goodDB = firestore.collection('good');
    goodDB.doc(id).get().then((doc) => {
      let _good = doc.data();
      let good = Object.keys(_good).reduce((acc, cur) => {
        if (cur.indexOf('user_') !== -1) {
          return { ...acc, user_info: { ...acc.user_info, [cur]: _good[cur]}
          };
        }
        return { ...acc, [cur]: _good[cur]};   
      }, {id: doc.id, user_info: {}});
      dispatch(setIsLike([good]));
    });
  };
};

// action creator export
const actionCreators = {
  setGood,
  addGood,
  getGoodFB,
  addGoodFB,
  deleteGoodFB,
  editGoodFB,
  toggleLikeFB,
  getOnePostFB,
  setIsLike,
};

export { actionCreators };