import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  userPost
} from '../../../data'
import Swal from 'sweetalert2'

const initialState = {
  // all properties in this state would be passed to the
  // reducer for the first time when Redux initializes
  isSuccess: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    request: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        ...state,
        isSuccess: false
      }
    },
    success: (state, action) => {
      return {
        ...state,
        isSuccess: true
      }
    },
    failure: (state) => {
      return {
        ...state,
        isSuccess: false
      }
    },
    clear: (state) => {
      return {
        ...state,
        isSuccess: false,
      }
    },
  },
});

export const userReducer = userSlice.reducer;
export const { request, clear } = userSlice.actions;

function* userHandler(action) {
  try {
    let response = yield call(userPost, action.payload)
    yield put({ type: "user/success", payload: response.data })
  } catch (error) {
    console.log(JSON.stringify(error.message))
    if (JSON.stringify(error.message).includes('409')) {
      Swal.fire('Email is already ')
    } else {
      Swal.fire('Create User Error ')
    }
    yield put({ type: "user/failure" })
  }
  // perform side effects here
}

// The function below is called a saga and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(barSaga(10))`. This
// will call the async incrementHandler with the `action` as the first argument.
// Async code can then be executed and other actions can be dispatched with yield method.
export function* userSaga() {
  // barSaga would listen to incrementByAmount action and call incrementHandler()
  yield takeLatest(request, userHandler);
}
