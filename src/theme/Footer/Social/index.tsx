import React from "react";
import styles from "./index.module.css";
import socialLinks from "@site/config/social-links.json";

export default function Social(): JSX.Element {
  return (
    <div className={styles.social}>
      {socialLinks.links.map((i, key) => (
        <a
          key={key}
          href={i.href}
          target="_blank"
          rel="noopener noreferrer"
          title={i.label}
        >
          {i.icon ? (
            <img src={i.icon} className={styles.img} />
          ) : (
            <span className={styles.icon}>?</span>
          )}
        </a>
      ))}
    </div>
  );
}
