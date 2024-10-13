import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

const sidebars: SidebarsConfig = {
  "about-aelf": [
    {
      type: "category",
      label: "About aelf",
      collapsible: false,
      link: {
        type: "generated-index",
        slug: "/about-aelf",
      },
      items: [{ type: "autogenerated", dirName: "about-aelf" }],
    },
  ],
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
  tools: [
    {
      type: "category",
      label: "Tools",
      collapsible: false,
      link: {
        type: "generated-index",
        slug: "tools",
      },
      items: [
        { type: "doc", id: "tools/aelf-playground/index" },
        { type: "doc", id: "tools/aelf-studio-extention/index" },
        {
          type: "link",
          label: "Wallet",
          href: "https://portkey.finance/",
          description: "Integrate your dApp with Portkey wallet",
        },
        { type: "doc", id: "tools/faucet/index" },
        {
          type: "category",
          label: "Oracle",
          link: { type: "doc", id: "tools/oracle/index" },
          customProps: { description: "Oracle is" },
          items: [{ type: "autogenerated", dirName: "tools/oracle" }],
        },
        {
          type: "link",
          label: "Indexer",
          href: "https://aefinder.io/",
          description: "Query blockchain data from a database",
        },
        {
          type: "category",
          label: "aelf SDK",
          link: { type: "generated-index", slug: "tools/chain-sdk" },
          customProps: {
            description: "Command-line interface for aelf",
          },
          items: [{ type: "autogenerated", dirName: "tools/chain-sdk" }],
        },
        {
          type: "category",
          label: "aelf CLI",
          link: {
            type: "generated-index",
            title: "aelf CLI",
            slug: "tools/aelf-cli",
          },
          customProps: {
            description: "Command-line interface for aelf",
          },
          items: [{ type: "autogenerated", dirName: "tools/aelf-cli" }],
        },
      ],
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
