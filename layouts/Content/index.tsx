import React from 'react'
import DocumentMeta from '@components/DocumentMeta'
import SectionNavigation from '@components/SectionNavigation'
import { GridRow, GridColumn } from '@components/GridLayout'

export default function contentPage(frontMatter) {
  return ({ children: content }) => {
    return (
      <>
      <DocumentMeta title={frontMatter.title} />
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
