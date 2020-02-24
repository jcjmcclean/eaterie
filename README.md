# Eaterie

This is a (partial) homepage for a restaurant website.

This project was created from scratch (no boilerplate/bootstrapping). It uses gulp to prepare source and static files for build/deployment.

## Hosted version

You can view the website live here: [https://eaterie.jcjm.co.uk/](https://eaterie.jcjm.co.uk/)

## Build instructions

To build this project for production, install project dependencies with `npm install` then run `npm run build` from the project root in your terminal.

After running the build script, you can find files for deployment in the `dist` directory.

## Development instructions

To host a local copy of this project for development, install project dependencies with `npm install` then run `npm start` from the project root in your terminal.

Open [http://localhost:8080](http://localhost:8080) to view it in the browser. The browser will reload for all changes to the codebase (using browsersync).

## Deployment instructions

This project's master branch is hooked up to Netlify, deployments are automatically created when committing to master.

If you wish to manually deploy the project elsewhere, follow the build instructions above and deploy the contents of the `dist` directory.
