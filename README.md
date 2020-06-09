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
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Page content is written in Markdown and is located in `pages/**/<filename>.mdx`. 
The page auto-updates as you edit the file.

## Preview

This repo is published to https://paas-product-pages.cloudapps.digital/ by [this pipeline](https://github.com/alphagov/paas-release-ci/blob/master/pipelines/plain_pipelines/paas-product-pages.yml)


