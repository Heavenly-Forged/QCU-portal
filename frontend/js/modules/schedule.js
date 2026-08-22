// frontend/js/modules/schedule.js

const mockScheduleData = [
  {
    code: "ITEC 311",
    description: "Human Computer Interaction",
    lecUnits: 2,
    labUnits: 1,
    totalUnits: 3,
    day: "Monday",
    time: "08:00 AM - 11:00 AM",
    room: "SB-LAB 3",
    professor: "Prof. Maria Santos"
  },
  {
    code: "ITEC 312",
    description: "Information Assurance & Security",
    lecUnits: 2,
    labUnits: 1,
    totalUnits: 3,
    day: "Monday",
    time: "01:00 PM - 04:00 PM",
    room: "SB-204",
    professor: "Prof. Roberto Reyes"
  },
  {
    code: "ITEC 313",
    description: "Mobile Application Development",
    lecUnits: 2,
    labUnits: 1,
    totalUnits: 3,
    day: "Wednesday",
    time: "09:00 AM - 12:00 PM",
    room: "SB-LAB 1",
    professor: "Prof. Allan Castro"
  },
  {
    code: "GENED 01",
    description: "Ethics",
    lecUnits: 3,
    labUnits: 0,
    totalUnits: 3,
    day: "Friday",
    time: "10:00 AM - 01:00 PM",
    room: "SB-301",
    professor: "Prof. Elena Dimagiba"
  }
];

function renderSchedule(scheduleList) {
  const tbody = document.getElementById('scheduleTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  scheduleList.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${item.code}</strong></td>
      <td>${item.description}</td>
      <td>
        <strong>${item.totalUnits}</strong>
        <div class="units-breakdown">(${item.lecUnits} Lec / ${item.labUnits} Lab)</div>
      </td>
      <td><span class="day-tag">${item.day}</span></td>
      <td>${item.time}</td>
      <td><strong>${item.room}</strong></td>
      <td>${item.professor}</td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderSchedule(mockScheduleData);
});