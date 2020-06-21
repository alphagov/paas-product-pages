import React from 'react'
import Link from 'next/link'
import {frontMatter as pages} from '../../pages/*.mdx'
import { useRouter } from 'next/router'

const SectionNavigation = (section) => {
  // use NextJS to identify the current page for activeNavigation link
  const router = useRouter()

  // because of Staticfile buildpack we need to have index.html pages
  // but localdev needs to work with / so we format the path for href conditionally
  // in local dev you'll see 
  // react-dom.development.js:88 Warning: Prop `href` did not match. error. Ignore.
  const formatPath = (path) => {
    return addLeadingSlash(path.replace(/\.mdx$/, ''))
  }
  
  const addLeadingSlash = (path) => {
    return `/${path}`
  }
  
  const pagesInCurrentSection = pages.filter(function(page){
    return page.section === section.section
  })

  return (
    <nav className="section-navigation" aria-label="Pages in the current section">
      <ol>
        {pagesInCurrentSection.sort(function (a, b) {
          if (!a.hasOwnProperty("order") || !b.hasOwnProperty("order")) {
            // property doesn't exist on either object
            return 0;
          }
          return a.order - b.order;
        })
        .map((page) => (  
          <li key={page.__resourcePath}
            className={`section-navigation__item ${formatPath(page.__resourcePath) === router.pathname ? 'section-navigation__item--active' : ''}`}>
            <Link href={formatPath(page.__resourcePath)}>
              <a 
                className="govuk-link" 
                aria-current={formatPath(page.__resourcePath) === router.pathname ? 'page' : null}
               >
              {page.navLinkText ? page.navLinkText : page.title}
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}



export default SectionNavigation
