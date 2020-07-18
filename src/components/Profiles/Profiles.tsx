import React, { FC } from 'react';
import { Profile } from '../../types';
import ProfileItem from '../ProfileItem/ProfileItem';
import styles from './Profiles.module.css';

interface Props {
  profiles: Profile[] | undefined;
}

const displayedProfiles: string[] = ['github', 'linkedin', 'twitter'];

const Profiles: FC<Props> = ({ profiles }) => {
  if (!profiles) {
    return null;
  }
  return (
    <ul className={styles.profiles} aria-label="profiles">
      {profiles
        .filter((profile: Profile) =>
          displayedProfiles.includes(profile.network.toLowerCase())
        )
        .map(({ network, url, username }: Profile) => (
          <ProfileItem
            key={network}
            username={username}
            network={network}
            url={url}
          ></ProfileItem>
        ))}
    </ul>
  );
};

export default Profiles;
