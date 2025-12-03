# Deployment Guide

This project is configured to deploy to [GitHub Pages](https://pages.github.com/).

## Prerequisites

- Node.js installed
- Git installed and authenticated
- Repository pushed to GitHub

## Configuration

The following configurations have already been set up:

1.  **`vite.config.ts`**: `base` is set to `/impress-gf/` to handle the subdirectory path on GitHub Pages.
2.  **`package.json`**:
    - `homepage`: Set to your GitHub Pages URL.
    - `scripts`:
        - `predeploy`: Runs `npm run build` automatically before deployment.
        - `deploy`: Runs `gh-pages -d dist` to push the build folder to the `gh-pages` branch.

## How to Deploy

To deploy the latest version of your application, run:

```bash
npm run deploy
```

This command will:
1.  Build the project (using `vite build`).
2.  Push the contents of the `dist` folder to the `gh-pages` branch on GitHub.

## GitHub Settings

Ensure your GitHub repository is configured to serve from the `gh-pages` branch:
1.  Go to **Settings** > **Pages**.
2.  Under **Source**, select **Deploy from a branch**.
3.  Select **gh-pages** as the branch and **/(root)** as the folder.
4.  Click **Save**.
