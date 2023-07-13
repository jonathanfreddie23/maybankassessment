import { put, call, select, takeEvery } from 'typed-redux-saga/macro';

import { getGeocode, getLatLng } from 'use-places-autocomplete';

import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { PayloadAction } from '@reduxjs/toolkit';

import { Location } from 'entities/map';

export default function* watchGetCoords(): SagaWatcherReturnType {
  yield takeEvery('map/getMapCoordsAttempt', handleGetCoords);
}

function* handleGetCoords(data: PayloadAction<{ address: string; map: google.maps.Map }>) {
  const { address, map } = data.payload;

  const locationsList = yield* select(Selectors.mapGetCoordsList);

  const addressAlreadyExists = locationsList.find((item: Location) => item.address === address);

  if (addressAlreadyExists) {
    yield put(Actions.getMapCoordsFailure('location is already selected'));
    return;
  }

  const geocode = yield* call(() => getGeocode({ address }));

  const { lat, lng } = yield* call(() => getLatLng(geocode[0]));

  if (geocode || lat || lng) {
    yield put(
      Actions.getMapCoordsSuccess({
        address,
        lat,
        lng,
      }),
    );
    map.panTo({ lat, lng });
  } else {
    yield put(Actions.getMapCoordsFailure('something wrong , pls try again later!'));
  }
}
