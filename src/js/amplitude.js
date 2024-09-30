!(function () {
  "use strict";
  !(function (e, t) {
    var r = e.amplitude || { _q: [], _iq: {} };
    if (r.invoked)
      e.console &&
        console.error &&
        console.error("Amplitude snippet has been loaded.");
    else {
      var n = function (e, t) {
          e.prototype[t] = function () {
            return (
              this._q.push({
                name: t,
                args: Array.prototype.slice.call(arguments, 0),
              }),
              this
            );
          };
        },
        s = function (e, t, r) {
          return function (n) {
            e._q.push({
              name: t,
              args: Array.prototype.slice.call(r, 0),
              resolve: n,
            });
          };
        },
        o = function (e, t, r) {
          e[t] = function () {
            if (r)
              return {
                promise: new Promise(
                  s(e, t, Array.prototype.slice.call(arguments))
                ),
              };
          };
        },
        i = function (e) {
          for (var t = 0; t < m.length; t++) o(e, m[t], !1);
          for (var r = 0; r < y.length; r++) o(e, y[r], !0);
        };
      r.invoked = !0;
      var a = t.createElement("script");
      (a.type = "text/javascript"),
        (a.crossOrigin = "anonymous"),
        (a.src =
          "https://cdn.amplitude.com/libs/plugin-ga-events-forwarder-browser-0.3.4-min.js.gz"),
        (a.onload = function () {
          e.gaEventsForwarder &&
            e.gaEventsForwarder.plugin &&
            e.amplitude.add(e.gaEventsForwarder.plugin());
        });
      var c = t.createElement("script");
      (c.type = "text/javascript"),
        (c.integrity =
          "sha384-pY2pkwHaLM/6UIseFHVU3hOKr6oAvhLcdYkoRZyaMDWLjpM6B7nTxtOdE823WAOQ"),
        (c.crossOrigin = "anonymous"),
        (c.async = !0),
        (c.src =
          "https://cdn.amplitude.com/libs/analytics-browser-2.11.0-min.js.gz"),
        (c.onload = function () {
          e.amplitude.runQueuedFunctions ||
            console.log("[Amplitude] Error: could not load SDK");
        });
      var u = t.getElementsByTagName("script")[0];
      u.parentNode.insertBefore(a, u), u.parentNode.insertBefore(c, u);
      for (
        var p = function () {
            return (this._q = []), this;
          },
          d = [
            "add",
            "append",
            "clearAll",
            "prepend",
            "set",
            "setOnce",
            "unset",
            "preInsert",
            "postInsert",
            "remove",
            "getUserProperties",
          ],
          l = 0;
        l < d.length;
        l++
      )
        n(p, d[l]);
      r.Identify = p;
      for (
        var g = function () {
            return (this._q = []), this;
          },
          v = [
            "getEventProperties",
            "setProductId",
            "setQuantity",
            "setPrice",
            "setRevenue",
            "setRevenueType",
            "setEventProperties",
          ],
          f = 0;
        f < v.length;
        f++
      )
        n(g, v[f]);
      r.Revenue = g;
      var m = [
          "getDeviceId",
          "setDeviceId",
          "getSessionId",
          "setSessionId",
          "getUserId",
          "setUserId",
          "setOptOut",
          "setTransport",
          "reset",
          "extendSession",
        ],
        y = [
          "init",
          "add",
          "remove",
          "track",
          "logEvent",
          "identify",
          "groupIdentify",
          "setGroup",
          "revenue",
          "flush",
        ];
      i(r),
        (r.createInstance = function (e) {
          return (r._iq[e] = { _q: [] }), i(r._iq[e]), r._iq[e];
        }),
        (e.amplitude = r);
    }
  })(window, document);
})();

amplitude.init("7652218546e8f6cc3d045e43a68830f6");
