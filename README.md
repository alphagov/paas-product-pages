# GOV.UK PaaS Product Pages

This is the source for the PaaS product page at [www.cloud.service.gov.uk/](https://www.cloud.service.gov.uk/)

It is a [Next.js](https://nextjs.org/) app with static site export, utilising the [GOV.UK Design system](https://design-system.service.gov.uk/) styles.

## Local development
First install the dependencies

```bash
npm install
```

Then run the development server

```bash
npm run local
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Page content is written in Markdown and is located in `pages/content/<filename>.mdx`. 
The page auto-updates as you edit the file.

## Review static build (production build)
For production deployment we build all pages as static pages.
To review the build locally:

- build the site (`npm run build`)
- `cd` into `out` folder and serve the page (`npx serve`)
- check pages on `localhost:xxxx` (port in output of `npx serve` command).

## Deployment to production

The docs are hosted on GitHub Pages which is deployed using GitHub actions. GitHub pages is configured with a custom sub-domain at [www.cloud.service.gov.uk](https://www.cloud.service.gov.uk/).

On merge to main the deploy process first runs `npm run build` which generates an `out` directory consisting of static files for our site.

Next the [upload-pages-artifact](https://github.com/actions/upload-pages-artifact) action takes the `build` directory and turns it into
a [gzip archive](https://en.wikipedia.org/wiki/Gzip) called `github-pages` which the [deploy-pages](https://github.com/actions/deploy-pages) action uses to deploy to GitHub pages.


