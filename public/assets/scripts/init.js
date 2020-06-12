// there is ever only one header per page
var $headerMenuButton = document.querySelector('[data-module="govuk-header"]');
var GOVUKHeader = window.GOVUKFrontend.Header;
if ($headerMenuButton) {
  new GOVUKHeader($headerMenuButton).init();
}

var $buttons = document.querySelectorAll('[data-module="govuk-button"]');
var GOVUKButton = window.GOVUKFrontend.Button;
if ($buttons) {
  for (var i = 0; i < $buttons.length; i++) {
    new GOVUKButton($buttons[i]).init();
  };
}