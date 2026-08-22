// frontend/js/modules/orgs.js

// 1. Mock Data Contract (mirroring PostgreSQL 'organizations' table)
const organizationsList = [
  {
    id: "1",
    name: "Association of Computing Students (ACS)",
    code: "ACS",
    category: "ACADEMIC",
    description: "The premier academic student organization for BS Information Technology and Computer Science majors at QCU.",
    adviser: "Prof. Maria Santos",
    president: "Mark Anthony Reyes",
    applyUrl: "https://forms.gle/sampleQCU1"
  },
  {
    id: "2",
    name: "Junior Philippine Institute of Accountants (JPIA)",
    code: "JPIA",
    category: "ACADEMIC",
    description: "Fostering academic excellence, professional readiness, and integrity for Accountancy students.",
    adviser: "Prof. Roberto Gomez",
    president: "Sarah Jenkins",
    applyUrl: "https://forms.gle/sampleQCU2"
  },
  {
    id: "3",
    name: "QCU Entablado Theatre Guild",
    code: "ETG",
    category: "NON_ACADEMIC",
    description: "The official university theater and performing arts guild, cultivating cultural expression and drama.",
    adviser: "Prof. Danica Cruz",
    president: "Liam Perez",
    applyUrl: "https://forms.gle/sampleQCU3"
  },
  {
    id: "4",
    name: "QCU Red Cross Youth Council",
    code: "RCYC",
    category: "NON_ACADEMIC",
    description: "Promoting humanitarian values, first-aid readiness, voluntary blood donation, and disaster response.",
    adviser: "Dr. Elena Bautista",
    president: "Chloe Villanueva",
    applyUrl: "https://forms.gle/sampleQCU4"
  }
];

// Current Filter State
let currentCategory = "ALL";
let currentSearchTerm = "";

// 2. Render Cards
function renderOrganizations() {
  const container = document.getElementById('orgsContainer');
  container.innerHTML = '';

  // Filter Algorithm: Checks category AND search match
  const filtered = organizationsList.filter(org => {
    const matchesCategory = currentCategory === "ALL" || org.category === currentCategory;
    const matchesSearch = org.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                          org.code.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                          org.description.toLowerCase().includes(currentSearchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = container.innerHTML = `<p class="empty-state-message">No results found.</p>`;
    return;
  }

  filtered.forEach(org => {
    const isAcademic = org.category === "ACADEMIC";
    const badgeClass = isAcademic ? "badge-academic" : "badge-non-academic";
    const badgeText = isAcademic ? "Academic" : "Non-Academic";

    const card = document.createElement('div');
    card.className = 'org-card';
    card.innerHTML = `
      <div>
        <div class="org-header">
          <div class="org-avatar">${org.code.slice(0, 3)}</div>
          <div class="org-title">
            <h3>${org.name}</h3>
            <span class="org-badge ${badgeClass}">${badgeText}</span>
          </div>
        </div>
        <p class="org-desc">${org.description}</p>
      </div>

      <div>
        <div class="org-meta">
          <div><strong>Adviser:</strong> ${org.adviser}</div>
          <div><strong>President:</strong> ${org.president}</div>
        </div>
        <a href="${org.applyUrl}" target="_blank" class="org-btn" style="display: block;">Join / Inquire</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// 3. Setup Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderOrganizations();

  // Search input typing listener
  document.getElementById('searchInput').addEventListener('input', (e) => {
    currentSearchTerm = e.target.value;
    renderOrganizations();
  });

  // Category Tab listeners
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-category');
      renderOrganizations();
    });
  });
});