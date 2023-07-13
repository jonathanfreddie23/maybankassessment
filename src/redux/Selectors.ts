import map from 'redux/slices/map/selectors';

import { Location } from 'entities/map';

import { RootState } from './store';

const mapGetCoordsAttempting = (state: RootState): boolean => map.getCoordsAttempting(state.map);
const mapGetCoordsError = (state: RootState): string => map.getCoordsError(state.map);

const mapGetCoordsList = (state: RootState): Location[] => map.getCoordsList(state.map);

export default {
  mapGetCoordsAttempting,
  mapGetCoordsError,

  mapGetCoordsList,
};
