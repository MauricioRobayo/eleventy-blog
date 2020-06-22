import React, { FunctionComponent } from 'react';
import styles from "./Footer.module.css";

const Footer: FunctionComponent = () => (
  <footer className={styles.footer}>
    <p>
      <a href="https://github.com/MauricioRobayo/mauriciorobayo.github.io">You can contribute to make it better!</a>
    </p>
    <p> 
      All rights reserved. © {new Date().getFullYear()} <a href="https://www.mauriciorobayo.com">Mauricio Robayo</a>
    </p>
  </footer>
);

export default Footer;