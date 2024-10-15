// https://docusaurus.io/docs/3.4.0/swizzling#wrapper-your-site-with-root

import BrowserOnly from "@docusaurus/BrowserOnly";
import React, { useEffect } from "react";
import ChatComponent from "./ChatPAAL";
import { analytics } from "./analytics";

// Default implementation, that you can customize
export default function Root({ children }) {
  useEffect(() => {
    analytics();
  }, []);

  return (
    <>
      {children}
      <BrowserOnly>{() => <ChatComponent />}</BrowserOnly>
    </>
  );
}
