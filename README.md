# VerifyAI — static website

This repository contains a small static website for VerifyAI, a company that uses custom compilers and LLMs to formally verify code.

Files created
- `index.html` — main site page
- `styles.css` — site styles
- `assets/logo.svg` — simple svg logo
- `.nojekyll` — prevent GitHub Pages from running Jekyll

Now converted to an Eleventy (Markdown-driven) site. New structure:

- `package.json` — npm scripts and Eleventy dependency
- `src/` — markdown and Eleventy templates
- `assets/` — images and css (copied through to the built site)
- `_site/` — (generated) output directory created by Eleventy
- `.github/workflows/gh-pages.yml` — GitHub Actions workflow that builds and deploys to `gh-pages`

Preview locally

Option A — develop locally using Eleventy (recommended):

1. Install dependencies and run Eleventy:

```bash
cd website
npm ci
npm start
# then open http://localhost:8080 (Eleventy will log the local server URL)
```

Option B — quick static preview using Python (for already-built site):

```bash
# build first
npm run build
python3 -m http.server 8000
# then open http://localhost:8000
```

Deploy to GitHub Pages

Option A — GitHub Pages (recommended, simple):

1. Push this repository to GitHub.
2. In your repository settings > Pages, set the source to branch `main` and folder `/ (root)`.
3. Save. GitHub will publish the site at `https://<your-org-or-username>.github.io/<repo>/`.

Option B — GitHub Actions (automated deploy to `gh-pages`):

If you'd like, I can add a GitHub Actions workflow to build and deploy automatically to the `gh-pages` branch.

Note: I've already added a workflow at `.github/workflows/gh-pages.yml`. It runs on pushes to `main`, installs Node, runs `npm run build`, then publishes the generated `_site/` folder to the `gh-pages` branch with the provided `GITHUB_TOKEN`.

Contract (what this site provides)

- Inputs: plain HTML/CSS files in repo root.
- Output: static website ready for GitHub Pages.
- Error modes: none — purely static. If images or files are missing, the browser will show broken links.

Edge cases & notes

- This is a minimal, easily extensible starting point. If you want a React/Vite site, or content in Markdown, tell me and I will scaffold it.
- If you want a contact form instead of a mailto link, we'll need a backend or a form provider (Formspree, Netlify Forms, etc.).

Next steps I can take for you

- Add a GitHub Actions workflow to publish automatically.
- Convert the site to a Markdown-driven static site (eleventy, Hugo, or Next.js) for easier content editing.
- Add analytics, a blog, or case-study pages.

Vercel notes

If you're deploying this project to Vercel and see the error "No Output Directory named 'dist' found after the Build completed", configure Vercel to use the Eleventy output directory (`_site`). I added a `vercel.json` file that configures Vercel's `@vercel/static-build` to use `_site` as the `distDir`. With this file in the repo, Vercel will run `npm run build` and deploy `_site` automatically.

If you'd rather set this in the Vercel dashboard instead of using `vercel.json`, in your project settings set the Build Command to `npm run build` and the Output Directory to `_site`.

Fixing the GitHub Actions 403 (permission denied) error

If your Actions run fails with an error like:

  remote: Permission to Verify-ai/website.git denied to github-actions[bot].

Then the workflow's token doesn't have permission to push to the repository. Common fixes:

1. Enable write permissions for the GITHUB_TOKEN in repository settings:
	- Go to Settings → Actions → General → Workflow permissions.
	- Select "Read and write permissions" and save. This allows `GITHUB_TOKEN` to push branches.

2. If your repository is in an organization, ensure organization policies allow GitHub Actions to write/push. An org-level policy can block writes even when repo-level settings allow them.

3. Use a Personal Access Token (PAT) as a fallback:
	- Create a PAT (Settings → Developer settings → Personal access tokens) with `repo` scope.
	- Add it to the repository secrets (e.g., `GH_PAGES_PAT`).
	- Edit the workflow to pass it to the deploy action as `personal_token: ${{ secrets.GH_PAGES_PAT }}`.

I updated the workflow to request `contents: write` permission. If you still see the 403, follow steps 1 or 3 above and re-run the workflow.
