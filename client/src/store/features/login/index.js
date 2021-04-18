import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  auth
} from '../../../data'
import Swal from 'sweetalert2'

const initialState = {
  // all properties in this state would be passed to the
  // reducer for the first time when Redux initializes
  user: {},
  isLogin: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    request: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        ...state
      }
    },
    success: (state, action) => {
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      }
    },
    failure: (state) => {
      return {
        ...state,
        isLogin: false,
        user: {},
      }
    },
    clear: (state) => {
      return {
        ...state,
        isLogin: false,
        user: {},
      }
    },
  },
});

export const loginReducer = loginSlice.reducer;
export const { request, clear } = loginSlice.actions;

function* loginHandler(action) {
  try {
    let response = yield call(auth, action.payload)
    yield put({ type: "login/success", payload: response.data })
    localStorage.setItem("_Auth", JSON.stringify(response.data))
  } catch (error) {
    Swal.fire('Incorrect username or password')
    yield put({ type: "login/failure" })
  }
  // perform side effects here
}

// The function below is called a saga and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(barSaga(10))`. This
// will call the async incrementHandler with the `action` as the first argument.
// Async code can then be executed and other actions can be dispatched with yield method.
export function* loginSaga() {
  // barSaga would listen to incrementByAmount action and call incrementHandler()
  yield takeLatest(request, loginHandler);
}
