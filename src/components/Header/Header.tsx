import React, { FunctionComponent } from 'react';
import Profile from '../Profiles/Profiles';
import { Basics } from '../../types';
import styles from './Header.module.css';

interface Props extends Basics {
  isLoading?: Boolean;
}

const Header: FunctionComponent<Props> = ({
  name,
  profiles,
  isLoading = false,
}: Props) => (
  <header className={`${styles.header} ${isLoading ? styles.loading : ''}`}>
    <h1 className={`${styles.title} ${isLoading ? styles.loading : ''}`}>
      {name}
    </h1>
    <div
      className={`${styles.loadingBox} ${isLoading ? styles.loading : ''}`}
    ></div>
    <Profile profiles={profiles}></Profile>
  </header>
);

export default Header;
