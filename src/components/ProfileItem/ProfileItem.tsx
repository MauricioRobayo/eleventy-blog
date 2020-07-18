import React, { FC } from 'react';
import { Profile } from '../../types';
import styles from './ProfileItem.module.css';
import { GitHub, Twitter, LinkedIn } from '../Icons';

const icons: Record<string, any> = {
  github: <GitHub className={styles.icon} />,
  twitter: <Twitter className={styles.icon} />,
  linkedin: <LinkedIn className={styles.icon} />,
};

const ProfileItem: FC<Profile> = ({ network, url }) => {
  return (
    <li className={styles.profileItem}>
      <a href={url} aria-label={`Contact ${network}`}>
        {icons[network.toLowerCase()]}
      </a>
    </li>
  );
};

export default ProfileItem;
