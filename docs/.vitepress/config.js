import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Slack alfred workflow",
  description: "Seamlessly search for users and channels on Slack using Alfred",
  base: '/slack-alfred-workflow/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting started', link: '/getting-started' }
    ],

    sidebar: [
      {
        text: 'Installation',
        items: [
          { text: 'Getting started', link: '/getting-started' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/renatomoor/slack-alfred-workflow' }
    ]
  }
})
