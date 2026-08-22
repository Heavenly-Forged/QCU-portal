// frontend/js/navigation.js

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.querySelector('.menu-toggle-btn');
  const overlay = document.querySelector('.sidebar-overlay');
  
  // Logout Elements
  const logoutBtn = document.getElementById('logoutBtn');
  const logoutModal = document.getElementById('logoutModal');
  const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
  const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

  function openSidebar() {
    if (sidebar && overlay) {
      sidebar.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSidebar() {
    if (sidebar && overlay) {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Open Custom Logout Modal
  if (logoutBtn && logoutModal) {
    logoutBtn.addEventListener('click', () => {
      logoutModal.classList.add('active');
    });
  }

  // Cancel Logout
  if (cancelLogoutBtn && logoutModal) {
    cancelLogoutBtn.addEventListener('click', () => {
      logoutModal.classList.remove('active');
    });
  }

  // Close modal when clicking backdrop
  if (logoutModal) {
    logoutModal.addEventListener('click', (e) => {
      if (e.target === logoutModal) {
        logoutModal.classList.remove('active');
      }
    });
  }

  // Confirm Sign Out Action
  if (confirmLogoutBtn) {
    confirmLogoutBtn.addEventListener('click', () => {
      localStorage.removeItem('qcu_user');
      window.location.href = 'index.html';
    });
  }
});