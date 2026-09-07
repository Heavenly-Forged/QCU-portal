// frontend/js/modules/login.js
const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const studentIdInput = document.getElementById("studentId");
  const passwordInput = document.getElementById("password");
  const alertBox = document.getElementById("loginAlertBox");
  const submitBtn = loginForm ? loginForm.querySelector(".btn-login") : null;

  // 1. Handle Form Submission
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      hideAlert();

      const accountNumber = studentIdInput.value.trim();
      const password = passwordInput.value;

      if (!accountNumber || !password) {
        showAlert("Please enter both your Student Number and password.");
        return;
      }

      // Indicate loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Signing In...";
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            account_number: accountNumber,
            password: password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Invalid login credentials.");
        }

        // Store session tokens
        sessionStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("account_number", data.account_number);
        sessionStorage.setItem("user_role", data.role);

        // Redirect based on role
        redirectUser(data.role);

      } catch (err) {
        showAlert(err.message);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Sign In";
        }
      }
    });
  }

  // 2. Alert Box Helpers
  function showAlert(msg) {
    if (alertBox) {
      alertBox.textContent = msg;
      alertBox.style.display = "block";
    } else {
      alert(msg);
    }
  }

  function hideAlert() {
    if (alertBox) {
      alertBox.textContent = "";
      alertBox.style.display = "none";
    }
  }

  // 3. Role Router
  function redirectUser(role) {
    switch (role) {
      case "STUDENT":
        window.location.href = "dashboard.html";
        break;
      case "FACULTY":
        window.location.href = "faculty.html";
        break;
      case "SUPER_ADMIN":
      case "REGISTRAR_ADMIN":
      case "CLINIC_ADMIN":
      case "OSA_ADMIN":
        window.location.href = "admin.html";
        break;
      default:
        window.location.href = "dashboard.html";
    }
  }

  // 4. Password Visibility Toggle
  const toggleBtn = document.getElementById("togglePasswordBtn");
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      toggleBtn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
    });
  }

  // 5. Forgot Password Modal Toggles
  const forgotModal = document.getElementById("forgotPassModal");
  const openModalBtn = document.getElementById("openForgotModalBtn");
  const closeModalBtn = document.getElementById("closeForgotModalBtn");
  const dismissModalBtn = document.getElementById("dismissForgotModalBtn");

  function openModal() {
    if (forgotModal) forgotModal.classList.add("active");
  }

  function closeModal() {
    if (forgotModal) forgotModal.classList.remove("active");
  }

  if (openModalBtn) openModalBtn.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (dismissModalBtn) dismissModalBtn.addEventListener("click", closeModal);
});