const siteMetadata = {
  title: { en: 'Thomas Ansems Develop', nl: 'Thomas Ansems Develop' },
  author: 'Thomas Ansems',
  headerTitle: { en: 'EN Thomas', nl: 'NL Thomas' },
  description: {
    en: 'My personal programming experience blog',
    nl: 'Development ervaringen en blog',
  },
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://thomasansems.nl/',
  siteRepo: 'https://github.com/thomasansems/portfolio',
  siteLogo: '/static/images/me.png',
  image: '/static/images/me.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'me@thomasansems.nl',
  mail: 'mailto:me@thomasansems.nl',
  github: 'https://github.com/thomasansems',
  twitter: 'https://twitter.com/0xTHAN',
  linkedin: 'https://www.linkedin.com/in/thomas-ansems-16214319/',
  locale: 'en-US',
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports plausible, simpleAnalytics, umami or googleAnalytics
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
  },
}

module.exports = siteMetadata
