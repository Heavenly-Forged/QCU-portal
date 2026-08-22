// frontend/js/modules/login.js

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const modal = document.getElementById('forgotPassModal');
  const openBtn = document.getElementById('openForgotModalBtn');
  const closeBtn = document.getElementById('closeForgotModalBtn');
  const dismissBtn = document.getElementById('dismissForgotModalBtn');
  const togglePassBtn = document.getElementById('togglePasswordBtn');
  const passwordInput = document.getElementById('password');

  // 1. Password Visibility Toggle
  togglePassBtn?.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
  });

  // 2. Forgot Password Modal Logic
  const openModal = () => modal?.classList.add('active');
  const closeModal = () => modal?.classList.remove('active');

  openBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  dismissBtn?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // 3. Login Submission Mock
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const studentId = document.getElementById('studentId').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!studentId || !password) return;

    // Direct redirect for Phase 1 Prototype
    window.location.href = 'dashboard.html';
  });
});