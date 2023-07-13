import React, { FunctionComponent } from 'react';
import { Spin } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';

import { Location } from 'entities/map';
import colours from 'utilities/coloursTemplate';

import styles from './locations.module.css';

interface LocationsListProps {
  mapLoading: boolean;
  mapError: string;
  maplocationsList: Location[];
  map: google.maps.Map | null;
  deleteMapCoords: (address: string) => void;
}

const MaplocationsList: FunctionComponent<LocationsListProps> = (props: LocationsListProps) => {
  const { map, mapLoading, mapError, maplocationsList, deleteMapCoords } = props;

  const renderMapLocationsToMap = () => {
    if (maplocationsList.length === 0) {
      return <p style={{ marginLeft: '12px' }}>no locations searched </p>;
    }

    return (
      <div className={styles['Mainlist-container']}>
        {maplocationsList.map((item) => {
          const { address, lat, lng } = item;
          return (
            <div key={address} className={styles['buttons-main-container']}>
              <button
                type="button"
                className={styles['mapAddress-button']}
                onClick={() => {
                  if (map) map.panTo({ lat, lng });
                }}
              >
                {address}
              </button>

              <button type="button" className={styles['remove-button']} onClick={() => deleteMapCoords(address)}>
                <CloseOutlined rev={undefined} />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const loadingOrError = () => {
    if (mapLoading) {
      return (
        <div className={styles['Loader-container']}>
          <Spin />
        </div>
      );
    }

    if (mapError) {
      return <p style={{ color: colours.textError, marginLeft: '12px' }}>{mapError}</p>;
    }

    return null;
  };

  return (
    <div style={{ width: '100%' }} className={styles['main-container']}>
      <div className={styles['Location-Highlighter-container']}>
        <div style={{ marginTop: '20px' }}>{loadingOrError()}</div>

        <div className={styles['title-container']}>
          <h2 className={styles.title}>Search Results</h2>
        </div>

        <div style={{ width: '100%' }}>{renderMapLocationsToMap()}</div>
      </div>
      <p
        style={{
          marginLeft: '12px',
          color: 'white',
          display: maplocationsList.length > 2 ? 'flex' : 'none',
        }}
      >
        Scroll mouse vertically to views rest of places option
      </p>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  mapLoading: Selectors.mapGetCoordsAttempting(state),
  mapError: Selectors.mapGetCoordsError(state),
  maplocationsList: Selectors.mapGetCoordsList(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  deleteMapCoords: (address: string) => dispatch(Actions.deleteCoords(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MaplocationsList);
