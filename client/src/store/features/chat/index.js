import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  chatList
} from '../../../data'
import Swal from 'sweetalert2'

const initialState = {
  // all properties in this state would be passed to the
  // reducer for the first time when Redux initializes
  chatData: []
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    request: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        ...state,
        chatData: []
      }
    },
    success: (state, action) => {
      return {
        ...state,
        chatData: action.payload,
      }
    },
    after: (state, action) => {
      return {
        ...state,
        chatData: [...state.chatData, action.payload]
      }
    },
    failure: (state) => {
      return {
        ...state,
        chatData: []
      }
    },
    clear: (state) => {
      return {
        ...state,
        chatData: []
      }
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const { request, clear, after } = chatSlice.actions;

function* chatHandler(action) {
  try {
    let response = yield call(chatList)
    yield put({ type: "chat/success", payload: response.data })
  } catch (error) {
    if ((error.message).includes('401')) {
      localStorage.removeItem('_Auth')
      window.location.reload();

    } else {
      Swal.fire('get Chat Error');
    }
    yield put({ type: "chat/failure" })
  }
  // perform side effects here
}

// The function below is called a saga and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(barSaga(10))`. This
// will call the async incrementHandler with the `action` as the first argument.
// Async code can then be executed and other actions can be dispatched with yield method.
export function* chatSaga() {
  // barSaga would listen to incrementByAmount action and call incrementHandler()
  yield takeLatest(request, chatHandler);
}
