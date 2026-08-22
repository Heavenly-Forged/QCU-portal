// frontend/js/modules/announcements.js

const mockAnnouncements = [
  {
    id: 1,
    title: "Midterm Examination Schedule & Guidelines Released",
    category: "ACADEMIC",
    content: "Please check your respective subject schedules for the upcoming Midterm Examination week. Ensure all laboratory project deliverables and term outputs are submitted prior to examination day.",
    author: "Office of the Vice President for Academic Affairs",
    date: "August 20, 2026"
  },
  {
    id: 2,
    title: "UniFAST Grant Verification & Free Higher Education Subsidy",
    category: "ADMINISTRATIVE",
    content: "All officially enrolled regular undergraduate students have been successfully endorsed for CHED-UniFAST and Local Government of Quezon City tuition subsidies. Your net balance due remains at Php 0.00.",
    author: "Registrar / Accounting Division",
    date: "August 18, 2026"
  },
  {
    id: 3,
    title: "University SASD Org Fair & Student Recruitment 2026",
    category: "EVENTS",
    content: "The Student Affairs and Services Division invites all students to participate in the Annual Student Organization Fair. Meet student leaders, learn about academic societies, and register online.",
    author: "Student Affairs Services Division (SASD)",
    date: "August 15, 2026"
  },
  {
    id: 4,
    title: "Campus Library Physical & Digital Resource Access Update",
    category: "ACADEMIC",
    content: "Access to IEEE Xplore, ACM Digital Library, and physical borrowing limits have been extended for BSIT and engineering thesis researchers across all campus library hubs.",
    author: "University Library Hub",
    date: "August 10, 2026"
  }
];

let selectedCategory = "ALL";
let searchQuery = "";

function renderAnnouncements() {
  const feed = document.getElementById('bulletinFeed');
  if (!feed) return;
  feed.innerHTML = '';

  const filtered = mockAnnouncements.filter(item => {
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    feed.innerHTML = `<p style="text-align: center; color: var(--qcu-text-muted); padding: 40px;">No announcements found matching your criteria.</p>`;
    return;
  }

  filtered.forEach(item => {
    let badgeClass = 'badge-academic';
    if (item.category === 'ADMINISTRATIVE') badgeClass = 'badge-administrative';
    if (item.category === 'EVENTS') badgeClass = 'badge-events';

    const card = document.createElement('article');
    card.className = 'announcement-card';
    card.innerHTML = `
      <div class="card-top">
        <h3>${item.title}</h3>
        <span class="badge-tag ${badgeClass}">${item.category}</span>
      </div>
      <p class="announcement-body">${item.content}</p>
      <div class="announcement-footer">
        <span>Published by: <strong>${item.author}</strong></span>
        <span>${item.date}</span>
      </div>
    `;
    feed.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderAnnouncements();

  // Search input
  const searchInput = document.getElementById('bulletinSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderAnnouncements();
    });
  }

  // Category tab buttons
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedCategory = tab.getAttribute('data-category');
      renderAnnouncements();
    });
  });
});