/* REGEX VALIDATORS */
// This regex only accepts names the start with an uppercase
const identityRegex = /^[A-ZÀ-Ý]+\s?([A-ZÀ-Ýa-zà-ý]+\s?)?([A-ZÀ-Ýa-zà-ý]+\s?)?([A-ZÀ-Ýa-zà-ý]+\s?)?([A-ZÀ-Ýa-zà-ý]+\s?)?([A-ZÀ-Ýa-zà-ý]+\s?)?/;
// This regex only accepts email addresses that contain an '@' special character 
// and that end with a top-level domain
const emailRegex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
// This regex only accepts valid local and international phone number formats
const phoneNumberRegex = /((\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/;
// This regex only accepts passwords that :
// - Are 8 characters long
// - Contain at least one lowercase letter
// - Contain at least one uppercase letter
// - Contain at least one digit
// - Contain at least one special character between the following : '@$!%*?&-_'
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]{8,}$/;

/* SELECTORS */
const passwordEyeArray = Array.from(document.querySelectorAll('.password-eye-container'));
const userPassword = document.querySelector('#user-password');
const userConfirmPassword = document.querySelector('#user-confirm-password');

const tooltipContainer = document.querySelector('.tooltip-container');
const inputArray = Array.from(document.querySelectorAll('input'));
const validationSignArray = Array.from(document.querySelectorAll('.validation-sign'));

/* FUNCTIONS */
// Create a general function that activates form validation
function createFormValidation() {
  toggleTooltip();
  togglePassword();
}
// Create a function that toggles a tooltip whenever
// an input field is focused.
// Also activate the correct validation for the correct inputs
function toggleTooltip() {
  // Create an object that stores elements and characteristics for each input field
  const tooltipObj = {
    firstnameObj: {
      element: document.createElement('div'),
      text: '\u25cf Your firstname must start with a capitalized letter.',
      regex: identityRegex,
    },
    lastnameObj: {
      element: document.createElement('div'),
      text: '\u25cf Your lastname must start with a capitalized letter.',
      regex: identityRegex,
    },
    emailObj: {
      element: document.createElement('div'),
      text: `\u25cf Your email address must contain the "@" special character.

      \u25cf Your email address must end with a top-level domain (ex: .com, .org, .net, .co.uk, .aus, .kr, .nz).`,
      regex: emailRegex,
    },
    phoneNumberObj: {
      element: document.createElement('div'),
      text: `\u25cf Your phone number must have a valid local or international format.

      \u25cf For most countries start with the country code (ex: +01, +08, +22, +33, etc.).

      \u25cf For the US, please write a valid format (ex: (555) 555 5555, 777 777 777, 1-888-1234-5678, etc.).`,
      regex: phoneNumberRegex,
    },
    passwordObj: {
      element: document.createElement('div'),
      text: `\u25cf Your password must be at least 8 characters long.

      \u25cf Your password must contain at least one lowercase letter.

      \u25cf Your password must contain at least one uppercase letter.

      \u25cf Your password must contain at least one digit.

      \u25cf Your password must contain at least one special character (ex: "@$!%*?&-_").`,
      regex: passwordRegex,
    },
    confirmPasswordObj: {
      element: document.createElement('div'),
      text: `\u25cf Make sure your passwords correspond.
      
      \u25cf You can click one the eye icon to check your input.`,
      regex: passwordRegex,
    }, 
  }

    inputArray.forEach(input => {
      // Initialize an id variable to target the current active input field
      const id = input.id;
      // Initialize of objects as node variables for easy access
      const firstnameNode = tooltipObj.firstnameObj;
      const lastnameNode = tooltipObj.lastnameObj;
      const emailNode = tooltipObj.emailObj;
      const phoneNumberNode = tooltipObj.phoneNumberObj;
      const passwordNode = tooltipObj.passwordObj;
      const confirmPasswordNode = tooltipObj.confirmPasswordObj;
      // Create a switch condition to activate the validation process based on the current active input field
      switch (id) {
        case'user-firstname':
          targetInput(input, firstnameNode.regex, firstnameNode.element, firstnameNode.text);
        break;
        case'user-lastname':
          targetInput(input, lastnameNode.regex, lastnameNode.element, lastnameNode.text);
        break;
        case 'user-email':
          targetInput(input, emailNode.regex, emailNode.element, emailNode.text);
        break;
        case 'user-phone-number':
          targetInput(input, phoneNumberNode.regex, phoneNumberNode.element, phoneNumberNode.text);
        break;
        case 'user-password':
          targetInput(input, passwordNode.regex, passwordNode.element, passwordNode.text);
        break;
        case 'user-confirm-password':
          targetPasswordConfirmation(input, confirmPasswordNode.regex, confirmPasswordNode.element, confirmPasswordNode.text);
        break;
      }

      // Call the validation sign function to toggle an icon
      // whenever the user input is valid
      toggleValidationSign(input, id);
    });
  }

  // Create a middleware to call each password utility functions in one place
  function targetPasswordConfirmation(input, regex, node, text) {
    confirmPassword(input, regex, node);
    addTooltip(input, node, text);
    removeTooltip(input, node);
  }

  // Create a middleware to call each input utility functions in one place
  function targetInput(input, regex, node, text) {
    validateInput(input, regex, node);
    addTooltip(input, node, text);
    removeTooltip(input, node);
  }

  // Create a function that turns the tooltip to green
  // whenever the user confirms the password correctly
  // into the confirm password field
  function confirmPassword(input, regex, node) {
    input.addEventListener('input', () => {
      if (regex.test(input.value)) {
        if (input.value === userPassword.value) {
          node.classList.remove('element-invalid');
          node.classList.add('element-valid');
        } else {
          node.classList.remove('element-valid');
          node.classList.add('element-invalid');
        }
      } else {
        node.classList.remove('element-valid');
        node.classList.add('element-invalid');
      }
    });
  }
  
  // Turn the tooltip to green whenever the user enters the correct input
  function validateInput(input, regex, node) {
    input.addEventListener('input', () => {
      if (regex.test(input.value)) {
        node.classList.remove('element-invalid');
        node.classList.add('element-valid');
      } else {
        node.classList.remove('element-valid');
        node.classList.add('element-invalid');
      }
    });
  }
  
  // Toggle on a tooltip whenever the user focuses on one input field
  function addTooltip(input, node, text) {
    input.addEventListener('focus', () => {
      node.classList.add('element-container');
      if (tooltipContainer.hasChildNodes()) {
        tooltipContainer.replaceChild(node, tooltipContainer.lastElementChild);
      } else {
        tooltipContainer.appendChild(node);
      }
      node.style.visibility = 'visible';
      node.innerText = text;
    });
  }
  
  // Toggle off the current tooltip whenever the input field loses focus
  function removeTooltip(input, node) {
    input.addEventListener('blur', () => {
      if (tooltipContainer.hasChildNodes()) {
        tooltipContainer.removeChild(node);
      }
    });
  }

  // Toogle a green circled 'tick' sign on top of the input field whenever
  // the users enters the correct entry
  function toggleValidationSign(input, id) {
    validationSignArray.forEach(validationSign => {
      const parent1 = input.parentElement;
      const parent2 = validationSign.parentElement.parentElement.parentElement;
      validationSign.classList.add('validation-sign');

      // Check if the current input in focus has the same parent as the validation sign
      if (parent1 === parent2) {
        input.addEventListener('input', () => {
          // When both elements have the same parent, toggle the sign based on the input id
          // and the input value
          switch (id) {
            case 'user-firstname':
              targetValidationSign(input, identityRegex, validationSign);
            break;
            case 'user-lastname':
              targetValidationSign(input, identityRegex, validationSign);
            break;
            case 'user-email':
              targetValidationSign(input, emailRegex, validationSign);
            break;
            case 'user-phone-number':
              targetValidationSign(input, phoneNumberRegex, validationSign);
            break;
            case 'user-password':
              targetValidationSign(input, passwordRegex, validationSign);
            break;
            case 'user-confirm-password':
              targetConfirmPasswordSign(input, passwordRegex, validationSign);
            break;
          }
        });
      }
    });
  }
  
  // Turn the confirm password's input border to green whenever the user matches the password correctly
  // Also toggle a green 'tick' sign
  function targetConfirmPasswordSign(input, regex, node) {
    if (regex.test(input.value)) {
      if (input.value === userPassword.value) {
        input.classList.remove('input-invalid');
        input.classList.add('input-valid');
        node.style.visibility = 'visible';
        node.src = './images/yes.svg';
      }else {
        input.classList.remove('input-valid');
        input.classList.add('input-invalid');
        node.style.visibility = 'hidden';
        node.src = '';
      }
    } else {
      input.classList.remove('input-valid');
      input.classList.add('input-invalid');
      node.style.visibility = 'hidden';
      node.src = '';
    }
  }
  
  // Turn the input field's border to green whenever the user enters the correct input
  function targetValidationSign(input, regex, node) {
    if (regex.test(input.value)) {
      input.classList.remove('input-invalid');
      input.classList.add('input-valid');
      node.style.visibility = 'visible';
      node.src = './images/yes.svg';
    } else {
      input.classList.remove('input-valid');
      input.classList.add('input-invalid');
      node.style.visibility = 'hidden';
    }
  }

  // Toggle the password input to show or hide the password whenever the user clicks on the eye icon
  function togglePassword() {
    passwordEyeArray.forEach(passwordEye => {
      passwordEye.style.backgroundImage = './images/eye-hide.svg';
      switch (passwordEye.parentNode) {
        case userPassword.parentNode:
          passwordEye.addEventListener('click', () => {
            switch (userPassword.type) {
              case 'password':
                passwordEye.style.backgroundImage = 'url(./images/eye-show.svg)';
                userPassword.type = 'text';
              break;
              case 'text':
                passwordEye.style.backgroundImage = 'url(./images/eye-hide.svg)';
                userPassword.type = 'password';
              break;
            }
          });
        break;
        case userConfirmPassword.parentNode:
          passwordEye.addEventListener('click', () => {
            switch (userConfirmPassword.type) {
              case 'password':
                passwordEye.style.backgroundImage = 'url(./images/eye-show.svg)';
                userConfirmPassword.type = 'text';
              break;
              case 'text':
                passwordEye.style.backgroundImage = 'url(./images/eye-hide.svg)';
                userConfirmPassword.type = 'password';
              break;
            }
          });
        break;
      }
    });
  }

// Call the main function to run the validation process
createFormValidation();
