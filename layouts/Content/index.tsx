import React from 'react'
import Head from 'next/head'
import SectionNavigation from '@components/SectionNavigation'
import config from '../../config/config.json'

export default function PageWithSideNav(frontMatter) {
  return ({ children: content }) => {
    return (
      <>
      <Head>
        <title>
          {frontMatter && frontMatter.title ? 
            (`${frontMatter.title} - ${config.siteName}`)
            : config.siteName
          }
        </title>
      </Head>
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content" role="main">
          <div className="govuk-grid-row">
            { frontMatter.sectionNav ? ( 
            <div className="govuk-grid-column-one-third">
              <SectionNavigation section={frontMatter.section} />
            </div> ) : <></>
            }
            <div className="govuk-grid-column-two-thirds">
              {frontMatter && frontMatter.title ? (
                <h1 className="govuk-heading-xl">{frontMatter.title}</h1>
              ): <></>}
              {content}
            </div>
          </div>
        </main>
      </div>
      </>
    )
  }
}
