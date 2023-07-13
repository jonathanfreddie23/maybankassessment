import React from 'react';

import HomeScreen from 'containers/home';

const App = (): JSX.Element => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
      }}
    >
      <HomeScreen />
    </div>
  );
};

export default App;
