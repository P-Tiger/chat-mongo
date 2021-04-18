import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  uploadPost
} from '../../../data'
import Swal from 'sweetalert2'

const initialState = {
  // all properties in this state would be passed to the
  // reducer for the first time when Redux initializes
  uploadData: {}
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    request: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        ...state,
        uploadData: {}
      }
    },
    success: (state, action) => {
      return {
        ...state,
        uploadData: action.payload,
      }
    },
    failure: (state) => {
      return {
        ...state,
        uploadData: {}
      }
    },
    clear: (state) => {
      return {
        ...state,
        uploadData: {}
      }
    },
  },
});

export const uploadReducer = uploadSlice.reducer;
export const { request, clear, after } = uploadSlice.actions;

function* uploadHandler(action) {
  try {
    console.log(action.payload)
    let response = yield call(uploadPost, action.payload)
    yield put({ type: "upload/success", payload: response.data })
  } catch (error) {
    if ((error.message).includes('401')) {
      localStorage.removeItem('_Auth')
      window.location.reload();
    } else {
      Swal.fire('Upload Error')
    }
    yield put({ type: "upload/failure" })
  }
  // perform side effects here
}

// The function below is called a saga and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(barSaga(10))`. This
// will call the async incrementHandler with the `action` as the first argument.
// Async code can then be executed and other actions can be dispatched with yield method.
export function* uploadSaga() {
  // barSaga would listen to incrementByAmount action and call incrementHandler()
  yield takeLatest(request, uploadHandler);
}
