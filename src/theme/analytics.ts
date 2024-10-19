import * as amplitude from "@amplitude/analytics-browser";
import { gaEventsForwarderPlugin } from "@amplitude/plugin-ga-events-forwarder-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

export const analytics = () => {
  const gaEventsForwarder = gaEventsForwarderPlugin();
  amplitude.add(gaEventsForwarder);
  amplitude.init("7652218546e8f6cc3d045e43a68830f6", { autocapture: true });
  const sessionReplayTracking = sessionReplayPlugin({
    sampleRate: 0.01,
  });
  amplitude.add(sessionReplayTracking);

  hotjar.initialize({ id: 5101939, sv: 6 });
  ReactGA.initialize("G-PFZ0BCQHMY");
  TagManager.initialize({
    gtmId: "GTM-NKWDMQ52",
  });
};
