import { useState } from "react";
import {
  FeelbackTaggedMessage,
  Question,
  PRESET_YESNO_LIKE_DISLIKE,
} from "@feelback/react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const YES_TAGS = [
  {
    value: "accurate",
    title: "Accurate",
    description: "Accurately describes the product or feature.",
  },
  {
    value: "problem-solved",
    title: "Solved my problem",
    description: "Helped me resolve an issue.",
  },
  {
    value: "clear",
    title: "Easy to understand",
    description: "Easy to follow and comprehend.",
  },
  {
    value: "product-chosen",
    title: "Helped me decide to use the product",
    description: "Convinced me to adopt the product or feature.",
  },
  { value: "other-yes", title: "Another reason" },
];

const NO_TAGS = [
  {
    value: "inaccurate",
    title: "Inaccurate",
    description: "Doesn't accurately describe the product or feature.",
  },
  {
    value: "missing-info",
    title: "Couldn't find what I was looking for",
    description: "Missing important information.",
  },
  {
    value: "unclear",
    title: "Hard to understand",
    description: "Too complicated or unclear.",
  },
  {
    value: "bad-examples",
    title: "Code samples errors",
    description: "One or more code samples are incorrect.",
  },
  { value: "other-no", title: "Another reason" },
];

const Feedback = () => {
  const [choice, setChoice] = useState<"y" | "n">();
  const { siteConfig } = useDocusaurusContext();
  const { FEEDBACK_CONTENT_SET_ID } = siteConfig.customFields;

  return (
    <div className="alert alert--info feedback-component">
      <div className="feelback-container">
        {!choice ? (
          <Question
            text="Was this page helpful?"
            items={PRESET_YESNO_LIKE_DISLIKE}
            showLabels
            onClick={(option: "y" | "n") => setChoice(option)}
          />
        ) : (
          <FeelbackTaggedMessage
            contentSetId={FEEDBACK_CONTENT_SET_ID as string}
            layout="radio-group"
            tags={choice === "y" ? YES_TAGS : NO_TAGS}
            title={choice === "y" ? "What did you like?" : "What went wrong?"}
            placeholder="(optional) Please, further detail the feedback"
          />
        )}
      </div>
    </div>
  );
};

export default Feedback;
