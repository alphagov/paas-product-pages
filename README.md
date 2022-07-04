# GOV.UK PaaS Product Pages

This is the source for the PaaS product page at https://www.cloud.service.gov.uk/

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

To test the nginx configuration locally (requires docker)

```bash
npm run nginx:local # site available on http://localhost:8080
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Page content is written in Markdown and is located in `pages/content/<filename>.mdx`. 
The page auto-updates as you edit the file.

## Review static build (production build)
For production deployment we build all pages as static pages.
To review the build is good

- build the site (`npm run build`)
- `cd` into `out` folder and serve the page (`npx serve`)
- check pages on `localhost:xxxx` (port in output of `npx serve` command).

## Deployment to production

On merge to `main` branch, [paas-release-ci pipeline](https://github.com/alphagov/paas-release-ci/blob/main/pipelines/plain_pipelines/paas-product-pages.yml) is triggered, which deploys to production.


