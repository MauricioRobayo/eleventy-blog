import React, { FunctionComponent } from 'react';
import { Profile } from '../types';

const ProfileItem:FunctionComponent<Profile> = ({network, url}: Profile) => (
  <li>
    <a href={url} aria-label={`Contact ${network}`}> <svg className={`icon ${network}`}> <use href={`#logo-${network.toLowerCase()}`}></use> </svg> </a>
  </li>
)

export default ProfileItem