import { LoadScriptProps } from '@react-google-maps/api';

const libraries: LoadScriptProps['libraries'] = ['places'];

const config = {
  libraries,
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
};

export default config;
