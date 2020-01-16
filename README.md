[![Watch on GitHub](https://img.shields.io/github/watchers/iamkevinwolf/gatsby-sanity-now-starter.svg?style=social)](https://github.com/iamkevinwolf/gatsby-sanity-now-starter/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/iamkevinwolf/gatsby-sanity-now-starter.svg?style=social)](https://github.com/iamkevinwolf/gatsby-sanity-now-starter/stargazers)
[![Tweet!](https://img.shields.io/twitter/url/https/github.com/iamkevinwolf/gatsby-sanity-now-starter.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20the%20Gatsby%20+%20Sanity%20+%20Now%20Starter.%20Create%20an%20ultrafast%20website%2C%20with%20a%20solid%20CMS%20and%20serve%20it%20through%20a%20rock-solid%20CDN%20via%20ZEIT%20Now.%20https%3A//github.com/iamkevinwolf/gatsby-sanity-now-starter)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![All Contributors](https://img.shields.io/badge/all_contributors-0-blue.svg?style=flat-square)](#contributors)

<p align="center">
  <img src="./setup/assets/cover.png" alt="Gatsby + Sanity + Now Starter" />
</p>

# ✨ Gatsby + Sanity + Now Starter

Create a static web application, consume data from one of the most powerful headless CMS, hit serverless endpoints and deploy it all to a rock-solid CDN. **In less than five minutes!**

▶️ [SEE IT IN ACTION](https://drive.google.com/open?id=12dkuETnnzawGr9BUbW_h6OnJBWY94az8)

🎮 [Play with it](https://gatsby-sanity-now-starter.now.sh)

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What's Included?](#whats-included)
- [Requirements](#requirements)
- [Getting started](#getting-started)
  - [1. Create a new Gatsby project and use this repo URL as the template](#1-create-a-new-gatsby-project-and-use-this-repo-url-as-the-template)
  - [2. Move into the project directory](#2-move-into-the-project-directory)
  - [3. Start the web server for both Gatsby site and Sanity Studio](#3-start-the-web-server-for-both-gatsby-site-and-sanity-studio)
  - [4. Play around with the Studio](#4-play-around-with-the-studio)
  - [5. Deploy your site](#5-deploy-your-site)
  - [6. Add your production site as a trusted origin to Sanity](#6-add-your-production-site-as-a-trusted-origin-to-sanity)
  - [7. Create a deployment hook to re-deploy the site when content changes](#7-create-a-deployment-hook-to-re-deploy-the-site-when-content-changes)
- [Contributors](#contributors)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What's Included?

- ⚡️ [GatsbyJS](https://gatsbyjs.org) for blazing-fast static site generation
- 📚 [Sanity CMS](https://theme-ui.com) for a Structured Content CMS on top of modern technologies
- 🚀 [ZEIT Now](https://zeit.co) for a powerful CDN built for the JAMstack with support for [Serverless Functions](https://zeit.co/docs/v2/serverless-functions/introduction/)
- 🎨 [Theme UI](https://theme-ui.com) for a constraint-based design system
- 🏎 [gatsby-plugin-offline](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/) to offer your users an always available experience

## Requirements

In order to run this starter without running into any issues you need:

- [Git](https://git-scm.com)
- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com) [1]
- A [Sanity account](https://sanity.io) [2]
- A [ZEIT account](https://zeit.co) [3]

> [1] Since this is a monorepo, all dependencies should be installed using Yarn.

> [2] The setup script asks to login to Sanity

> [3] The setup script asks to login to ZEIT

## Getting started

### 1. Create a new Gatsby project and use this repo URL as the template

```sh
npx gatsby new my-awesome-blog https://github.com/iamkevinwolf/gatsby-sanity-now-starter
```

### 2. Move into the project directory

```sh
cd my-awesome-blog
```

### 3. Start the web server for both Gatsby site and Sanity Studio

```sh
yarn start
```

- Navigate to http://localhost:3000 to preview the Gatsby site
- Navigate to http://localhost:3333 to modify your content

### 4. Play around with the Studio

Try changing the site settings or adding new posts, click `Publish` and view your changes in real-time.

> If you want a more detailed guide on how to create new schemas, check at your local readme file, this had been replaced in order to show information relevant to your project.

### 5. Deploy your site

```sh
yarn deploy
```

- Navigate to https://your-site-url.now.sh to see the production website
- Navigate to https://your-site-url.now.sh/studio to edit your site content through a self-hosted Sanity Studio [1]

> [1] If you go to this URL just after finish the deploy, you will receive an origin error. This is because you still need to add your production site as a trusted origin to Sanity.

### 6. Add your production site as a trusted origin to Sanity

1. Go to [Sanity Manage](https://manage.sanity.io) and select your newly created project
2. Navigate to Settings > API
3. Click on `ADD NEW ORIGIN`
4. Enter your now.sh project url and toggle on the `Allow credentials` switch
5. Click on `ADD NEW ORIGIN`

### 7. Create a deployment hook to re-deploy the site when content changes

Since static sites don't tend to be fetching any server to get the content, you need to re-build it everytime you change your data in Sanity. This process can be tedious, so you can enable a Deploy Hook on ZEIT that can be called from anywhere to trigger a deploy of your site.

1. If you haven't already, push your site to GitHub
2. Go to your [ZEIT dashboard](https://zeit.co/dashboard) and select your project
3. If you haven't already, link your project with the GitHub repo by clicking the `Edit` link under the project name
4. Navigate to the `Settings` tab on the navigation bar above your project title
5. Enter the hook name (i.e. `Sanity Trigger`), select the branch you want to get built when Sanity content changes and click `Create Hook`
6. Copy the Deploy Hook url
7. Go to [Sanity Manage](https://manage.sanity.io) and select your project
8. Navigate to Settings > API
9. Click on `ADD NEW WEBHOOK`
10. Add a name to the webhook (i.e. `ZEIT Deployment`), paste the ZEIT Deploy Hook url and select the dataset you want to trigger that change
11. Click `ADD NEW WEBHOOK`

## Contributors

## Contributing

If you have any question, suggestion or recommendation, please [open an issue](issues/new) about it.

If you decided you want to introduce something to the project, please read [contribution guidelines](./CONTRIBUTING.md) first.

## License

[MIT](/LICENSE)
