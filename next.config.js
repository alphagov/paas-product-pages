const withMdxEnhanced = require('next-mdx-enhanced')

module.exports = withMdxEnhanced({
  layoutPath: 'layouts/Content/',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [],
  rehypePlugins: [],
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => {},
    phase: 'prebuild|loader|both',
  },
})({
  exportTrailingSlash: true
})
