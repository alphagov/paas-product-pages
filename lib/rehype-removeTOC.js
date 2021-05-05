/* eslint-disable no-var, prefer-const */
const visit = require('unist-util-visit')
const remove = require('unist-util-remove');
const babelPluginExtractFrontmatter = require('next-mdx-enhanced/babel-plugin-extract-frontmatter');

module.exports = removeTocFromCertainPages

function removeTocFromCertainPages() {
  return removeTOC
}

function removeTOC(tree) {
  const excludedPagesArray = ['index.mdx', '404.mdx','cookies.mdx', 'sign-in.mdx']
  let excludePage = tree.children.find( o => {
    return o.type === 'export' && excludedPagesArray.some(v => o.value.includes(v));
  });
  if (excludePage) {
    visit(tree, 'element', function (node) {
      if (node.tagName === 'nav') {
          remove(tree, node)
      }
    })
  }
}
