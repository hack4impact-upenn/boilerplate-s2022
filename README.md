# Boilerplate

This is a simple boilerplate designed to serve as robust template for quickly starting development on a [Typescript](https://www.typescriptlang.org) based [MERN](https://www.mongodb.com/mern-stack) web application.

## Features

- Session based authentication with [Passport](https://www.passportjs.org)
- Emailing for account verification and resetting password with [SendGrid](https://sendgrid.com)
- Admin functionality for viewing/deleting/promoting other users
- Clean authentication pages built with [Material UI](https://mui.com)
- In memory database testing with [Jest](https://jestjs.io) and [Supertest](https://www.npmjs.com/package/supertest)
- [AirBnb Typescript styling](https://github.com/airbnb/javascript) with [Prettier](https://prettier.io) and [ESLint](https://eslint.org)
- [Husky](https://typicode.github.io/husky/#/) and [lint-staged](https://github.com/okonet/lint-staged) for checking linting on commits
- [GitHub Actions](https://docs.github.com/en/actions) for ensuring linting + tests pass on pushes

## Required tools

These are necessary to build and run the project at full functionality

- Install [Yarn Package Manager](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- Install [NodeJS](https://nodejs.org/en/download/)

## Recommended tools

To take full advantage of the linting/formatting, we recommend adding the [Prettier](https://prettier.io) and [ESLint](https://eslint.org) VSCode extensions and configuring them as shown [here](https://levelup.gitconnected.com/setting-up-eslint-with-prettier-typescript-and-visual-studio-code-d113bbec9857#:~:text=Install%20the%20following%20Visual%20Studio%20Code%20extensions) for code highlighting and formatting on save. Skip to the section labeled "Add the following to your VS Code settings.json". To access your settings.json, follow what is linked [here](https://stackoverflow.com/questions/65908987/how-can-i-open-visual-studio-codes-settings-json-file). See [here](https://blog.logrocket.com/using-prettier-eslint-automate-formatting-fixing-javascript/#differences-between-eslint-prettier) for the differences between the two tools and how they work together.

Finally, we also recommend downloading the [Live Share](https://visualstudio.microsoft.com/services/live-share/) extension by Microsoft for improved Collaboration. This allows for easy peer programming on one shared repository instance.

## Setup

### MongoDB

The boilerplate uses [MongoDB](https://www.mongodb.com) as the database to store information for authentication. To have this available for use, do the following

- Create a [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas/register)
- Create a [database deployment](https://www.mongodb.com/docs/atlas/create-connect-deployments/) (This should be done by your PM/TL)
- Get the database connection URI (Get from your PM/TL and add to .env)

Recommend downloading [MongoDB Compass](https://www.mongodb.com/docs/compass/current/) for easy viewing and management of data.

### SendGrid

The boilerplate uses [SendGrid](https://sendgrid.com) to send emails to users in order to verify their account, and also to reset their passwords. To have email functionality available for use, the PM/TL should do the following

- Create a SendGrid Account
- Register a [Sender Identity](https://docs.sendgrid.com/for-developers/sending-email/sender-identity) (Single Sender recommended for most)
- Create an [API Key](https://docs.sendgrid.com/ui/account-and-settings/api-keys#creating-an-api-key)

### Mixpanel

[Mixpanel](https://mixpanel.com) is an analytics tool that helps us collect data on how users use our applications.
To set up Mixpanel:

- Create a Mixpanel account
- Create a project (there may be one created by default)
- Go to Settings (top-right) > Project Settings
- Look for "Project Token"

### Environment Variables

Create a file named `.env` in the root of the `server` folder and add the following variables with the appropriate values. PM/TLs should provide this to their developers.

```
ATLAS_URI=mongodb-connection-uri-from-above
COOKIE_SECRET=any-string
SENDGRID_API_KEY=sendgrid-api-key-from-above
SENDGRID_EMAIL_ADDRESS=sendgrid-sender-identity-email-from-above
MIXPANEL_TOKEN=mixpanel-token-from-above
```

## Usage

NOTE: Currently, this project is best supported by running CLI commands from a bash/zsh environment. If using Windows, this can be achieved by following what's done [here](https://stackoverflow.com/questions/42606837/how-do-i-use-bash-on-windows-from-the-visual-studio-code-integrated-terminal).

### Installing dependencies

From the root folder, run the following to configure the project and its dependencies

```
$ yarn setup
```

If there is any need to reset the dependencies, simply run the following series of commands

```
$ yarn clean
$ yarn setup
```

### Running the project

To run the project, use the following commands from the root folder

```
# run both server and client
$ yarn dev
# run server only
$ yarn server
# run client only
$ yarn client
```

### Running tests

To run all the tests in the project, run the following from the root folder

```
$ yarn test
```

### Running linting/formatting

To check for linting issues from ESLint and fix what's possible, from the root folder run the following

```
$ yarn lint
```

To format the code appropriately with Prettier (don't need this if format on save was setup in VSCode), from the root folder run the following

```
$ yarn format
```

## Deployment (WIP)

The boilerplate is designed to be easily deployed on [AWS ECS](https://aws.amazon.com/ecs/) using [Terraform](https://www.terraform.io).

You will need to [install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) first. For Mac users, we recommend following the Homebrew installation.

You will then need to create a file called `.auto.tfvars`, and you can follow the format as in the `.auto.tfvars.example` file. Variables in here correspond to the same environment variables in the `server` folder, except for `aws_account_id` which is the account ID for your AWS account (can be found by clicking your username in the top-right of the AWS console).

To deploy, run

```
./deploy.sh
```

To tear down all infrastructure, run

```
terraform destroy
```

Due to the new (as of early 2024) nature of this AWS configuration, if you are encountering issues with deploying the project on AWS, then please use the old boilerplate and deploy on Heroku or another cloud platform as we have done in the past.

## Setting Up Datadog

Datadog allows for post-deployment logs and traces. Here is a guide to set it up.

1. Create a Datadog account.

2. Add environment variables to the env file.

```
DD_AGENT_MAJOR_VERSION=7
DD_API_KEY=<key>
DD_SITE="us5.datadoghq.com"
DD_ENV=<project_name>
DD_LOGS_INJECTION=true
DD_TRACE_AGENT_URL=http://localhost:4000
```

In Datadog Agent, search “API Keys” and generate a New Key. Use the key to paste into <key>
Name your DD_ENV in <project_name>. This will be useful when querying logs.

3. If not already installed, install the following dependencies.

```
npm install --save dd-trace
npm install winston
```

4. The configDatadog.ts file exports three variables: `logger_info`, `logger_warn `, and `logger_error`. These variables represent different log statuses. Simply add one of these log variables within each function in the format below.

```
logger_info.log('Account Verified');
logger_warn.warn('Logger Initialized');
logger_error.error('Logout');
```

Some examples are shown in login() and logout() functions in auth.controller.ts.

5. Access "Logs" in Datadog Agent and search "env:<project_name>" to find the logs and their timeline.

## Common Problems

Fill in with problem scenario + solution as they arise

### Incorrect Node Version

If you see an error message similar to this one:

```
The engine "node" is incompatible with this module. Expected version ">=12.0.0". Got "11.15.0"
```

This means you are using the wrong node version. This boilerplate relies on using node version 14.8. If you are using any other version of node, please use `nvm` to set node version to `14.8.3` as referenced [here](https://blog.logrocket.com/how-switch-node-js-versions-nvm/).
