import React from "react";
// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents";
import DocCardListLinks from "@site/src/theme/DocCardListLinks";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import FileTree from "./FileTree";

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  DocCardListLinks,
  Tabs,
  TabItem,
  FileTree,
};
