import React from 'react'
import Link from 'next/link'

const Button = (props) => {
  const {
    element,
    href,
    isStartButton,
    disabled,
    className,
    preventDoubleClick,
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
  } else if (href) {
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
    className: `govuk-button ${className || ''}${
      disabled ? ' govuk-button--disabled' : ''
    } ${isStartButton ? 'govuk-button--start' : ''}`
  };

  if (preventDoubleClick) {
    buttonAttributes['data-prevent-double-click'] = preventDoubleClick;
  }

  if (disabled) {
    buttonAttributes = {
      ...buttonAttributes,
      'aria-disabled': true,
      disabled: 'disabled',
    };
  }

  if (el === 'a') {
    const linkAttributes = {
      role: 'button',
      draggable: 'false',
      ...attributes,
      'data-module': 'govuk-button',
      href
    };

    button = (
      <Link href={href}>
        <a {...linkAttributes} {...commonAttributes}>{children}{iconHtml}</a>
      </Link>
    );
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