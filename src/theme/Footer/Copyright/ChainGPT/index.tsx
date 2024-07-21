import React from "react";
import styles from "./index.module.css";
import {ChatBoxButton} from 'chaingpt-component';

export default function ChainGPT(): JSX.Element {
  return (
    <>
      <div className={styles.chainGPTContainer}>
        <ChatBoxButton
          apiUri="/api/demos/chaingpt"
        />
      </div>
    </>
  );
}
