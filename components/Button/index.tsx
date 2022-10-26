import React from 'react'

const Button = (props) => {
  const {
    element,
    href,
    externalHref,
    isStartButton,
    className,
    name,
    type,
    children,
    ...attributes
  } = props;

  let el = '';
  let buttonAttributes = {
    name,
    type,
    ...attributes,
    'data-module': 'govuk-button',
  };
  let button;

  if (element) {
    el = element;
  } else if (href || externalHref) {
    el = 'a';
  } else {
    el = 'button';
  }

  let iconHtml;
  if (isStartButton) {
    iconHtml = (
      <svg
        className="govuk-button__start-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
      </svg>
    );
  }

  const commonAttributes = {
    className: `govuk-button ${className || ''} ${isStartButton ? 'govuk-button--start' : ''}`
  };

  if (el === 'a') {
    const linkAttributes = {
      role: 'button',
      draggable: 'false',
      ...attributes,
      'data-module': 'govuk-button',
      href,
    };
    if (externalHref) {
      button = (
        <a {...linkAttributes} {...commonAttributes} href={externalHref}>{children}{iconHtml}</a>
      )
    } else {
      button = (
        <a href={href} {...linkAttributes} {...commonAttributes}>
          {children}{iconHtml}
        </a>
      );
    }
  } else if (el === 'button') {
    button = (
      <button {...buttonAttributes} {...commonAttributes}>
        {children}
        {iconHtml}
      </button>
    );
  } else if (el === 'input') {
    if (!type) {
      buttonAttributes.type = 'submit';
    }
    button = (
      <input value={children} {...buttonAttributes} {...commonAttributes} />
    );
  }


  return button;
}

export default Button