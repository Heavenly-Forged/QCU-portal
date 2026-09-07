// frontend/js/modules/dashboard.js

// Mock Dashboard Data Contract
const dashboardData = {
  student: {
    fullName: "Juan Dela Cruz",
    studentId: "23-2365",
    gwa: "1.35",
    enrolledUnits: 12
  },
  todayClasses: [
    {
      code: "ITEC 311",
      description: "Human Computer Interaction",
      time: "08:00 AM - 11:00 AM",
      room: "SB-LAB 3",
      instructor: "Prof. Maria Santos"
    },
    {
      code: "ITEC 312",
      description: "Information Assurance & Security",
      time: "01:00 PM - 04:00 PM",
      room: "SB-204",
      instructor: "Prof. Roberto Reyes"
    }
  ],
  announcements: [
    {
      title: "Midterm Examination Schedule Released",
      content: "Please check your respective subject portals for specific laboratory and lecture schedules.",
      date: "August 20, 2026"
    },
    {
      title: "UniFAST Grant Verification Notice",
      content: "All officially enrolled regular students have been cleared for CHED-UniFAST funding for the current term.",
      date: "August 18, 2026"
    },
    {
      title: "University SASD Org Fair Registration",
      content: "Accredited student organizations are inviting students to join during the online recruitment fair.",
      date: "August 15, 2026"
    }
  ]
};

function renderDashboard(data) {
  // Render Metrics
  document.getElementById('studentHeaderName').textContent = data.student.fullName;
  document.getElementById('dashGwa').textContent = data.student.gwa;
  document.getElementById('dashUnits').textContent = `${data.student.enrolledUnits} Units`;

  // Render Classes
  const scheduleTable = document.getElementById('dashScheduleRows');
  scheduleTable.innerHTML = '';
  
  data.todayClasses.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${item.code}</strong></td>
      <td>${item.description}</td>
      <td>${item.time}</td>
      <td>${item.room}</td>
      <td>${item.instructor}</td>
    `;
    scheduleTable.appendChild(row);
  });

  // Render Announcements
  const feed = document.getElementById('announcementFeed');
  feed.innerHTML = '';

  data.announcements.forEach(item => {
    const article = document.createElement('div');
    article.className = 'announcement-item';
    article.innerHTML = `
      <h5>${item.title}</h5>
      <p>${item.content}</p>
      <span class="announcement-date">${item.date}</span>
    `;
    feed.appendChild(article);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderDashboard(dashboardData);
});

// frontend/js/dashboard.js
const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

async function loadStudentProfile() {
  const token = sessionStorage.getItem("access_token");

  // If no token exists, bounce back to login
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/students/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401 || response.status === 403) {
      // Token expired or invalid
      sessionStorage.clear();
      window.location.href = "index.html";
      return;
    }

    const student = await response.json();

    // Populate your DOM elements with real database fields
    // (Adjust element IDs to match your dashboard HTML)
    const nameElem = document.getElementById("student-name");
    const idElem = document.getElementById("student-id");
    const programElem = document.getElementById("student-program");

    if (nameElem) nameElem.textContent = `${student.first_name} ${student.last_name}`;
    if (idElem) idElem.textContent = student.account_number;
    if (programElem) programElem.textContent = student.program;

  } catch (error) {
    console.error("Failed to load student profile:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadStudentProfile);

document.addEventListener("DOMContentLoaded", async () => {
  const token = sessionStorage.getItem("access_token");

  // 1. Guard check: if not logged in, bounce back to login page
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  try {
    // 2. Fetch authenticated student profile
    const response = await fetch(`${API_BASE_URL}/students/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401 || response.status === 403) {
      // Token expired or invalid
      sessionStorage.clear();
      window.location.href = "index.html";
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to load profile data.");
    }

    const student = await response.json();
    console.log("Loaded student profile:", student);

    // 3. Populate DOM elements
    // Update these IDs to match your dashboard.html elements:
    const nameElem = document.getElementById("studentName");
    const idElem = document.getElementById("studentIdDisplay");
    const programElem = document.getElementById("studentProgram");
    const sectionElem = document.getElementById("studentSection");
    const medicalStatusElem = document.getElementById("medicalStatus");
    const docsStatusElem = document.getElementById("docsStatus");

    if (nameElem) nameElem.textContent = `${student.first_name} ${student.last_name}`;
    if (idElem) idElem.textContent = student.account_number;
    if (programElem) programElem.textContent = student.program;
    if (sectionElem) sectionElem.textContent = student.section || "N/A";
    if (medicalStatusElem) medicalStatusElem.textContent = student.medical_status;
    if (docsStatusElem) docsStatusElem.textContent = student.documents_status;

  } catch (err) {
    console.error("Dashboard error:", err);
  }

  // 4. Logout handler
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.clear();
      window.location.href = "index.html";
    });
  }
});