# PROJECT_NAME

_✨ This project was scaffolded with [Gatsby+Sanity+Now Starter](https://github.com/iamkevinwolf/gatsby-sanity-now-starter)_

## Getting started

1. Clone this repo
2. `cd` into the repo folder
3. `yarn install`
4. `yarn start`
5. Navigate to http://localhost:3000 to preview your Gatsby application.
6. Navigate to http://localhost:3333 to open Sanity Studio.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Creating new Sanity Documents](#creating-new-sanity-documents)
  - [Documents and Document Collections](#documents-and-document-collections)
    - [Creating a Document Collection](#creating-a-document-collection)
    - [Importing the Document Collection into Sanity](#importing-the-document-collection-into-sanity)
    - [Creating a Document](#creating-a-document)
    - [Importing the Document into Sanity](#importing-the-document-into-sanity)
    - [Adding the Document to the Studio sidebar](#adding-the-document-to-the-studio-sidebar)
  - [⚠️ Deploying the GraphQL Endpoint and restarting the server](#-deploying-the-graphql-endpoint-and-restarting-the-server)
- [Available scripts](#available-scripts)
  - [Global](#global)
    - [`yarn start`](#yarn-start)
    - [`yarn deploy`](#yarn-deploy)
    - [`yarn validate`](#yarn-validate)
    - [`yarn studio <cmd>`](#yarn-studio-cmd)
    - [`yarn web <cmd>`](#yarn-web-cmd)
    - [`yarn api <cmd>`](#yarn-api-cmd)
  - [Studio](#studio)
    - [`yarn studio lint`](#yarn-studio-lint)
    - [`yarn studio test`](#yarn-studio-test)
    - [`yarn studio validate`](#yarn-studio-validate)
    - [`yarn studio now-dev`](#yarn-studio-now-dev)
    - [`yarn studio now-build`](#yarn-studio-now-build)
    - [`yarn studio deploy:graphql`](#yarn-studio-deploygraphql)
  - [Web](#web)
    - [`yarn web lint`](#yarn-web-lint)
    - [`yarn web test`](#yarn-web-test)
    - [`yarn web validate`](#yarn-web-validate)
    - [`yarn web now-dev`](#yarn-web-now-dev)
    - [`yarn web build`](#yarn-web-build)
  - [API](#api)
    - [`yarn api lint`](#yarn-api-lint)
    - [`yarn api test`](#yarn-api-test)
    - [`yarn api validate`](#yarn-api-validate)
- [Getting help](#getting-help)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Tech stack

- [Gatsby](https://www.gatsbyjs.org/): static site generator
- [Sanity](https://sanity.io): Headless CMS
- [ZEIT Now](https://zeit.co): Static hosting platform with support for [Serverless Functions](https://zeit.co/docs/v2/serverless-functions/introduction/).
- [Theme UI](https://theme-ui.com/): constraint-based design system for React applications

## Project structure

This project is a monorepo powered by [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/). The three workspaces are `studio`, `web` and `api`.

- The `studio` workspace holds the Sanity Studio schemas.
- The `web` workspace holds the code for the Gatsby site.
- The `api` workspace holds the [Serverless Functions](https://zeit.co/docs/v2/serverless-functions/introduction/).

## Creating new Sanity Documents

### Documents and Document Collections

Although Sanity only supports documents, I like to call `Document` a schema that it is not intended to be repeated, for example, the Site Settings. When a `Document` needs to be repeated multiple times (i.e. a Blog Post), I like to call it a `Document Collection`.

#### Creating a Document Collection

Create a new file in `studio/schemas/collections` and name it `note.js`

```js
export const note = {
  name: "note",
  type: "document",
  title: "Note",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: Rule => Rule.required()
    },
    {
      name: "text",
      type: "text",
      title: "Text",
      validation: Rule => Rule.required()
    }
  ]
};
```

#### Importing the Document Collection into Sanity

Open `studio/schemas/schema.js` and import the newly created Document Collection

```diff
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import link from './objects/link'
import figure from './objects/figure'
import blockContent from './objects/block-content'

import * as siteSettings from './documents/site-settings'

import * as blogPost from './collections/blog-post'
+import * as note from './collections/note'

export default createSchema({
  name: 'default',
  types: [
    ...schemaTypes,

    // Global objects
    link,
    figure,
    blockContent,

    // Documents
    ...Object.values(siteSettings),

    // Collections
    ...Object.values(blogPost),
+   ...Object.values(note),
  ],
})
```

#### Creating a Document

Create a new file in `studio/schemas/documents` and name it `social-settings.js`

```js
import Icon from "react-icons/lib/fa/cog";

export const socialSettings = {
  name: "socialSettings",
  type: "document",
  icon: Icon,
  title: "Social Settings",
  __experimental_actions: ["update", "publish"],
  preview: {
    prepare: () => ({ title: "Social Settings" })
  },
  fields: [
    {
      name: "github",
      type: "string",
      title: "GitHub username",
      validation: Rule => Rule.required()
    },
    {
      name: "twitter",
      type: "string",
      title: "Twitter username",
      validation: Rule => Rule.required()
    },
    {
      name: "facebook",
      type: "string",
      title: "Facebook username",
      validation: Rule => Rule.required()
    },
    {
      name: "instagram",
      type: "string",
      title: "Instagram username",
      validation: Rule => Rule.required()
    }
  ]
};
```

#### Importing the Document into Sanity

Open `studio/schemas/schema.js` and import the newly created Document

```diff
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import link from './objects/link'
import figure from './objects/figure'
import blockContent from './objects/block-content'

import * as siteSettings from './documents/site-settings'
+import * as socialSettings from './documents/social-settings'

import * as blogPost from './collections/blog-post'
import * as note from './collections/note'

export default createSchema({
  name: 'default',
  types: [
    ...schemaTypes,

    // Global objects
    link,
    figure,
    blockContent,

    // Documents
    ...Object.values(siteSettings),
+   ...Object.values(socialSettings),

    // Collections
    ...Object.values(blogPost),
    ...Object.values(note),
  ],
})
```

#### Adding the Document to the Studio sidebar

Open `studio/sidebar.js` and add the newly created Document to the singletons array.

```diff
const singletons = [
  {
    title: 'Site Settings',
    document: 'siteSettings',
  },
+ {
+   title: 'Social Settings',
+   document: 'socialSettings',
+ },
]
```

Note: This only needs to be done for **Documents**. Document Collections gets added automatically to the sidebar.

### ⚠️ Deploying the GraphQL Endpoint and restarting the server

In order to Gatsby to pick up the schema changes, you need to stop any `yarn start` process running, then run `yarn studio deploy:graphql` and `yarn start` again.

## Available scripts

### Global

#### `yarn start`

Concurrently starts a web server for the `web` and `studio` workspaces.

#### `yarn deploy`

Deploys the application to ZEIT Now.

#### `yarn validate`

Validates the linting for all the workspaces.

#### `yarn studio <cmd>`

Runs an arbitrary script on the `studio` workspace (for available scripts, check the [studio workspace scripts](#studio)).

#### `yarn web <cmd>`

Runs an arbitrary script on the `web` workspace (for available scripts, check the [web workspace scripts](#web)).

#### `yarn api <cmd>`

Runs an arbitrary script on the `api` workspace (for available scripts, check the [api workspace scripts](#api)).

### Studio

#### `yarn studio lint`

Runs eslint.

#### `yarn studio test`

Runs a Sanity check to ensure the schema is correct.

#### `yarn studio validate`

Runs `yarn studio lint` and `yarn studio test`

#### `yarn studio now-dev`

Instructs Now how to start the Studio in development mode.

#### `yarn studio now-build`

Instructs Now how to build the Studio configuration into a static bundle to be deployed under `/studio` endpoint.

#### `yarn studio deploy:graphql`

Deploys the Studio GraphQL endpoint. (⚠️ **This needs to be run after every schema change to update the schema in Gatsby**)

### Web

#### `yarn web lint`

Runs eslint.

#### `yarn web test`

Runs unit tests on the Gatsby application (initially disabled).

#### `yarn web validate`

Runs `yarn web lint` and `yarn web test`.

#### `yarn web now-dev`

Instructs Now how to start the Gatsby site in development mode.

#### `yarn web build`

Intructs Now how to build the Gatsby site for production.

### API

#### `yarn api lint`

Runs eslint.

#### `yarn api test`

Runs unit tests on the Gatsby application (initially disabled).

#### `yarn api validate`

Runs tests against the serverless functions (initially disabled).

## Getting help

If you run into any issue, please [open an issue](https://github.com/iamkevinwolf/gatsby-sanity-now-starter/issues/new) on the starter repo.

## License

[MIT](/LICENSE)
