import React from 'react';
import styles from './index.css';
import ScrollBar from '../../components/scrollBar/scrollBar';

export default () => (
  <div className={styles.normal}>
    <ScrollBar
    width={200}
    >
      {Array.from({ length: 10 }).map((item, key) => (
        <div key={key} style={{padding: '5px'}}>this is menus {key}</div>
      ))}
    </ScrollBar>
  </div>
);
