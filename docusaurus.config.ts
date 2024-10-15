import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import footerLinks from "./config/footer-links.json";
import navbarLinks from "./config/navbar-links.json";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "dotenv/config";

const config: Config = {
  title: "aelf Docs",
  tagline: "Official documentation for AElfProject.",
  favicon: "img/favicon.ico",
  trailingSlash: true,

  // Set the production url of your site here
  url: "https://docs.aelf.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "AElfProject", // Usually your GitHub org/user name.
  projectName: "aelf-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: ["docusaurus-plugin-hotjar"],
  scripts: [
    {
      src: "/js/amplitude.js",
      async: true,
    },
  ],
  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          admonitions: {
            keywords: ["faq"],
            extendDefaults: true,
          },
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-PFZ0BCQHMY",
        },
        googleTagManager: {
          containerId: "GTM-NKWDMQ52",
        },
      } satisfies Preset.Options,
    ],
  ],
  themes: ["docusaurus-theme-search-typesense"],
  themeConfig: {
    // Replace with your project's social card
    image: "img/aelficon.png",
    navbar: {
      logo: {
        alt: "aelf",
        src: "img/Logo.aelf.svg",
        srcDark: "img/Logo.aelf.white.svg",
      },
      items: [
        // @ts-expect-error
        ...navbarLinks.links,
        {
          href: "https://github.com/AElfProject",
          // @ts-expect-error
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    footer: {
      style: "light",
      links: footerLinks.links,
      copyright: `Copyright © ${new Date().getFullYear()} aelf`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        "bash",
        "csharp",
        "java",
        "json",
        "php",
        "protobuf",
      ],
    },
    docs: {
      sidebar: {
        hideable: true, // https://docusaurus.io/docs/sidebar#hideable-sidebar
      },
    },
    typesense: {
      typesenseCollectionName: process.env.TYPESENSE_COLLECTION_NAME,
      typesenseServerConfig: {
        nodes: [
          {
            host: process.env.TYPESENSE_SERVER_HOST,
            port: 443,
            protocol: "https",
          },
        ],
        apiKey: process.env.TYPESENSE_SEARCH_ONLY_APIKEY,
      },
      typesenseSearchParameters: {},
      contextualSearch: true,
    },
    hotjar: {
      applicationId: process.env.HOTJAR_ID,
    },
  } satisfies Preset.ThemeConfig,
  stylesheets: [
    {
      href: "/katex/katex.min.css",
      type: "text/css",
    },
  ],
};

export default config;
