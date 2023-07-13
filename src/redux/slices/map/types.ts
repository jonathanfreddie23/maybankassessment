import { Location } from 'entities/map';

export interface MapInitialReduxState {
  actions: {
    getCoords: boolean;
  };
  locations: Location[];
  error: {
    getCoords: string;
  };
}
