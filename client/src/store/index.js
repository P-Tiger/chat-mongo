import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import {
  loginReducer,
  loginSaga,

  userReducer,
  userSaga,

  chatReducer,
  chatSaga,

  uploadReducer,
  uploadSaga
} from './features';





function* rootSaga() {
  yield all([
    loginSaga(),
    userSaga(),
    chatSaga(),
    uploadSaga()
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    loginReducer,
    userReducer,
    chatReducer,
    uploadReducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
    ...process.env.NODE_ENV === 'development' ? [ // actions should be logged only during development
      createLogger({
        // * all the logs would be collapsed so as to prevent console from being cluttered
        // * you can uncomment the below line or completely line it as per your requirement
        collapsed: true,
        // * you can prevent actions to be logged by specifying their action type
        // predicate: (_, action) => !action.type.includes('action-type'),
      }),
    ] : [],
  ],
});

sagaMiddleware.run(rootSaga);

