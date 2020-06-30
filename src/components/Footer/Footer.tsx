import React, { FunctionComponent } from 'react';
import styles from './Footer.module.css';

const Footer: FunctionComponent = () => (
  <footer className={styles.footer}>
    <p>©{new Date().getFullYear()} Mauricio Robayo</p>
    <p>
      <a href="https://github.com/MauricioRobayo/mauriciorobayo.github.io">
        Source code
      </a>
    </p>
  </footer>
);

export default Footer;
