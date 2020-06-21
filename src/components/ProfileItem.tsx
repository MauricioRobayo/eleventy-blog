import React, { FunctionComponent } from 'react';
import { Profile } from '../types';
import styles from './ProfileItem.module.css';

const ProfileItem:FunctionComponent<Profile> = ({network, url}: Profile) => (
  <li className={styles.profileItem}>
    <a href={url} aria-label={`Contact ${network}`}>
      <svg className={styles.icon}> <use href={`#logo-${network.toLowerCase()}`}></use> </svg>
    </a>
  </li>
)

export default ProfileItem