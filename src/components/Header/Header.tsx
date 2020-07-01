import React, { FunctionComponent } from 'react';
import Profiles from '../Profiles/';
import { Profile } from '../../types';
import styles from './Header.module.css';

interface Props {
  title?: string;
  profiles?: Profile[];
  isLoading?: Boolean;
}

const Header: FunctionComponent<Props> = ({
  title,
  profiles,
  isLoading = false,
}: Props) => (
  <header className={`${styles.header} ${isLoading ? styles.loading : ''}`}>
    <h1 className={`${styles.title} ${isLoading ? styles.loading : ''}`}>
      {title}
    </h1>
    <div
      className={`${styles.loadingBox} ${isLoading ? styles.loading : ''}`}
    ></div>
    <Profiles profiles={profiles}></Profiles>
  </header>
);

export default Header;
