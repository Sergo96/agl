import React from 'react';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import DottedLine from 'icons/DottedLine';
import { AlignItems, FlexDirection, JustifyContent } from 'interfaces/flex';
import { useTranslation } from 'react-i18next';
import { Control, Controller, FieldValues } from 'react-hook-form';
import LabelGoogleMapsAutocomplete from 'molecules/LabelGoogleMapsAutocomplete';
import { IProps } from 'interfaces/props';
import BaseButton from 'atoms/Button';
import LogisticsMap from 'molecules/LogisticsMap';
import styles from './index.module.scss';

interface Props extends IProps {
  onLoad: (searchBox: google.maps.places.SearchBox) => void;
  onPlacesChanged: () => void;
  onLoadDestination: (searchBox: google.maps.places.SearchBox) => void;
  onPlacesChangedDestination: () => void;
  calculateRoute: () => void;
  control: Control<FieldValues>;
  directionsOptions?: google.maps.DirectionsRequest;
  response: google.maps.DirectionsResult | null;
  setResponse: React.Dispatch<React.SetStateAction<google.maps.DirectionsResult | null>>;
}

const LogisticsRouteInputs: React.FC<Props> = ({
  onLoad,
  onPlacesChanged,
  onLoadDestination,
  onPlacesChangedDestination,
  calculateRoute,
  control,
  directionsOptions,
  response,
  setResponse,
}) => {
  const [t] = useTranslation('common');

  return (
    <BaseFlex className={styles.root} justifyContent={JustifyContent.SPACE_BETWEEN}>
      <BaseFlex className={styles.routes}>
        <BaseFlex
          className={styles.points}
          flexDirection={FlexDirection.COLUMN}
          alignItems={AlignItems.CENTER}
          justifyContent={JustifyContent.CENTER}
        >
          <div className={styles.whiteCircle}>
            <div className={styles.pointA}>
              <BaseTypography value={t<string>('logistics.a')} />
            </div>
          </div>
          <BaseFlex alignItems={AlignItems.CENTER} className={styles.dottedline}>
            <DottedLine />
          </BaseFlex>
          <div className={styles.whiteCircle}>
            <div className={styles.pointB}>
              <BaseTypography value={t<string>('logistics.b')} />
            </div>
          </div>
        </BaseFlex>
        <BaseFlex
          className={styles.inputFields}
          flexDirection={FlexDirection.COLUMN}
          justifyContent={JustifyContent.SPACE_BETWEEN}
        >
          <div>
            <Controller
              name="origin"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <LabelGoogleMapsAutocomplete
                  onLoad={onLoad}
                  onPlacesChanged={onPlacesChanged}
                  label={t<string>('logistics.from')}
                  placeholder={t<string>('logistics.fromPlaceholder')}
                  {...rest}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="destination"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <LabelGoogleMapsAutocomplete
                  onLoad={onLoadDestination}
                  onPlacesChanged={onPlacesChangedDestination}
                  label={t<string>('logistics.to')}
                  placeholder={t<string>('logistics.toPlaceholder')}
                  {...rest}
                />
              )}
            />

            <BaseButton
              htmlType="button"
              type="primary"
              onClick={calculateRoute}
              className={styles.addPointButton}
              value={t<string>('logistics.calculateRoute')}
            />
          </div>
        </BaseFlex>
      </BaseFlex>
      <div className={styles.googleMap}>
        <LogisticsMap directionsOptions={directionsOptions} response={response} setResponse={setResponse} />
      </div>
    </BaseFlex>
  );
};
export default LogisticsRouteInputs;
