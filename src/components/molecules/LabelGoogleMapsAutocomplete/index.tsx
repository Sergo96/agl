import React from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import BaseInput from 'atoms/Input';
import BaseTypography from 'atoms/Typography';
import { IBaseAtomComponentProps } from 'interfaces/props';
import styles from './index.module.scss';

interface Props extends IBaseAtomComponentProps {
  placeholder: string;
  label: string;
  onPlacesChanged: () => void;
  onLoad: (searchBox: google.maps.places.SearchBox) => void;
}

const LabelGoogleMapsAutocomplete: React.FC<Props> = ({ className, onPlacesChanged, label, onLoad, ...props }) => {
  return (
    <>
      <BaseTypography className={styles.formFieldLabel} value={label} />
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <BaseInput {...props} />
      </StandaloneSearchBox>
    </>
  );
};

export default LabelGoogleMapsAutocomplete;
