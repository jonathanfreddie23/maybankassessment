import React, { FunctionComponent } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

import { connect } from 'react-redux';
import Selectors from 'redux/Selectors';
import { RootState } from 'redux/store';

import { Location } from 'entities/map';

import './map.css';

const center = { lat: 3.15916, lng: 101.71366 }; // klcc position

interface MapProps {
  locationsList: Location[];
  setMap: (loadedMap: google.maps.Map) => void;
}

const Map: FunctionComponent<MapProps> = (props: MapProps) => {
  const { locationsList, setMap } = props;

  const renderMarkers = () => {
    if (locationsList.length === 0) {
      return null;
    }

    return (
      <>
        {locationsList.map((item) => {
          const { lat, lng, address } = item;

          return <Marker key={address} position={{ lat, lng }} />;
        })}
      </>
    );
  };

  return (
    <GoogleMap mapContainerClassName="map" zoom={13} center={center} onLoad={(map) => setMap(map)}>
      {renderMarkers()}
    </GoogleMap>
  );
};

const mapStateToProps = (state: RootState) => ({
  locationsList: Selectors.mapGetCoordsList(state),
});

export default connect(mapStateToProps)(Map);
