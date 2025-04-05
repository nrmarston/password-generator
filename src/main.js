import './style.css';

// Query DOM elements once and reuse them
const app = document.querySelector('#app');

document.querySelector('#app').innerHTML = `
  <div class="page-wrapper">
    
    <form>
    <h1 class="text-muted text-center">Password Generator</h1>
    <div class="password-display">    
      <input type="text" id="password" readonly tabindex="-1" aria-hidden="true" />
      <div id="password-output" aria-hidden="true"></div>
      <button type="button" id="copy-btn">
        <div class="icon-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
</svg>

        </div>
        <span class="label">Copy</span>
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
          <input type="checkbox" id="numbers" />
          Include Numbers
        </label>
        <label>
          <input type="checkbox" id="symbols" />
          Include Symbols
        </label>
      </div>
      <div class="password-strength-wrap">
        <span class="uppercase text-muted">strength</span>
        <div class="strength-meter">
          <span class="strength-meter-text">Strong</span>
          <div class="strength-bar-wrap">
            <div class="strength-bar is-filled"></div>
            <div class="strength-bar is-filled"></div>
            <div class="strength-bar is-filled"></div>
          </div>
        </div>
      </div>
      <button type="button" id="generate-btn">Generate
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
        </svg>
      </button>
    </div>

    </form>
  </div>
`;

// Query DOM elements once and reuse them
const passwordInput = document.getElementById('password');
const generatePasswordBtn = document.getElementById('generate-btn');
const charLengthInput = document.getElementById('length');
const charLengthText = document.getElementById('length-value');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const copyButton = document.getElementById('copy-btn');
const strengthText = document.querySelector('.strength-meter-text');
const strengthBars = document.querySelectorAll('.strength-bar');
const strengthMeter = document.querySelector('.strength-meter');

function updateCharLength() {
  charLengthText.textContent = charLengthInput.value;
}

// Initialize number of characters in UI
updateCharLength();

// Returns a random password based on selected options
function generatePassword(length) {
  const charsets = [];
  const selectedChars = [];

  if (uppercaseCheckbox.checked) {
    const set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    charsets.push(set);
    selectedChars.push(randomCharFrom(set));
  }

  if (lowercaseCheckbox.checked) {
    const set = 'abcdefghijklmnopqrstuvwxyz';
    charsets.push(set);
    selectedChars.push(randomCharFrom(set));
  }

  if (numbersCheckbox.checked) {
    const set = '0123456789';
    charsets.push(set);
    selectedChars.push(randomCharFrom(set));
  }

  if (symbolsCheckbox.checked) {
    const set = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    charsets.push(set);
    selectedChars.push(randomCharFrom(set));
  }

  if (charsets.length === 0) return '';

  const allChars = charsets.join('');
  while (selectedChars.length < length) {
    selectedChars.push(randomCharFrom(allChars));
  }

  return shuffleArray(selectedChars).join('');
}

