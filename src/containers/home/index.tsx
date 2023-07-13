import React, { FunctionComponent, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Spin } from 'antd';
import config from 'config';
import Input from 'components/Input';
import LocationsList from 'components/LocationsList';
import Map from 'components/Map';
import styles from './home.module.css';

const HomeScreen: FunctionComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.apiKey || '',
    libraries: config.libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const renderMapAndInput = () => {
    if (!isLoaded) {
      return (
        <div className={styles['loader-container']}>
          <Spin />
        </div>
      );
    }

    return (
      <div className={styles['inner-container']}>
        <Map setMap={setMap} />
      </div>
    );
  };

  const searchFunction = () => {
    if (!isLoaded) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin />
        </div>
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        <Input map={map} />
      </div>
    );
  };

  return (
    <div className={styles['main-container']}>
      <div className={styles['title-spacing-main-container']}>
        <div className={styles['title-Spacing-container']}>
          <h1 className={styles.title}>Maybank Assessment</h1>
          <div
            style={{
              display: 'flex',
              width: '50%',
            }}
          >
            {searchFunction()}
          </div>
        </div>
      </div>

      {renderMapAndInput()}
      <LocationsList map={map} />
    </div>
  );
};

export default HomeScreen;
