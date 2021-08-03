import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import matter from 'gray-matter'
import Button from '@components/Button'
import ContentPageLayout from '../layouts/ContentPageLayout'
import { GetStaticProps, GetStaticPaths } from 'next'

const rehypeSlug = require('rehype-slug')
const toc = require('@jsdevtools/rehype-toc')

// prevent NextJS from incluidng all their scripts
// as we're exporting these as static HTML pages
export const config = {
  unstable_runtimeJS: false
}

const components = {
  Button
}

const contentFilePath = path.join(process.cwd(), 'pages', 'content')
const remove_mdx = path => path.replace(/\.mdx?$/, '')
const paths_without_index = path => !path.includes('index')
const paths_object = slug => ({ params: { slug } })

export default function contentPage ({ source, frontMatter, siblings }) {
  return (
    <ContentPageLayout meta={frontMatter} siblings={siblings}>
      <MDXRemote {...source} components={components} />
    </ContentPageLayout>
  )
}

export const getStaticProps:GetStaticProps = async ({ params }) => {
  const pageFilePath = path.join(contentFilePath, `${params.slug}.mdx`)
  const source = fs.readFileSync(pageFilePath)
  const { content, data } = matter(source)
  // get all the siblings for the section and pass them to
  // the section navigation
  const pageSection = data?.section
  const allPagesMeta = []
  fs.readdirSync(contentFilePath, 'utf8')
    .filter((path) => /\.mdx?$/.test(path))
    .forEach((file) => {
      const pageSource = matter(fs.readFileSync(path.join(contentFilePath, file), 'utf8'))
      const pageMeta = pageSource.data
      pageMeta.path = `/${file.replace(/\.mdx$/, '')}/`
      allPagesMeta.push(pageMeta)
    })

  const siblings = allPagesMeta.filter(item => item.section === pageSection)

  // add table of content to pages
  const addTocToPage = () => {
    // don't generate TOC on some pages
    if (!['404', 'cookies', 'sign-in'].some(v => data.path.includes(v))) {
      return [
        rehypeSlug,
        [toc, {
          headings: ['h2', 'h3', 'h4'],
          cssClasses: {
            toc: 'app-toc',
            list: 'app-toc__list',
            listItem: 'app-toc__list-item',
            link: 'app-toc__link'
          },
          customizeTOC: function (toc) {
            if (toc.type === 'element' && toc.tagName === 'nav') {
              toc.properties.role = 'navigation'
              toc.properties['aria-label'] = 'Sections on this page'
            }
            if (toc.children[0].children.length === 0) {
              return false
            } else {
              toc.children.unshift({
                type: 'element',
                tagName: 'h2',
                children: [
                  {
                    type: 'text',
                    value: 'Contents'
                  }
                ],
                properties: {
                  className: 'app-toc__heading'
                }
              })
              return toc
            }
          }
        }]
      ]
    } else return []
  }

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: addTocToPage()
    },
    scope: data
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      siblings: siblings
    }
  }
}

export const getStaticPaths:GetStaticPaths = async () => {
  const paths = fs
    .readdirSync(contentFilePath)
    .filter((path) => /\.mdx?$/.test(path))
    // Remove file extensions for page paths
    .map(remove_mdx)
    // exclude homepage as it has its own template
    .filter(paths_without_index)
    // Map the path into the static paths object required by Next.js
    .map(paths_object)

  return {
    paths,
    fallback: false
  }
}
