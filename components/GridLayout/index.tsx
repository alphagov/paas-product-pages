import React from 'react'

const GridColumn = (props) => {

  const {
    className,
    width,
    children,
    ...attributes
  } = props;

  const commonAttributes = {
    className: `govuk-grid-column-${width || 'full'} ${className ? className : ''}`
  };

  return (
    <div {...commonAttributes} {...attributes}>{children}</div>
  )
}

const GridRow = (props) => {

  const {
    className,
    children,
    ...attributes
  } = props;

  const commonAttributes = {
    className: `govuk-grid-row ${className ? className : ''}`
  };

  return (
    <div {...commonAttributes} {...attributes}>{children}</div>
  )
}

export { GridRow, GridColumn }
