import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

const sidebars: SidebarsConfig = {
  "quick-start": [
    {
      type: "category",
      label: "Quick Start",
      collapsible: false,
      link: {
        type: "generated-index",
        slug: "/quick-start",
      },
      items: [{ type: "autogenerated", dirName: "quick-start" }],
    },
  ],
  learn: [
    {
      type: "category",
      label: "Understanding aelf",
      collapsible: false,
      link: {
        type: "generated-index",
        slug: "/learn",
      },
      items: [{ type: "autogenerated", dirName: "learn" }],
    },
  ],
  docs: [
    {
      type: "category",
      label: "Docs Reference",
      collapsible: false,
      link: {
        type: "generated-index",
        slug: "/docs",
      },
      items: [{ type: "autogenerated", dirName: "docs" }],
    },
  ],
  tools: [
    {
      type: "category",
      label: "Tools",
      collapsible: false,
      link: {
        type: "generated-index",
        slug: "/tools",
      },
      items: [{ type: "autogenerated", dirName: "tools" }],
    },
  ],
  resources: [
    {
      type: "category",
      label: "Resources",
      collapsible: false,
      link: {
        type: "generated-index",
        slug: "/resources",
      },
      items: [{ type: "autogenerated", dirName: "resources" }],
    },
  ],
};

export default sidebars;
