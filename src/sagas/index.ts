import { fork } from 'redux-saga/effects';

import map from './map';

import { SagaForkReturnType } from './types';

export default function* root(): SagaForkReturnType {
  yield fork(map().rootSaga);
}
