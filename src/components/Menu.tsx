import React, { FunctionComponent } from 'react';
import styles from './Menu.module.css';
import { Page } from '../types'

interface Props {
  pages: Page[];
}

const Menu: FunctionComponent<Props> = ({ pages }: Props) => (
  <nav className={styles.menu}>
    {pages.map(({name, url, selected}) => {
      if (url) {
        return <a className={selected ? styles.selected: ''} key={name} href={url}>{name}</a>;
      }
      return <a className={selected ? styles.selected: ''} key={name} href={`#${name.toLowerCase()}`}>{name}</a>;
    } )}
  </nav>
);

export default Menu;