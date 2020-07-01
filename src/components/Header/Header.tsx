import React, { FunctionComponent } from 'react';
import Profiles from '../Profiles/';
import { Profile } from '../../types';
import styles from './Header.module.css';

interface Props {
  title?: string;
  profiles?: Profile[];
  loading?: Boolean;
}

const Header: FunctionComponent<Props> = ({
  title,
  profiles,
  loading = false,
}: Props) => (
  <header className={`${styles.header} ${loading ? styles.loading : ''}`}>
    <h1 className={`${styles.title} ${loading ? styles.loading : ''}`}>
      {title}
    </h1>
    <div
      className={`${styles.loadingBox} ${loading ? styles.loading : ''}`}
    ></div>
    <Profiles profiles={profiles}></Profiles>
  </header>
);

export default Header;
