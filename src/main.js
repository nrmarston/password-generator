import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="page-wrapper">
    
    <form>
    <h1 class="text-muted text-center">Password Generator</h1>
    <div class="password-display">    
      <input type="text" id="password" readonly placeholder="P4$5W0rD!" />
      <button type="button" id="copy-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>
<span class="sr-only">Copy</span>
      </button>
    </div>

    <div class="controls-wrap">
      <div class="length-control">
        <label for="length">Character Length: <span id="length-value">0</span></label>
        <input type="range" id="length" min="8" max="100" value="20" />
      </div>
      <div class="options-group">
        <label>
          <input type="checkbox" id="uppercase" checked />
          Include Uppercase Letters
        </label>
        <label>
          <input type="checkbox" id="lowercase" checked />
          Include Lowercase Letters
        </label>
        <label>
          <input type="checkbox" id="numbers" checked />
          Include Numbers
        </label>
        <label>
          <input type="checkbox" id="symbols" checked />
          Include Symbols
        </label>
      </div>
      <button type="submit" id="generate-btn">Generate Password</button>
    </div>

    </form>
  </div>
`;

const passwordInput = document.getElementById('password');
const generatePasswordBtn = document.getElementById('generate-btn');
const charLengthInput = document.getElementById('length');
const charLengthText = document.getElementById('length-value');

// Controls declaration
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const copyButton = document.getElementById('copy-btn');

function updateCharLength() {
  charLengthText.textContent = charLengthInput.value;
}

// Initialize number of characters in UI
updateCharLength();

function generatePassword(length) {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (
    !uppercaseCheckbox.checked &&
    !lowercaseCheckbox.checked &&
    !numbersCheckbox.checked &&
    !symbolsCheckbox.checked
  ) {
    return 'Please select at least one character type';
  }

  let charset = '';
  if (uppercaseCheckbox.checked) charset += uppercase;
  if (lowercaseCheckbox.checked) charset += lowercase;
  if (numbersCheckbox.checked) charset += numbers;
  if (symbolsCheckbox.checked) charset += symbols;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function copyToClipboard() {
  const password = passwordInput.value;

  // If there is no password do nothing
  if (!password) return;

  // If there is a password
  navigator.clipboard.writeText(password);
  try {
    console.log('Copied to clipboard!');
    // Change button svg to checkmark for 6 seconds then back to original
    const originalSVG = copyButton.innerHTML;
    const checkmarkSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
    `;
    copyButton.innerHTML = checkmarkSVG;
    setTimeout(() => {
      copyButton.innerHTML = originalSVG;
    }, 4000);
  } catch (error) {
    console.error('Failed to copy. ', error);
  }
}

// Handle generate password button click
generatePasswordBtn.addEventListener('click', event => {
  event.preventDefault();
  // Get character length to determine length of password
  const charCount = charLengthInput.value;
  // Generate random password and update the password input value
  const newPassword = generatePassword(charCount);
  passwordInput.value = newPassword;
  console.log(newPassword);
});

// Handle lengh of char change
charLengthInput.addEventListener('input', () => {
  updateCharLength();
});

// Handle copy button click
copyButton.addEventListener('click', () => {
  copyToClipboard();
});

/* grab sliders on page */
const sliders = document.querySelectorAll('input[type="range"]');

/* take a slider element, return a percentage string for use in CSS */
const rangeToPercent = slider => {
  const max = slider.getAttribute('max') || 10;
  const percent = (slider.value / max) * 100;

  return `${parseInt(percent)}%`;
};

/* on page load, set the fill amount */
sliders.forEach(slider => {
  slider.style.setProperty('--track-fill', rangeToPercent(slider));

  /* when a slider changes, update the fill prop */
  slider.addEventListener('input', e => {
    e.target.style.setProperty('--track-fill', rangeToPercent(e.target));
  });
});
