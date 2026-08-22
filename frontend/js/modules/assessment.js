// frontend/js/modules/assessment.js

// 1. Mock Data Contract mirroring the QCU Assessment Slip
const assessmentSlipData = {
  campus: "San Bartolome Branch",
  studentNo: "23-2365",
  status: "Regular Student",
  graduating: "No",
  dateEnrolled: "7/23/2026 12:00:00 AM",
  enlistedBy: "REGULAR",
  items: [
    { name: "Athletics & Sports Dev.", amount: 50.00 },
    { name: "Comp/Major Lab", amount: 250.00 },
    { name: "Cultural Fee", amount: 100.00 },
    { name: "Development Fee", amount: 400.00 },
    { name: "Guidance Fee", amount: 100.00 },
    { name: "Library Fee", amount: 100.00 },
    { name: "Medical & Dental", amount: 50.00 },
    { name: "Registration", amount: 200.00 },
    { name: "Student Council Fee", amount: 40.00 },
    { name: "Student Handbook", amount: 200.00 },
    { name: "Student Welfare", amount: 50.00 },
    { name: "Tuition 12 Units @ Php303.34/Unit", amount: 3640.08 }
  ]
};

// 2. Rendering Function
function renderAssessmentSlip(data) {
  // Bind Student Metadata
  document.getElementById('campusName').textContent = data.campus;
  document.getElementById('studentNo').textContent = data.studentNo;
  document.getElementById('studentStatus').textContent = data.status;
  document.getElementById('isGraduating').textContent = data.graduating;
  document.getElementById('enrollDate').textContent = data.dateEnrolled;
  document.getElementById('enlistedBy').textContent = data.enlistedBy;

  const tbody = document.getElementById('assessmentRows');
  tbody.innerHTML = ''; // Clear existing contents

  let calculatedTotal = 0;

  // Build Table Rows dynamically
  data.items.forEach(item => {
    calculatedTotal += item.amount;

    const row = document.createElement('tr');
    
    const cellName = document.createElement('td');
    cellName.textContent = item.name;

    const cellAmount = document.createElement('td');
    cellAmount.className = 'text-right';
    cellAmount.textContent = item.amount.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    row.appendChild(cellName);
    row.appendChild(cellAmount);
    tbody.appendChild(row);
  });

  // Calculate & Display Total Sum
  document.getElementById('totalAmountDisplay').textContent = `₱${calculatedTotal.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

// 3. Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
  renderAssessmentSlip(assessmentSlipData);
});