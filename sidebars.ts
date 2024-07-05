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
  "quick-start": [
    {
      type: "category",
      label: "Quick Start",
      collapsible: false,
      link: {
        type: "generated-index",
        slug: "/quick-start",
      },
      items: [
        { type: "doc", id: "quick-start/intro-to-aelf-development/index" },
        { type: "doc", id: "quick-start/hello-world/index" },
        { type: "doc", id: "quick-start/lottery-game/index" },
        { type: "doc", id: "quick-start/vote-contract/index" },
        {
          type: "category",
          label: "Become a Node Operator",
          description: "Join our network",
          link: {
            type: "generated-index",
            slug: "/quick-start/become-a-node-operator",
            description:
              "To become a BP (Block Producer), you must run a full node and participate in the election. The total number of BPs in the aelf network is 2N+1, starting at 8 in 2022 and increasing by 1 each year. If your node ranks in the top 2N+1 in the election, you can participate in block production and aelf governance. This tutorial will guide you on how to become a BP.",
          },
          items: [
            {
              type: "autogenerated",
              dirName: "quick-start/become-a-node-operator",
            },
          ],
        },
        {
          type: "doc",
          id: "quick-start/explore-running-aelf-side-chain/index",
        },
        { type: "doc", id: "quick-start/run-a-side-chain/index" },
        {
          type: "doc",
          id: "quick-start/start-and-run-a-node-on-aelf-locally-or-on-cloud/index",
        },
      ],
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
      items: [
        {
          type: "category",
          label: "Core",
          description: "Overview of aelf, its architecture, and key features.",
          link: {
            type: "generated-index",
            slug: "/learn/core",
          },
          items: [{ type: "autogenerated", dirName: "learn/core" }],
        },
        {
          type: "category",
          label: "Cross Chain",
          description: "Description of Cross Chain",
          link: {
            type: "generated-index",
            slug: "/learn/cross-chain",
          },
          items: [{ type: "autogenerated", dirName: "learn/cross-chain" }],
        },
        { type: "doc", id: "learn/consensus/index" },
        { type: "doc", id: "learn/network/index" },
        { type: "doc", id: "learn/aelf-blockchain-boot-sequence/index" },
        { type: "doc", id: "learn/addresses/index" },
        { type: "doc", id: "learn/transactions/index" },
        {
          type: "category",
          label: "Smart Contract",
          description: "aelf Smart Contract Introduction",
          link: {
            type: "generated-index",
            slug: "/learn/smart-contract",
          },
          items: [
            { type: "doc", id: "learn/smart-contract/architecture/index" },
            { type: "doc", id: "learn/smart-contract/service/index" },
            { type: "doc", id: "learn/smart-contract/event/index" },
            { type: "doc", id: "learn/smart-contract/messages/index" },
            {
              type: "category",
              label: "Requirements and Restrictions",
              description: "What you can do",
              link: {
                type: "generated-index",
                slug: "/learn/smart-contract/requirements-and-restrictions",
              },
              items: [
                {
                  type: "autogenerated",
                  dirName: "learn/smart-contract/requirements-and-restrictions",
                },
              ],
            },
          ],
        },
        {
          type: "category",
          label: "ACS Introduction",
          description: "aelf Contracts Standard Introduction",
          link: {
            type: "generated-index",
            slug: "/learn/acs-introduction",
          },
          items: [{ type: "autogenerated", dirName: "learn/acs-introduction" }],
        },
      ],
    },
    {
      type: "category",
      label: "Tutorials",
      collapsible: false,
      link: {
        type: "generated-index",
        slug: "/tutorials",
      },
      items: [
        {
          type: "category",
          label: "Operate a Node",
          description: "Tutorials on operating aelf nodes.",
          link: {
            type: "generated-index",
            slug: "/tutorials/operate-a-node",
          },
          items: [
            {
              type: "doc",
              id: "tutorials/operate-a-node/run-a-testnet-node/index",
            },
            {
              type: "doc",
              id: "tutorials/operate-a-node/run-a-mainnet-node/index",
            },
            {
              type: "doc",
              id: "tutorials/operate-a-node/run-aelf-on-cloud/index",
            },
            {
              type: "category",
              label: "Run a Side Chain",
              description: "Tutorials on running a sidechain node.",
              link: {
                type: "generated-index",
                slug: "/tutorials/operate-a-node/run-a-side-chain",
              },
              items: [
                {
                  type: "autogenerated",
                  dirName: "tutorials/operate-a-node/run-a-side-chain",
                },
              ],
            },
          ],
        },
      ],
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
      items: [
        {
          type: "category",
          label: "Smart Contract API",
          description: "Useful references for smart contract.",
          link: {
            type: "generated-index",
            slug: "/docs/smart-contract-api",
          },
          items: [
            { type: "autogenerated", dirName: "docs/smart-contract-api" },
          ],
        },
        {
          type: "category",
          label: "Web API",
          description: "Useful references for web.",
          link: {
            type: "generated-index",
            slug: "/docs/web-api",
          },
          items: [{ type: "autogenerated", dirName: "docs/web-api" }],
        },
      ],
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
      items: [
        {
          type: "category",
          label: "Chain SDK",
          description: "SDKs for working with the blockchain.",
          link: {
            type: "generated-index",
            slug: "/tools/chain-sdk",
          },
          items: [{ type: "autogenerated", dirName: "tools/chain-sdk" }],
        },
        { type: "doc", id: "tools/aelf-deploy/index" },
        {
          type: "category",
          label: "aelf CLI",
          description: "Command-line interface for aelf.",
          link: {
            type: "generated-index",
            slug: "/tools/aelf-cli",
          },
          items: [{ type: "autogenerated", dirName: "tools/aelf-cli" }],
        },
        {
          type: "category",
          label: "Smart Contract Templates",
          description: "Useful templates for smart contracts.",
          link: {
            type: "generated-index",
            slug: "/tools/smart-contract-templates",
          },
          items: [
            {
              type: "autogenerated",
              dirName: "tools/smart-contract-templates",
            },
          ],
        },
        { type: "doc", id: "tools/faucet/index" },
        { type: "doc", id: "tools/design/index" },
        {
          type: "category",
          label: "Contract SDK",
          description: "C# SDKs for smart contracts.",
          link: {
            type: "generated-index",
            slug: "/tools/contract-sdk",
          },
          items: [
            {
              type: "autogenerated",
              dirName: "tools/contract-sdk",
            },
          ],
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
