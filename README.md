# Developer Portfolio

A single-page, monochrome editorial portfolio built with semantic HTML5, CSS3, and vanilla JavaScript. No frameworks, no backend.

## Features
Timed intro cover, smooth-scrolling navigation with active highlighting, mobile menu, dark/light theme (saved in `localStorage`), skills grid, education timeline, interactive project details, and a `mailto:` contact section.

## Structure
```
portfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── portfolio-intro.gif   <- intro cover (included)
│   ├── computer.jpg          <- hero illustration (included)
│   ├── profile.jpg           <- your photo
│   └── resume.pdf            <- your resume
└── README.md
```
Create the `assets` folder and add the three files with exactly these names. If the intro image is missing, a typographic cover is shown instead.

## Replace these placeholders
- `[YOUR NAME]` in `index.html` (title, logo, hero, footer, alt text) and `script.js`
- `your.email@example.com` (contact section, footer, `mailto:` links)
- LinkedIn and GitHub URLs in the footer
- About text and education entries in `index.html`
- Skill lists in `index.html`
- Project data in the `projects` array at the top of `script.js`. Add a new object to add a new project. Keep only features and technologies you actually built.

## Run locally
Open `index.html` in a browser, or run `npx serve` / VS Code Live Server in the folder.

## Deploy
**GitHub Pages:** push to a repository, then Settings → Pages → deploy from branch `main`, folder `/ (root)`.
**Netlify:** drag the folder onto app.netlify.com/drop, or connect the repository (no build command, publish directory `.`).
**Vercel:** import the repository, framework preset "Other", no build command.

## Submission checklist
Live site URL, public GitHub repository with this README, real resume and photo added.
