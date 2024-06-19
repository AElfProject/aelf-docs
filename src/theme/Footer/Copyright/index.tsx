import React from "react";
import Copyright from "@theme-original/Footer/Copyright";
import type CopyrightType from "@theme/Footer/Copyright";
import type { WrapperProps } from "@docusaurus/types";
import styles from "./index.module.css";

type Props = WrapperProps<typeof CopyrightType>;

export default function CopyrightWrapper(props: Props): JSX.Element {
  return (
    <>
      <div className={styles.wrap}>
        <Copyright {...props} />
        social
      </div>
    </>
  );
}