function randomCharFrom(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Returns the active character set string based on selected checkboxes
function getSelectedCharset() {
  let charset = '';
  if (uppercaseCheckbox.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercaseCheckbox.checked) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (numbersCheckbox.checked) charset += '0123456789';
  if (symbolsCheckbox.checked) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  return charset;
}

function updatePasswordText(password) {
  passwordInput.value = password;

  const output = document.getElementById('password-output');
  output.innerHTML = '';

  for (const char of password) {
    const span = document.createElement('span');
    span.classList.add('char');

    if (/[A-Za-z]/.test(char)) {
      span.classList.add('letter');
    } else if (/[0-9]/.test(char)) {
      span.classList.add('number');
    } else {
      span.classList.add('symbol');
    }

    span.textContent = char;
    output.appendChild(span);
  }
}

// Copies the current password to the clipboard and shows a checkmark
function copyToClipboard() {
  const password = passwordInput.value;
  if (!password) return;

  navigator.clipboard
    .writeText(password)
    .then(() => {
      const iconWrap = copyButton.querySelector('.icon-wrap');
      const label = copyButton.querySelector('.label');

      const originalIcon = iconWrap.innerHTML;
      const originalText = label.textContent;

      const checkmarkSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    `;

      iconWrap.innerHTML = checkmarkSVG;
      label.textContent = 'Copied!';

      setTimeout(() => {
        iconWrap.innerHTML = originalIcon;
        label.textContent = originalText;
      }, 6000);
    })
    .catch(err => console.error('Failed to copy.', err));
}

// Updates the password strength meter UI
function updateStrengthMeter() {
  const length = parseInt(charLengthInput.value);
  const typeCount = [
    uppercaseCheckbox,
    lowercaseCheckbox,
    numbersCheckbox,
    symbolsCheckbox,
  ].filter(box => box.checked).length;

  let strength = 'Weak';
  let filledBars = 1;
  let className = 'strength-meter--weak';

  if (length >= 14 && typeCount >= 2) {
    strength = 'Strong';
    filledBars = 3;
    className = 'strength-meter--strong';
  } else if (length >= 12 && typeCount >= 2) {
    strength = 'Medium';
    filledBars = 2;
    className = 'strength-meter--medium';
  }

  // Set text
  strengthText.textContent = strength;

  // Update bar fill
  strengthBars.forEach((bar, index) =>
    bar.classList.toggle('is-filled', index < filledBars)
  );

  // Remove old strength classes
  strengthMeter.classList.remove(
    'strength-meter--weak',
    'strength-meter--medium',
    'strength-meter--strong'
  );

  // Add new strength class
  strengthMeter.classList.add(className);
}

// debounce helper function
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const debouncedUpdateStrength = debounce(updateStrengthMeter, 150);

// Load saved settings from localStorage
function loadSettings() {
  const savedLength = localStorage.getItem('passwordLength');
  const savedUppercase = localStorage.getItem('includeUppercase');
  const savedLowercase = localStorage.getItem('includeLowercase');
  const savedNumbers = localStorage.getItem('includeNumbers');
  const savedSymbols = localStorage.getItem('includeSymbols');

  if (savedLength) {
    charLengthInput.value = savedLength;
    updateCharLength();
  }
  if (savedUppercase !== null)
    uppercaseCheckbox.checked = savedUppercase === 'true';
  if (savedLowercase !== null)
    lowercaseCheckbox.checked = savedLowercase === 'true';
  if (savedNumbers !== null) numbersCheckbox.checked = savedNumbers === 'true';
  if (savedSymbols !== null) symbolsCheckbox.checked = savedSymbols === 'true';
}

// Save settings to localStorage
function saveSettings() {
  localStorage.setItem('passwordLength', charLengthInput.value);
  localStorage.setItem('includeUppercase', uppercaseCheckbox.checked);
  localStorage.setItem('includeLowercase', lowercaseCheckbox.checked);
  localStorage.setItem('includeNumbers', numbersCheckbox.checked);
  localStorage.setItem('includeSymbols', symbolsCheckbox.checked);
}

loadSettings();

// Function to handle generate password button state
function updateGenerateButtonState() {
  const anyChecked =
    uppercaseCheckbox.checked ||
    lowercaseCheckbox.checked ||
    numbersCheckbox.checked ||
    symbolsCheckbox.checked;
  generatePasswordBtn.disabled = !anyChecked;
  generatePasswordBtn.classList.toggle('is-disabled', !anyChecked);
}

// Handle generate password button click
generatePasswordBtn.addEventListener('click', event => {
  event.preventDefault();
  // Get character length to determine length of password
  const charCount = charLengthInput.value;
  // Generate random password and update the password input value
  const newPassword = generatePassword(charCount);
  updatePasswordText(newPassword);
  console.log(newPassword);
  updateStrengthMeter();
});

// Handle length of char change
charLengthInput.addEventListener('input', () => {
  updateCharLength();
  saveSettings();
  const charCount = charLengthInput.value;
  const newPassword = generatePassword(charCount);
  updatePasswordText(newPassword);
  debouncedUpdateStrength();
});

updateGenerateButtonState();

// Handle checkbox change
[
  uppercaseCheckbox,
  lowercaseCheckbox,
  numbersCheckbox,
  symbolsCheckbox,
].forEach(box => {
  box.addEventListener('change', () => {
    updateGenerateButtonState();
    saveSettings();
    const charCount = charLengthInput.value;
    const newPassword = generatePassword(charCount);
    updatePasswordText(newPassword);
    updateStrengthMeter();
  });
});

// Handle copy button click
copyButton.addEventListener('click', () => {
  copyToClipboard();
});

/* grab sliders on page */
const sliders = document.querySelectorAll('input[type="range"]');

/* Converts range input value to percentage for CSS fill */
function rangeToPercent(slider) {
  const max = slider.getAttribute('max') || 10;
  return `${parseInt((slider.value / max) * 100)}%`;
}

/* on page load, set the fill amount */
sliders.forEach(slider => {
  slider.style.setProperty('--track-fill', rangeToPercent(slider));

  /* when a slider changes, update the fill prop */
  slider.addEventListener('input', e => {
    e.target.style.setProperty('--track-fill', rangeToPercent(e.target));
  });
});

const initialCharCount = charLengthInput.value;
const initialPassword = generatePassword(initialCharCount);
updatePasswordText(initialPassword);
updateStrengthMeter();
