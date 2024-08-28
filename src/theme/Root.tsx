// https://docusaurus.io/docs/3.4.0/swizzling#wrapper-your-site-with-root

import BrowserOnly from "@docusaurus/BrowserOnly";
import React from "react";
import ChatComponent from "./ChatPAAL";

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <>
      {children}
      <BrowserOnly>{() => <ChatComponent />}</BrowserOnly>
    </>
  );
}
