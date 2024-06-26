import React from "react";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

/**
 * Reference: https://docusaurus.io/docs/markdown-features/assets#themed-images
 */
export default function Logo(): JSX.Element {
  return (
    <ThemedImage
      alt="aelf"
      sources={{
        light: useBaseUrl("/img/Logo.aelf.svg"),
        dark: useBaseUrl("/img/Logo.aelf.white.svg"),
      }}
    />
  );
}
