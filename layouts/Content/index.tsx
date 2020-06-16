import React from 'react'
import Head from 'next/head'
import SectionNavigation from '@components/SectionNavigation'
import { GridRow, GridColumn } from '@components/GridLayout'
import config from '../../config/config.json'

export default function contentPage(frontMatter) {
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
          <GridRow>
            { frontMatter.sectionNav ? ( 
            <GridColumn width='one-third'>
              <SectionNavigation section={frontMatter.section} />
            </GridColumn> ) : <></>
            }
            <GridColumn width='two-thirds'>
              {frontMatter && frontMatter.title ? (
                <h1 className="govuk-heading-xl">{frontMatter.title}</h1>
              ): <></>}
              {content}
            </GridColumn>
          </GridRow>
        </main>
      </div>
      </>
    )
  }
}
