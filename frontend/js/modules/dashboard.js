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