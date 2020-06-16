const withMdxEnhanced = require('next-mdx-enhanced')
const rehypeSlug = require('rehype-slug')
const rehypeAutolinkHeadings = require('rehype-autolink-headings')

module.exports = withMdxEnhanced({
  layoutPath: 'src/layouts/Content/',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [],
  rehypePlugins: [
    rehypeSlug,
    rehypeAutolinkHeadings
  ],
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => {},
    phase: 'prebuild|loader|both',
  },
})({
  exportTrailingSlash: true
})
