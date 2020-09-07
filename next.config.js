const withMdxEnhanced = require('next-mdx-enhanced')
const rehypeSlug = require('rehype-slug')
const toc = require("@jsdevtools/rehype-toc");
const removeTOC = require("./lib/rehype-removeTOC");

module.exports = withMdxEnhanced({
  layoutPath: 'layouts/Content/',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [],
  rehypePlugins: [
    rehypeSlug,
    [toc,{
      headings: ["h2", "h3", "h4"],  
      cssClasses: {
        toc: "app-toc",
        list: "app-toc__list",
        listItem: "app-toc__list-item",
        link: "app-toc__link",
      },
      customizeTOC: function(toc) {
        if (toc.type === 'element' && toc.tagName === 'nav') {
          toc.properties.role = 'navigation';
          toc.properties['aria-label'] = 'Sections on this page';
        }
        if (toc.children[0].children.length === 0) {
          return false
        } else {
          toc.children.unshift({
            type: 'element',
            tagName: 'h2',
            children: [
              {
                "type": "text",
                "value": "Contents"
              }
            ],
            properties: {
              className: 'app-toc__heading'
            }
          })
          return toc
        }
      }
    }],
    removeTOC
  ],
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => {},
    phase: 'prebuild|loader|both',
  },
})({
  exportTrailingSlash: true
})
