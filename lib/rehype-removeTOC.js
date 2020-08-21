const visit = require('unist-util-visit')
const remove = require('unist-util-remove')

module.exports = removeTocFromCertainPages

function removeTocFromCertainPages() {
  return removeTOC
}

function removeTOC(tree) {
  let pageDetails = tree.children.find(o => o.default === true);
  let isHomePage = pageDetails.value.includes("layout: 'Homepage'");
  let isSignInPage = pageDetails.value.includes("__resourcePath: 'sign-in.mdx'");
  let is404Page = pageDetails.value.includes("__resourcePath: '404.mdx'");
  let cookiesPage = pageDetails.value.includes("__resourcePath: 'cookies.mdx'");
  if (isHomePage || isSignInPage || is404Page || cookiesPage) {
    visit(tree, 'element', function (node) {
      if (node.tagName === 'nav') {
          remove(tree, node)
      }
    })
  }
}
