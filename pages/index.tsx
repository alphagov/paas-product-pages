import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import matter from 'gray-matter'
import Button from '@components/Button'
import { GridRow, GridColumn } from '@components/GridLayout'
import HomePageLayout from '../layouts/HomepageLayout'

// prevent NextJS from incluidng all their scripts
// as we're exporting these as static HTML pages
export const config = {
  unstable_runtimeJS: false
}

const components = {
  Button,
  GridColumn,
  GridRow
}

export default function homePage ({ source }) {
  return (
    <HomePageLayout>
      <MDXRemote {...source} components={components} />
    </HomePageLayout>
  )
}

export const getStaticProps = async () => {
  const pageFilePath = path.join('pages', 'content', 'index.mdx')
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
