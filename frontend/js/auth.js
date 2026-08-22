// frontend/js/auth.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorAlert = document.getElementById('errorAlert');

  // Password Visibility Toggle
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eyeIcon');

  if (togglePasswordBtn && passwordInput && eyeIcon) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      
      if (isPassword) {
        passwordInput.setAttribute('type', 'text');
        // Switch to "Eye Off" (Slash) SVG
        eyeIcon.innerHTML = `
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
      } else {
        passwordInput.setAttribute('type', 'password');
        // Switch back to "Eye" SVG
        eyeIcon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        `;
      }
    });
  }

  function showError(message) {
    if (errorAlert) {
      errorAlert.textContent = message;
      errorAlert.style.display = 'block';
    }
  }

  function hideError() {
    if (errorAlert) {
      errorAlert.style.display = 'none';
    }
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop default form submission/page reload
      hideError();

      const studentIdInput = document.getElementById('studentId');
      const passwordInput = document.getElementById('password');

      if (!studentIdInput || !passwordInput) return;

      const studentId = studentIdInput.value.trim();
      const password = passwordInput.value.trim();

      // Basic client-side validation
      if (!studentId || !password) {
        showError('Please enter both your Student ID and Password.');
        return;
      }

      if (password.length < 4) {
        showError('Password must be at least 4 characters long.');
        return;
      }

      // Mock user session stored in localStorage (Prepares for FastAPI JWT auth)
      localStorage.setItem('qcu_user', JSON.stringify({
        id: studentId,
        role: 'STUDENT',
        name: 'Juan Dela Cruz',
        campus: 'San Bartolome'
      }));

      // Redirect to Dashboard
      window.location.href = 'dashboard.html';
    });
  }
});