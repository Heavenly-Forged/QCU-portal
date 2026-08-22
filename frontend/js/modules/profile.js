// frontend/js/modules/profile.js

const profileData = {
  student: {
    fullName: "Juan Dela Cruz",
    studentId: "23-2365",
    program: "Bachelor of Science in Information Technology",
    yearSection: "3rd Year - SBIT-3A",
    email: "juan.delacruz@qcu.edu.ph",
    contact: "+63 912 345 6789",
    campus: "San Bartolome Main Campus",
    admissionDate: "August 2023",
    status: "Regular - Enrolled"
  },
  registrarDocs: [
    {
      name: "PSA / NSO Birth Certificate",
      type: "Original / Photocopy",
      dateSubmitted: "2023-08-10",
      status: "Verified",
      badgeClass: "badge-success"
    },
    {
      name: "High School / SHS Diploma",
      type: "Certified True Copy",
      dateSubmitted: "2023-08-10",
      status: "Verified",
      badgeClass: "badge-success"
    },
    {
      name: "High School Report Card (Form 138)",
      type: "Original Copy",
      dateSubmitted: "2023-08-10",
      status: "Verified",
      badgeClass: "badge-success"
    },
    {
      name: "Transcript of Records (Form 137)",
      type: "Official Copy",
      dateSubmitted: "2023-09-02",
      status: "Verified",
      badgeClass: "badge-success"
    },
    {
      name: "Certificate of Good Moral Character",
      type: "Original Copy",
      dateSubmitted: "2023-08-10",
      status: "Verified",
      badgeClass: "badge-success"
    },
    {
      name: "Barangay Clearance / Proof of Residency",
      type: "Photocopy",
      dateSubmitted: "—",
      status: "Pending",
      badgeClass: "badge-warning"
    }
  ],
  medicalDocs: [
    {
      requirement: "Medical Certificate (Med Cert)",
      facility: "QCU Health Services Clinic",
      dateCleared: "2026-07-15",
      status: "Cleared",
      badgeClass: "badge-success"
    },
    {
      requirement: "Chest X-Ray",
      facility: "QC Health Department Center",
      dateCleared: "2026-07-12",
      status: "Cleared",
      badgeClass: "badge-success"
    },
    {
      requirement: "Complete Blood Count (CBC)",
      facility: "QC Health Department Center",
      dateCleared: "2026-07-12",
      status: "Cleared",
      badgeClass: "badge-success"
    },
    {
      requirement: "Routine Urinalysis",
      facility: "QC Health Department Center",
      dateCleared: "2026-07-12",
      status: "Cleared",
      badgeClass: "badge-success"
    }
  ]
};

function renderProfile(data) {
  // Bind Student Profile Metadata
  document.getElementById('studentFullName').textContent = data.student.fullName;
  document.getElementById('studentProgram').textContent = data.student.program;
  document.getElementById('studentIdDisplay').textContent = data.student.studentId;
  document.getElementById('yearSectionDisplay').textContent = data.student.yearSection;
  document.getElementById('studentEmailDisplay').textContent = data.student.email;
  document.getElementById('studentContactDisplay').textContent = data.student.contact;
  document.getElementById('campusDisplay').textContent = data.student.campus;
  document.getElementById('admissionDateDisplay').textContent = data.student.admissionDate;

  // 1. Render Registrar Documents
  const docTbody = document.getElementById('documentTableRows');
  docTbody.innerHTML = '';
  let pendingDocCount = 0;

  data.registrarDocs.forEach(doc => {
    if (doc.status === 'Pending') pendingDocCount++;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${doc.name}</strong></td>
      <td>${doc.type}</td>
      <td>${doc.dateSubmitted}</td>
      <td><span class="badge ${doc.badgeClass}">${doc.status}</span></td>
    `;
    docTbody.appendChild(row);
  });

  const docSummaryBadge = document.getElementById('docSummaryBadge');
  if (pendingDocCount === 0) {
    docSummaryBadge.textContent = 'All Documents Submitted';
    docSummaryBadge.className = 'badge badge-success';
  } else {
    docSummaryBadge.textContent = `${pendingDocCount} Pending Document${pendingDocCount > 1 ? 's' : ''}`;
    docSummaryBadge.className = 'badge badge-warning';
  }

  // 2. Render Medical Clearances
  const medTbody = document.getElementById('medicalTableRows');
  medTbody.innerHTML = '';

  data.medicalDocs.forEach(med => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${med.requirement}</strong></td>
      <td>${med.facility}</td>
      <td>${med.dateCleared}</td>
      <td><span class="badge ${med.badgeClass}">${med.status}</span></td>
    `;
    medTbody.appendChild(row);
  });
}

function initPasswordModal() {
  const modal = document.getElementById('passwordModal');
  const openBtn = document.getElementById('openChangePassModalBtn');
  const closeBtn = document.getElementById('closePassModalBtn');
  const cancelBtn = document.getElementById('cancelPassModalBtn');
  const form = document.getElementById('changePasswordForm');
  const alertBox = document.getElementById('passwordAlertBox');

  const openModal = () => {
    modal.classList.add('active');
    form.reset();
    alertBox.style.display = 'none';
  };

  const closeModal = () => {
    modal.classList.remove('active');
  };

  openBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);

  // Close on backdrop click
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Handle Form Submission
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const currentPass = document.getElementById('currentPassword').value.trim();
    const newPass = document.getElementById('newPassword').value.trim();
    const confirmPass = document.getElementById('confirmPassword').value.trim();

    if (!currentPass || !newPass || !confirmPass) {
      showAlert('All fields are required.', 'error');
      return;
    }

    if (newPass.length < 8) {
      showAlert('New password must be at least 8 characters long.', 'error');
      return;
    }

    if (newPass !== confirmPass) {
      showAlert('New password and confirmation do not match.', 'error');
      return;
    }

    // Mock API Success State (Replaced with FastAPI endpoint in Phase 2)
    showAlert('Password updated successfully!', 'success');
    setTimeout(() => {
      closeModal();
    }, 1200);
  });

  function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = `alert-message alert-${type}`;
    alertBox.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderProfile(profileData);
  initPasswordModal();
});