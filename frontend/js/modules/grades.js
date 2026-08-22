// frontend/js/modules/grades.js

// 1. Mock Academic Records (Contract for backend)
const academicRecords = {
  "1st-2026-2027": [
    { code: "ITEC 311", description: "Human Computer Interaction", units: 3, instructor: "Prof. Santos", raw: 94, equiv: 1.25, remark: "PASSED" },
    { code: "ITEC 312", description: "Information Assurance & Security", units: 3, instructor: "Prof. Reyes", raw: 91, equiv: 1.50, remark: "PASSED" },
    { code: "ITEC 313", description: "Mobile Application Development", units: 3, instructor: "Prof. Castro", raw: 98, equiv: 1.00, remark: "PASSED" },
    { code: "GENED 01", description: "Ethics", units: 3, instructor: "Prof. Dimagiba", raw: 88, equiv: 1.75, remark: "PASSED" }
  ]
};

// 2. GWA Calculation Function
function computeSemesterGwa(records) {
  let totalUnits = 0;
  let totalHonorPoints = 0;

  records.forEach(subject => {
    totalUnits += subject.units;
    totalHonorPoints += (subject.equiv * subject.units);
  });

  const gwa = totalHonorPoints / totalUnits;
  return {
    gwa: gwa.toFixed(2),
    totalUnits: totalUnits
  };
}

// 3. Render Grades to DOM
function renderGrades(semesterKey) {
  const records = academicRecords[semesterKey] || [];
  const tbody = document.getElementById('gradesTableBody');
  tbody.innerHTML = '';

  records.forEach(sub => {
    const row = document.createElement('tr');
    
    const badgeClass = sub.remark === "PASSED" ? "badge-pass" : "badge-fail";

    row.innerHTML = `
      <td><strong>${sub.code}</strong></td>
      <td>${sub.description}</td>
      <td>${sub.units}</td>
      <td>${sub.instructor}</td>
      <td>${sub.raw}</td>
      <td><strong>${sub.equiv.toFixed(2)}</strong></td>
      <td><span class="${badgeClass}">${sub.remark}</span></td>
    `;
    tbody.appendChild(row);
  });

  // Calculate & update stats
  const stats = computeSemesterGwa(records);
  document.getElementById('semesterGwa').textContent = stats.gwa;
  document.getElementById('totalUnits').textContent = `${stats.totalUnits} Units`;
}

// 4. Setup Event Listeners & Modal Controls
document.addEventListener('DOMContentLoaded', () => {
  renderGrades("1st-2026-2027");

  const modal = document.getElementById('gradeScaleModal');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');

  openBtn.addEventListener('click', () => modal.classList.add('active'));
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));

  // Close when clicking background backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
});