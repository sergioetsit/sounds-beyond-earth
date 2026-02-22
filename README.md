# Sounds Beyond Earth - Landing Page

Standalone static landing page for the S&oacute;nar+D application **Sounds Beyond Earth**.

This repository is intentionally limited to a one-page site for GitHub Pages and does **not** include the React/WebAudio installation app code.

## Project structure

```
/
  index.html
  styles.css
  script.js
  .nojekyll
  README.md
  assets/
    img/
      hero.jpg
      gallery1.jpg
      gallery2.jpg
    docs/
      Sounds_Beyond_Earth_Dossier.pdf
```

## Local preview

Open `index.html` directly in your browser, or serve the folder with any static server.

## Replace assets (images + dossier)

1. Replace `assets/img/hero.jpg` (hero background + media image).
2. Replace `assets/img/gallery1.jpg` and `assets/img/gallery2.jpg` (media gallery).
3. Replace `assets/docs/Sounds_Beyond_Earth_Dossier.pdf` (CTA download target).

If any image is missing, the page keeps a styled placeholder and shows a small note such as `Add assets/img/hero.jpg`.

## Configure project URL + social/contact info

Update these values in `/index.html`:

1. Canonical URL and OpenGraph URL:
   - `<link rel="canonical" href="...">`
   - `<meta property="og:url" content="...">`
2. Contact section:
   - Email link in the `#contact` section.
   - Social links in the `#contact` section.
3. Optional branding metadata:
   - `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">`.

## Enable GitHub Pages (main branch root)

1. Push this repository to GitHub (suggested repo name: `sounds-beyond-earth`, public).
2. On GitHub, open **Settings**.
3. Open **Pages** in the sidebar.
4. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
5. Click **Save**.
6. Wait for deployment to finish, then open the published URL shown on the Pages screen.

`index.html` is already at repository root, and `.nojekyll` is included to bypass Jekyll processing.

## Optional: add video later (without storing video files in repo)

When ready, replace the "Video coming soon" panel in `/index.html` with an embed iframe from YouTube or Vimeo.

Example (YouTube):

```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Sounds Beyond Earth walkthrough"
  loading="lazy"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe>
```

Keep video files hosted externally (YouTube/Vimeo) so this repo remains lightweight.
