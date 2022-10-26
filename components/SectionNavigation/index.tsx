import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SectionNavigation = (data) => {
  const items = data.siblings
  // use NextJS to identify the current page for activeNavigation link
  const router = useRouter()
  
  return (
    <nav className="section-navigation" aria-label="Pages in the current section">
      <ol>
        {items.sort(function (a, b) {
          if (!a.hasOwnProperty("order") || !b.hasOwnProperty("order")) {
            // property doesn't exist on either object
            return 0;
          }
          return a.order - b.order;
        })
        .map((page) => (  
          <li key={page.path}
            className={`section-navigation__item ${router.asPath === page.path ? 'section-navigation__item--active' : ''}`}>
            <Link
              href={page.path}
              className="govuk-link"
              aria-current={page.path === router.asPath ? 'page' : null}>

              {page.navLinkText ? page.navLinkText : page.title}

            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}



export default SectionNavigation
