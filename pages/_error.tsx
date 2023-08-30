import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import matter from 'gray-matter'
import Button from '@components/Button'
import ContentPageLayout from '../layouts/ContentPageLayout'

// prevent NextJS from including all their scripts
// as we're exporting these as static HTML pages
export const config = {
  unstable_runtimeJS: false
}

const components = {
  Button
}

export default function contentPage ({ source, frontMatter, siblings }) {
  return (
    <ContentPageLayout meta={frontMatter} siblings={siblings}>
      <MDXRemote {...source} components={components} />
    </ContentPageLayout>
  )
}

export const getStaticProps = async () => {
  const pageFilePath = path.join('pages', 'content', 'error404.mdx')
  const source = fs.readFileSync(pageFilePath)
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    scope: data
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data
    }
  }
}
