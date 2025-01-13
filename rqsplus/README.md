# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# How to Deploy the Website to GitHub Pages

This guide outlines the steps to make changes, build the website, and deploy it to GitHub Pages.

---

## Prerequisites

- Node.js and npm installed on your machine.
- A working local copy of the repository.
- Access to the GitHub repository settings.

---

## Workflow

### 1. **Make Changes on the `main` Branch**

1. Ensure you are on the `main` branch:

   ```bash
   git checkout main
   ```

2. Make your changes to the source code (e.g., `App.jsx`, CSS, etc.).

3. Test your changes locally to confirm everything works as expected:

   ```bash
   npm start
   ```

   - Open `http://localhost:3000` in your browser to verify.

---

### 2. **Deploy the Changes to GitHub Pages**

1. Deploy your changes by running:

   ```bash
   npm run deploy
   ```

2. What happens:
   - The **`predeploy`** script (`npm run build`) creates a production-ready version of your app in the `build/` directory.
   - The **`deploy`** script (`gh-pages -d build`) publishes the `build/` directory to the `gh-pages` branch.

---

### 3. **Verify the Deployment**

1. Wait a few moments for GitHub Pages to process the changes.
2. Visit your GitHub Pages URL to see the live changes:
   ```
   https://uwa-medical-physics-research-group.github.io/RQS-calculator/
   ```

---

### Troubleshooting Tips

- **Custom Domain**: If you’re using a custom domain, ensure the `CNAME` file in the `build/` directory is correctly configured before deployment.
- **Changes Not Reflecting**: Clear your browser cache or use an incognito window to ensure you’re seeing the latest version.

---

### Summary

To make your changes live:

1. Make changes on the `main` branch.
2. Test locally using `npm start`.
3. Deploy using:
   ```bash
   npm run deploy
   ```
4. Verify the changes on your GitHub Pages URL.

---

If you have any issues, feel free to reach out for assistance!
