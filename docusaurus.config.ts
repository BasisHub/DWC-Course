import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'BBj DWC Training',
  tagline: 'Dynamic Web Client Training Course',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://BasisHub.github.io',
  baseUrl: '/DWC-Course/',

  // GitHub pages deployment config
  organizationName: 'BasisHub',
  projectName: 'DWC-Course',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Docs as the main content
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'BBj DWC Training',
      logo: {
        alt: 'DWC Logo',
        src: 'img/dwc-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Course',
        },
        {
          href: 'https://documentation.basis.cloud/BASISHelp/WebHelp/dwc/DWC_Overview.htm',
          label: 'DWC Docs',
          position: 'right',
        },
        {
          href: 'https://github.com/BasisHub/DWC-Course',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Course',
          items: [
            {
              label: 'Getting Started',
              to: '/',
            },
            {
              label: 'Prerequisites',
              to: '/prerequisites',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'BASIS Online Help',
              href: 'https://documentation.basis.cloud/BASISHelp/WebHelp/index.htm',
            },
            {
              label: 'DWC Documentation',
              href: 'https://documentation.basis.cloud/BASISHelp/WebHelp/dwc/DWC_Overview.htm',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BASIS International Ltd. Content from BBj DWC Training Course.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'bash', 'bbj'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
