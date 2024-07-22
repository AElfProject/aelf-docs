import React from "react";
import 'chaingpt-component/dist/index.css';
import styles from "./index.module.css";
import {ChatBoxButton} from 'chaingpt-component';

export default function ChainGPT(): JSX.Element {
  return (
    <>
      <div className={styles.chainGPTContainer}>
        <ChatBoxButton
          apiUri="chaingpt/api/chat"
        />
      </div>
    </>
  );
}
