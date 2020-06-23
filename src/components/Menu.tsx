import React, { FunctionComponent } from "react";
import styles from "./Menu.module.css";
import { Page } from "../types";
import { Link } from "react-router-dom";

interface Props {
  pages: Page[];
  onClick: Function;
}

const Menu: FunctionComponent<Props> = ({ pages, onClick }: Props) => (
  <nav className={styles.menu}>
    {pages.map(({ name, url, selected }) => {
      if (url) {
        return (
          <a
            key={name}
            href="https://blog.mauriciorobayo.com"
            className={selected ? styles.selected : ""}
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
          className={selected ? styles.selected : ""}
        >
          {name}
        </Link>
      );
    })}
  </nav>
);

export default Menu;
