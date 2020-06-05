import React from 'react'
import Link from 'next/link'
import {frontMatter as pages} from '../../pages/**/*.mdx'

const SectionNavigation = (section) => {

  // because of Staticfile buildpack we need to have index.html pages
  // but localdev needs to work with / so we format the path for href conditionally
  // in local dev you'll see 
  // react-dom.development.js:88 Warning: Prop `href` did not match. error. Ignore.
  const formatPath = (path) => {
    return path.endsWith('/index.mdx') ? path.replace(/index\.mdx$/, '') : path.replace(/\.mdx$/, '')
   }
   
  const pagesInCurrentSection = pages.filter(function(page){
    return page.section === section.section
  })

  return (
    <nav className="section-navigation" aria-label="Pages in the current section">
      <ol>
        {pagesInCurrentSection.map((page) => (  
          <li key={page.__resourcePath}
            className="section-navigation__item">
            <Link href={`/${formatPath(page.__resourcePath)}`}>
              <a className="govuk-link">{page.title}</a>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}



export default SectionNavigation
