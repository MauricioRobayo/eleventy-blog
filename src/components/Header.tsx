import React, { FunctionComponent } from 'react';
import Profile from './Profiles';
import { Basics } from  '../types';
import styles from './Header.module.css';

interface Props extends Basics {
  isLoading?: Boolean;
}

const Header: FunctionComponent<Props> = ({ name, profiles, isLoading = false }: Props) => (
  <header className={styles.header}>
    <h1 className={styles.title}>{name}</h1>
    <Profile profiles={profiles}></Profile>
  </header>
)

export default Header;