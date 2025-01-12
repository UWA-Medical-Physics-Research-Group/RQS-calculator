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

### 1. **Switch to the Project Directory**

Navigate to the `rqsplus` directory:

```bash
cd /path/to/rqsplus
```

### 2. **Install Dependencies**

Install the required dependencies by running:

```bash
npm install
```

### 3. **Make Changes on the `main` Branch**

1. Ensure you are on the `main` branch:

   ```bash
   git checkout main
   ```

2. Make your changes to the source code (e.g., edit `App.jsx`, styles, etc.).

3. Test the application locally to confirm the changes:

   ```bash
   npm start
   ```

   Visit `http://localhost:3000` in your browser to verify that everything works as expected.

---

### 4. **Build the Project**

Once you’re satisfied with the changes, build the production-ready version of the website:

```bash
npm run build
```

This will create a `build/` directory containing the optimised static files (e.g., `index.html`, CSS, JS).

---

### 5. **Deploy to GitHub Pages**

#### **Option 1: Deploy Directly to `gh-pages`**

1. Switch to the `gh-pages` branch:

   ```bash
   git checkout gh-pages
   ```

2. Remove all files in the branch:

   ```bash
   rm -rf *
   ```

3. Copy only the contents of the `build/` directory to the root of the branch:

   ```bash
   cp -r build/* .
   ```

   Make sure you do not include the `build` folder itself, only its contents.

4. Commit and push the changes:
   ```bash
   git add .
   git commit -m "Deploy updated site"
   git push origin gh-pages
   ```

#### **Option 2: Deploy to a Temporary Branch (For Testing)**

If you want to test the changes before deploying them to `gh-pages`:

1. Create and switch to a new temporary branch:

   ```bash
   git checkout -b gh-pages-temp
   ```

2. Remove all files in the branch:

   ```bash
   rm -rf *
   ```

3. Copy the contents of the `build/` directory to the root:

   ```bash
   cp -r build/* .
   ```

4. Commit and push the changes:

   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin gh-pages-temp
   ```

5. Go to the repository’s **Settings** → **Pages**, and set the source to `gh-pages-temp`.

6. Wait a few minutes and test the deployment at your GitHub Pages URL:

   ```
   https://<your-username>.github.io/<repository-name>/
   ```

7. If satisfied, merge `gh-pages-temp` into `gh-pages` or rename it:

   ```bash
   git checkout gh-pages
   git merge gh-pages-temp
   git push origin gh-pages
   ```

8. Delete the temporary branch:
   ```bash
   git branch -D gh-pages-temp
   git push origin --delete gh-pages-temp
   ```

---

### 6. **Final Verification**

Visit your GitHub Pages URL to confirm the website is working as expected:

```
https://<your-username>.github.io/<repository-name>/
```

---

### Notes

- Always test your changes locally (`npm start`) before building and deploying.
- Ensure you commit all changes before switching branches.
- Use a temporary branch for testing if you’re unsure about the deployment.

---

If you have any issues, feel free to reach out for assistance!
