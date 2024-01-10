import React from 'react';
import ProfileImageCard from 'molecules/ProfileImageCard';
import { IProps } from 'interfaces/props';
import ProfileForm from 'organisms/ProfileForm';
import styles from './index.module.scss';

interface Props extends IProps {}

const Profile: React.FC<Props> = () => {
  return (
    <div className={styles.root}>
      <ProfileImageCard className={styles.imageCard} />
      <ProfileForm />
    </div>
  );
};
export default Profile;
