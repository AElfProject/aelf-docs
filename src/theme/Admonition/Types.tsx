import React from "react";
import DefaultAdmonitionTypes from "@theme-original/Admonition/Types";

function FaqAdmonition(props) {
  return (
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
      <span itemProp="name" style={{ display: "none" }}>
        {props.title}
      </span>
      <div
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <div itemProp="text">{props.children}</div>
      </div>
    </div>
  );
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,

  // Add all your custom admonition types here...
  // You can also override the default ones if you want
  faq: FaqAdmonition,
};

export default AdmonitionTypes;
