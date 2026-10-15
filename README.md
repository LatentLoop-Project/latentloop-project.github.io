# LatentLoop project page

A standalone, responsive project page for **LatentLoop: Scaling Looped MoE Models with Asymmetric Compute Allocation**. The site uses plain HTML, CSS, and JavaScript. No package installation or build is needed, and fonts and research figures are hosted locally.

## Local preview

From this directory, run:

    python -m http.server 8000 --bind 127.0.0.1

Then open http://127.0.0.1:8000/. When accessing a remote machine, forward port 8000 through your editor or SSH connection.

## GitHub Pages

1. Create a public repository named latentloop-project.github.io under the LatentLoop-Project organization.
2. Upload the contents of this directory to its main branch. Keep index.html at the repository root.
3. In Settings → Pages, select Deploy from a branch, then main and / (root).
4. The site will be available at https://latentloop-project.github.io/ after GitHub finishes deployment.

Public site: https://latentloop-project.github.io/

Source repository: https://github.com/LatentLoop-Project/latentloop-project.github.io

## Set the public links

Edit site-config.js to update the public links. The Code button points to https://github.com/lcqysl/LatentLoop. paperUrl points to the published paper at https://arxiv.org/abs/2610.19975. Keep the Paper links in index.html in sync so they also work without JavaScript.

## Content and assets

- index.html: title, resource links, abstract, and the figure-led research narrative.
- styles.css: responsive appearance and reduced-motion support.
- script.js: mobile navigation, reading progress, and accessible figure dialogs.
- assets/figures/: original paper figures as vector SVGs, plus their original PDFs.
- assets/downloads/latentloop-paper.pdf: local manuscript snapshot; the Paper buttons link to arXiv.
- assets/fonts/: self-hosted Inter and Space Grotesk fonts, with their OFL licenses.

Figure 2 is separated into learned residual curves and fixed coefficient heatmaps. These are followed by the architecture (Figure 3) and fitted scaling frontiers (Figure 4). All numbers are taken from the manuscript; no new results are introduced.

To update a figure, replace its SVG and PDF using the same filenames. To update the public paper link, edit site-config.js and the Paper links in index.html. No external analytics, framework, or runtime service is used.
