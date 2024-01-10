import React from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { IProps } from 'interfaces/props';
import styles from './index.module.scss';

const center = {
  lat: 53.893009,
  lng: 27.567444,
};
interface Props extends IProps {
  directionsOptions?: google.maps.DirectionsRequest;
  response: google.maps.DirectionsResult | null;
  setResponse: React.Dispatch<React.SetStateAction<google.maps.DirectionsResult | null>>;
}

const LogisticsMap: React.FC<Props> = ({ directionsOptions, response, setResponse }) => {
  const directionsCallback = (response: any) => {
    if (response !== null && response.status === 'OK') {
      setResponse(response);
    }
  };

  return (
    <GoogleMap mapContainerClassName={styles.root} zoom={5} center={center}>
      {response === null && directionsOptions && (
        <DirectionsService options={directionsOptions} callback={directionsCallback} />
      )}
      {response !== null && (
        <DirectionsRenderer
          options={{
            directions: response,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default LogisticsMap;
