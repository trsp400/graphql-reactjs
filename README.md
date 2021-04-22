# Challenge

This repository is a challenge that consists in a simple web app that uses graphql to fetch data from SpaceX API.

## How to run

Steps:

1. run `yarn` to install the dependencies
2. Run `yarn start` to run the app

#### Ta-Da!

- The app is up and running on http://localhost:3000

## Deploy

1.Every time a push on any branch is made, vercel deploys on a new URL,
but for you to get this brand new URL(it is equivalent to homologation environment), you need to create a pull request to branch `develop`.
So after the pull request is merged, vercel bot comments on it, adding the new URL.
2.After being merged into master, the project will run on -> https://graphql-react-app.vercel.app/

## Done tasks

1. List, filter, and search Past Launches and New Launches
2. List, filter, and search Rockets
3. Create, Delete, List, filter, and search Launches
4. Distinguish New Launches from PastLaunches on Launches list -> https://ibb.co/ZzN9zTF
5. Code pattern set up with `eslint, prettier and editorconfig`
6. Publish project to an URL
7. Automatic deploy do homologation(or preview) on any branch that is not `master`
8. Automatic deploy to production and pushing to master. URL: https://graphql-react-app.vercel.app/

## Not done tasks

1. Create scripts to run the tests
2. Implement tests with the @testing/library
3. Form validation
4. User feedback
5. internacionalization
6. Responsiveness on mobile phones
