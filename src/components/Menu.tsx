import React, { FunctionComponent } from 'react';
import styles from './Menu.module.css';
import { Page } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  pages: Page[];
  activePage: Page;
  onClick: Function;
}

const Menu: FunctionComponent<Props> = ({
  pages,
  onClick,
  activePage,
}: Props) => (
  <nav className={styles.menu}>
    {pages.map((page) => {
      const { url, name } = page;
      if (url) {
        return (
          <a
            key={name}
            href="https://blog.mauriciorobayo.com"
            className={page === activePage ? styles.selected : ''}
          >
            {name}
          </a>
        );
      }
      return (
        <Link
          onClick={() => onClick(name)}
          key={name}
          to={`/${name.toLowerCase()}`}
          className={page === activePage ? styles.selected : ''}
        >
          {name}
        </Link>
      );
    })}
  </nav>
);

export default Menu;
