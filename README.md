# PetKennect Operations Web
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## [Development Workflow](https://github.com/ias-custom/petkennect-operations-backend/blob/master/dev-worklow.md)

## Dependencies:

#### Common
1. axios
2. extensible duck
3. immer
1. node-sass
4. react
4. react-dom
10. react-redux
5. react-router-dom
6. react-spring
5. connected-react-router
11. redux
12. redux-form
13. redux-saga
12. semantic-ui-react
15. yup
4. @loadable/component

#### Development
1. axios-debug-log
1. customize-cra
2. redux-logger
3. react-app-rewired
5. jest

## Development

- `git clone REPOSITORY_LINK` # Clone the repository
- `cd petkennect-operations-web`
- `cp .env.example .env` # Copy the enviroment file and put values for development 
- `yarn` or `npm install` # Install dependencies, We recommend working with yarn
- `yarn start` or `DEBUG=axios yarn start` # Run the app in dev mode

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
