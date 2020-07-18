import React, { FC } from 'react';
import styles from './Error.module.css';

interface Props {
  message: string | null;
  url: string;
}

const Error: FC<Props> = ({ message, url }) => (
  <div className={styles.header}>
    <p>{message}</p>
    <div>
      <a href={url}>{url}</a>
    </div>
  </div>
);

export default Error;
