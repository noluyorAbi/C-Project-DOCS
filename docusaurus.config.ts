import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Gruppe 18 | C-Projekt",
  tagline: "Dokumenation für das C-Projekt der Gruppe 18",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://c-project-docs.vercel.app",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "noluyorAbi", // Usually your GitHub org/user name.
  projectName: "C-Project", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "de",
    locales: ["de"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          /*           editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/', */
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          /*  editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/", */
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/studio-61e4530e1349aa50966fcdd03a7326b7-bl3lccoq.jpg",
    navbar: {
      title: "< Gruppe 18 | C-Projekt >",
      logo: {
        alt: "Gruppe 18 | C-Projekt",
        src: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Dokumentation",
        },
        /*         { to: "/blog", label: "Blog", position: "left" },
         */ {
          href: "https://github.com/noluyorAbi/C-Project",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Dokumentation",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            /*             {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "X",
              href: "https://x.com/docusaurus",
            }, */
            {
              label: "GitHub Discussions",
              href: "https://github.com/noluyorAbi/C-Project/discussions",
            },
          ],
        },
        {
          title: "More",
          items: [
            /*             {
              label: "Blog",
              to: "/blog",
            }, */
            {
              label: "GitHub",
              href: "https://github.com/noluyorAbi/C-Project",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} noluyorAbi, Gruppe 18 - SysPrak WiSe 24/25.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
