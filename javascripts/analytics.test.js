import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Analytics from './analytics'

// unable, for unknown reason to append item per test and initialise analytics and
// still be able to reliably  populate dataLayer
//
// populating the body with all the test elements before initialising javascript
// mimimics what actually happens in the browser

document.body.innerHTML = `
<h1>Page not found</h1>
<a href="https://www.example.com" data-testid="external">External link</a>
<a href="/test"
  data-testid="data-attribute-tracking"
  data-track-click="true" 
  data-track-category="Test category 1" 
  data-track-action="Test action 1" 
  data-track-label="Test label 1">
    Link with data tracking attributes
</a>
<a href="https://example.com"
  data-testid="external-with-data-attribute-tracking"
  data-track-click="true" 
  data-track-category="Test category 2" 
  data-track-action="Test action 2" 
  data-track-label="Test label 2">
    External link with data tracking attributes
</a>`;

const analytics = new Analytics()
global.dataLayer = []

analytics.init()


test("if a link has data tracking attributes, those values should be used in push to dataLayer", () => {

  userEvent.click(screen.getByTestId('data-attribute-tracking'))
  
  expect(global.dataLayer[1]).toEqual(
    expect.objectContaining({
      '0': 'event',
      '1': 'Test action 1',
      '2': { event_label: 'Test label 1', event_category: 'Test category 1' }
    })
  );
})

test("if a link has data tracking attributes but is also an external link, data attribute values should be used in push to dataLayer", () => {

  userEvent.click(screen.getByTestId('external-with-data-attribute-tracking'))

  expect(global.dataLayer[2]).toEqual(
    expect.objectContaining({
      '0': 'event',
      '1': 'Test action 2',
      '2': { event_label: 'Test label 2', event_category: 'Test category 2' }
    })
  )
})

test("if a link is an external link only, values set in 'trackExternalLinkClick' function should be used in push to dataLayer", () => {

  userEvent.click(screen.getByTestId('external'))

  expect(global.dataLayer[3]).toEqual(
    expect.objectContaining({
      '0': 'event',
      '1': 'External link',
      '2': { event_category: 'External Link Clicked', event_label: 'https://www.example.com' }
    })
  )
})

test("if a page is a 404 page, values set in the 'page404Event' function should be used in push to dataLayer", () => {
  expect(global.dataLayer[0]).toEqual(
    expect.objectContaining({
      '0': 'event',
      '1': '404',
      '2': { event_category: 'Error', event_label: 'Page ' }
    })
  )
})

