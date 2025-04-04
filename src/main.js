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
<span>Copy</span>
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

function generatePassword() {
  const password = Math.floor(Math.random() * 9999);
  return password;
}

// Handle generate password button click
generatePasswordBtn.addEventListener('click', event => {
  event.preventDefault();
  // Generate random password and update the password input value
  const newPassword = generatePassword();
  password.value = newPassword;
  console.log(newPassword);
});
