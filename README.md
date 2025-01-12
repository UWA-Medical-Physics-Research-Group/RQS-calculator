# RQS-calculator

## Website
[https://uwa-medical-physics-research-group.github.io/RQS-calculator/](https://uwa-medical-physics-research-group.github.io/RQS-calculator/)


### Installations

`npm`
`node.js`

### Run Locally

`npm start`

### Edits to implement:

- [ ] Edit "clear all" button to come up with a pop up saying "are you sure?"
- [ ] improve styling
- [ ] some of the columns are aligned weirdly. Need to fix that
- [x] link to nathaniels paper
- [ ] metrics (how many times this page has been used, where in the world)
- [ ] issue with long paper names. Text doesnt wrap and instead makes the column width huge. Need to fix
- [ ] add med phys logo, catcr logo
- [x] click on text to check checkbox
- [x] add description for each question. Can maybe hover over a '?' or just include a description below
- [x] export as csv functionality
- [x] concepted by... created by...
- [x] link to original article
- [x] get everything to start on "no" being selected
- [X] freeze first col and header
- [X] change headers on csv to something more readable
- [x] there is a vertical space issue. When vertical space is small, header and top of table gets cut off
- [x] put lowest score at top of dropdown
- [x]  add implemented after yes and no text in feature reduction section
- [x]  add year of paper
- [x]  change paper name → first author
- [x]  make “none” uppercase
- [x]  match text to table in paper
- [x]  add text above the paper saying "Original Publication"

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
  
     If this doesn't work, run `npm install` and try again

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
   https://<your-username>.github.io/<repository-name>/
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

