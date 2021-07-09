import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import {storage} from '../../shared/firebase';
import swal from 'sweetalert';

// actions
const UPLOAD_ING = 'UPLOAD_ING';
const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
const SET_PREVIEW = 'SET_PREVIEW';
const DELETE_IMAGE = 'DELETE_IMAGE';

// action creators
const uploading = createAction(UPLOAD_ING, (uploading) => ({uploading}));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({image_url}));
const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}));
const deleteImage = createAction(DELETE_IMAGE, (imgurl) => ({imgurl}));

const uploadImageFB = (image) => {
  return function (dispatch, getState, {history}) {
    dispatch(uploading(true));
    storage.ref(`images/${image.name}`).put(image).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        dispatch(uploadImage(url));
      });
    }).catch(err => {
      dispatch(uploading(false));
    });
  };
};

const deleteImageFB = (url, img) => {
  return function (dispatch, getState, {history}) {
    const storageRef = storage.ref();
    const image = storageRef.child(`images/${img}`);
    image.delete().then(function() {
      console.log('이미지를 지웠습니다!');
    }).catch((err) => {
      swal('이미지 삭제에 실패했습니다!');
      console.log('이미지 삭제에 실패했습니다!', err);
    });
    dispatch(deleteImage(url))
  }
}

// initialState
const initialState = {
  image_url: 'https://cdn.icon-icons.com/icons2/82/PNG/128/button_no_15721.png',
  uploading: false,
  preview: null,
}

// reducer
export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
      draft.image_url = action.payload.image_url;
      draft.uploading = false;
    }),
    [UPLOAD_ING]: (state, action) => produce(state, (draft) => {
      draft.uploading = action.payload.uploading;
    }),
    [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
      draft.preview = action.payload.preview;
    }),
    [DELETE_IMAGE]: (state, action) => produce(state, (draft) => {
      if (draft.image_url === action.payload.url) {
        draft.image_url = null;
      }
    })
  }, initialState  
);

const actionCreators = {
  uploadImage,
  uploadImageFB,
  setPreview,
  deleteImageFB,
};

export {actionCreators};