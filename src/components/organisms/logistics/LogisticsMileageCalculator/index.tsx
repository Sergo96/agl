import React, { useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { IProps } from 'interfaces/props';
import { useTranslation } from 'react-i18next';
import LogisticsRouteInputs from 'molecules/LogisticsRouteInputs';
import { useForm } from 'react-hook-form';
import LogisticsCalculator from 'molecules/LogisticsCalculator';
import styles from './index.module.scss';

declare type Libraries = ('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[];

const googleMapsApiKey = 'AIzaSyCtPcA5IxlynU4CWjnmtqhcBzPPbjWqvlw';

interface Props extends IProps {}

const LogisticsMileageCalculator: React.FC<Props> = () => {
  const [libraries] = useState<Libraries>(['places']);
  const [searchBoxOrigin, setSearchBoxOrigin] = useState<google.maps.places.SearchBox | undefined>(undefined);
  const [originLocation, setOriginLocation] = useState<string | undefined>('');
  const [searchBoxdestination, setSearchBoxDestination] = useState<google.maps.places.SearchBox | undefined>(undefined);
  const [destinationLocation, setDestinationLocation] = useState<string | undefined>('');
  const [directionsOptions, setDirectionsOptions] = useState<google.maps.DirectionsRequest | undefined>(undefined);
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [tariff, setTariff] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const [t] = useTranslation('common');
  const { control, setValue } = useForm();

  useEffect(() => {
    setValue('origin', originLocation);
    setValue('destination', destinationLocation);
  }, [originLocation, destinationLocation]);

  const onLoad = (searchBox: google.maps.places.SearchBox) => {
    setSearchBoxOrigin(searchBox);
  };

  const onPlacesChanged = () => {
    const places = searchBoxOrigin && searchBoxOrigin.getPlaces();
    setOriginLocation(places && places[0] && places[0].formatted_address);
  };

  const onLoadDestination = (searchBox: google.maps.places.SearchBox) => {
    setSearchBoxDestination(searchBox);
  };

  const onPlacesChangedDestination = () => {
    const places = searchBoxdestination?.getPlaces();

    setDestinationLocation(places && places[0].formatted_address);
  };

  const calculateRoute = () => {
    setResponse(null);
    const options: google.maps.DirectionsRequest = {
      origin: originLocation ? originLocation : '',
      destination: destinationLocation ? destinationLocation : '',
      travelMode: google.maps.TravelMode.DRIVING,
    };
    setDirectionsOptions(options);
  };

  const calculateLogisticsTotalCost = () => {
    if (response?.routes[0]?.legs[0]?.distance?.value) {
      setTotal(Math.round(tariff * weight * (response.routes[0].legs[0].distance.value / 1000)));
    }
  };

  const distance = response ? response?.routes[0]?.legs[0]?.distance?.text : t('logistics.noDistance');
  const duration = response ? response?.routes[0]?.legs[0]?.duration?.text : t('logistics.noTime');
  const originValue = originLocation ? originLocation : t('logistics.noLocation');
  const destinationValue = destinationLocation ? destinationLocation : t('logistics.noDestination');

  return (
    <LoadScript libraries={libraries} googleMapsApiKey={googleMapsApiKey}>
      <div className={styles.root}>
        <LogisticsRouteInputs
          onLoad={onLoad}
          onPlacesChanged={onPlacesChanged}
          onLoadDestination={onLoadDestination}
          onPlacesChangedDestination={onPlacesChangedDestination}
          calculateRoute={calculateRoute}
          control={control}
          directionsOptions={directionsOptions}
          response={response}
          setResponse={setResponse}
        />
        <LogisticsCalculator
          setTariff={setTariff}
          setWeight={setWeight}
          total={total}
          calculateLogisticsTotalCost={calculateLogisticsTotalCost}
          distance={distance}
          duration={duration}
          originValue={originValue}
          destinationValue={destinationValue}
        />
      </div>
    </LoadScript>
  );
};

export default LogisticsMileageCalculator;
