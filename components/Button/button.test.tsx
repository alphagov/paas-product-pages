import { test, expect } from 'vitest';
import React from 'react'
import { render } from '@testing-library/react'
import Button from './'


test('Button component as default', () => {
  const { container } = render(<Button>Button text</Button>)
  const button = container.getElementsByTagName('button')[0]

  expect(button).toBeInTheDocument
  expect(button).toHaveTextContent('Button text')
  expect(button).toHaveClass('govuk-button')
  expect(button).toHaveAttribute('data-module','govuk-button')
})

test('Button component a link when "href" prop is provided', () => {
  const { container } = render(<Button href='/' />)
  const buttonAsLink = container.getElementsByTagName('a')[0]
  
  expect(buttonAsLink).toBeInTheDocument
  expect(buttonAsLink).toHaveAttribute('href','/')
  expect(buttonAsLink).toHaveAttribute('role', 'button')
  expect(buttonAsLink).toHaveAttribute('draggable', 'false')
})

test('Button component a link when "externHref" prop is provided', () => {
  const { container } = render(<Button externalHref='test.com' />)
  const buttonAsLink = container.getElementsByTagName('a')[0]

  expect(buttonAsLink).toHaveAttribute('href','test.com')
})

test('Button component as start link', () => {
  const { container } = render(<Button isStartButton href='/' />)
  const buttonAsSTartLink = container.getElementsByTagName('a')[0]
  
  expect(buttonAsSTartLink).toHaveClass('govuk-button--start')
  expect(buttonAsSTartLink.firstChild.nodeName).toBe("svg")
})

test('Button component as a submit button', () => {
  const { container } = render(<Button element="input">Continue</Button>)
  const buttonAsSubmit = container.getElementsByTagName('input')[0]
  
  expect(buttonAsSubmit).toHaveClass('govuk-button')
  expect(buttonAsSubmit).toHaveAttribute('value','Continue')
  expect(buttonAsSubmit).toHaveAttribute('type','submit')
})
