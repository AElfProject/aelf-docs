import * as amplitude from "@amplitude/analytics-browser";
import { gaEventsForwarderPlugin } from "@amplitude/plugin-ga-events-forwarder-browser";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";

export const analytics = () => {
  const gaEventsForwarder = gaEventsForwarderPlugin();
  amplitude.add(gaEventsForwarder);

  amplitude.init("7652218546e8f6cc3d045e43a68830f6");

  ReactGA.initialize("G-PFZ0BCQHMY");
  TagManager.initialize({
    gtmId: "GTM-NKWDMQ52",
  });
};
