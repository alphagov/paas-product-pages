import React from 'react'
import Head from 'next/head'
import SectionNavigation from '@components/SectionNavigation'
import { GridRow, GridColumn } from '@components/GridLayout'
import config from '../config/config.json'

export default function ContentPageLayout({ children, meta, siblings }) {
  return (
    <>
      <Head>
        <title>
          {meta && meta.title ? 
            (`${meta.title} - ${config.siteName}`)
            : config.siteName
          }
        </title>
      </Head>
      <div className="govuk-width-container ">
        { meta.sectionNav ? (
            <>
            <GridRow>
              <GridColumn width='one-third'>
                <SectionNavigation section={meta.section} siblings={siblings} />
              </GridColumn>
              <GridColumn width='two-thirds'>
                <main className="govuk-main-wrapper" id="main-content" role="main">
                  {meta && meta.title ? (
                      <h1 className="govuk-heading-xl">{meta.title}</h1>
                    ): <></>}
                  {children}
                </main>
              </GridColumn>
            </GridRow>
            </>
          ) : (
            <main className="govuk-main-wrapper" id="main-content" role="main">
            <GridRow>
              <GridColumn width='two-thirds'>
                {meta && meta.title ? (
                  <h1 className="govuk-heading-xl">{meta.title}</h1>
                ): <></>}
                {children}
              </GridColumn>
            </GridRow>
          </main>
          )
        }
      </div>
    </>
  )
}
