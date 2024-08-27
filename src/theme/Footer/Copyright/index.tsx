import React from "react";
import Copyright from "@theme-original/Footer/Copyright";
import type CopyrightType from "@theme/Footer/Copyright";
import type { WrapperProps } from "@docusaurus/types";
import styles from "./index.module.css";
import Logo from "@site/src/theme/logo";
import Social from "../Social";

type Props = WrapperProps<typeof CopyrightType>;

export default function CopyrightWrapper(props: Props): JSX.Element {
  return (
    <>
      <div className={styles.wrap}>
        <div className="mobile-hidden">
          <Social />
        </div>
        <div className={styles.copyright}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <Copyright {...props} />
        </div>
      </div>
    </>
  );
}
