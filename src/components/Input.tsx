import React, { FunctionComponent } from 'react';
import { AutoComplete, Input } from 'antd';
import usePlacesAutocomplete from 'use-places-autocomplete';

import { connect } from 'react-redux';
import Actions from 'redux/Actions';
import { AppDispatch } from 'redux/store';
import colours from 'utilities/coloursTemplate';

interface InputProps {
  map: google.maps.Map | null;
  getCoords: (address: string, map: google.maps.Map) => void;
}

const InputComponent: FunctionComponent<InputProps> = (props: InputProps) => {
  const { map, getCoords } = props;
  const {
    ready,
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const onChangeHandler = (selectedValue: string | null) => {
    if (selectedValue && map) {
      getCoords(selectedValue, map);
    }
  };

  const options = data.map((item) => ({ value: item.description }));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
      }}
    >
      <AutoComplete
        style={{ width: '50%' }}
        options={options}
        disabled={!ready}
        onBlur={() => {
          clearSuggestions();
        }}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        onSelect={(selectedValue) => {
          onChangeHandler(selectedValue);
        }}
      >
        <Input
          style={{
            width: '100%',
            color: colours.textMain,
          }}
          bordered
          placeholder="...search"
          onChange={(e) => setValue(e.target.value)}
        />
      </AutoComplete>
    </div>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getCoords: (address: string, map: google.maps.Map) => dispatch(Actions.getMapCoordsAttempt({ address, map })),
});

export default connect(null, mapDispatchToProps)(InputComponent);
