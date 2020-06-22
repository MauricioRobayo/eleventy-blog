import React, { FunctionComponent } from 'react';
import styles from './Menu.module.css';

interface Props {
  pages: Page[];
}

interface Page {
  name: string;
  url?: string;
}

const Menu: FunctionComponent<Props> = ({ pages }: Props) => (
  <nav className={styles.menu}>
    {pages.map(({name, url = ''}) => {
      if (url) {
        return <a key={name} href={url}>{name}</a>;
      }
      return <a key={name} href={`#${name.toLowerCase()}`}>{name}</a>;
    } )}
  </nav>
);

export default Menu;