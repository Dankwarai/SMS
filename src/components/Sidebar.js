import api from '../services/api.js';

export function renderSidebar() {
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar glass';

  sidebar.innerHTML = `
    <div class="brand">
      <div class="brand-logo">S</div>
      <h3>SMS Pro</h3>
    </div>
    
    <nav class="nav">
      <a href="#" class="nav-link active">
        <span>📊</span>
        <span>Dashboard</span>
      </a>
      <a href="#" class="nav-link" data-view="AIInsights">
        <span>🧠</span>
        <span>AI Insights</span>
      </a>
      <a href="#" class="nav-link">
        <span>👥</span>
        <span>Students</span>
      </a>
      <a href="#" class="nav-link">
        <span>👨‍🏫</span>
        <span>Teachers</span>
      </a>
      <a href="#" class="nav-link">
        <span>📚</span>
        <span>Courses</span>
      </a>
      <a href="#" class="nav-link">
        <span>📝</span>
        <span>Exams</span>
      </a>
      <a href="#" class="nav-link" data-view="Analytics">
        <span>📈</span>
        <span>Analytics</span>
      </a>
      <a href="#" class="nav-link" data-view="Attendance">
        <span>📅</span>
        <span>Attendance</span>
      </a>
      <a href="#" class="nav-link" data-view="Gradebook">
        <span>📚</span>
        <span>Academics</span>
      </a>
      <a href="#" class="nav-link" data-view="Finance">
        <span>💰</span>
        <span>Finance</span>
      </a>
      <a href="#" class="nav-link" data-view="ParentPortal">
        <span>👨‍👩‍👧‍👦</span>
        <span>Parent Portal</span>
      </a>
      <a href="#" class="nav-link">
        <span>📅</span>
        <span>Timetable</span>
      </a>
      <a href="#" class="nav-link" data-view="Calendar">
        <span>🗓️</span>
        <span>Calendar</span>
      </a>
      <a href="#" class="nav-link">
        <span>📚</span>
        <span>Library</span>
      </a>
      <a href="#" class="nav-link">
        <span>🚌</span>
        <span>Transport</span>
      </a>
      <a href="#" class="nav-link">
        <span>💬</span>
        <span>Messages</span>
      </a>
      <a href="#" class="nav-link">
        <span>⚙️</span>
        <span>Settings</span>
      </a>
    </nav>
    
    <div style="padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
      <a href="#" id="logout-btn" class="nav-link" style="color: #ff8787;">
        <span>🚪</span>
        <span>Logout</span>
      </a>
    </div>
  `;

  // Add click handlers for active state
  const links = sidebar.querySelectorAll('.nav-link:not(#logout-btn)');
  const role = api.auth.getUserRole();

  // Hide specific links based on role
  if (role === 'student') {
    // Students only see Dashboard, Exams, Courses, Settings
    links.forEach(link => {
      const text = link.querySelector('span:last-child').textContent;
      if (['Students', 'Teachers', 'Finance'].includes(text)) {
        link.style.display = 'none';
      }
    });
  } else if (role === 'teacher') {
    // Teachers don't see Finance or Teachers directory (themselves)
    links.forEach(link => {
      const text = link.querySelector('span:last-child').textContent;
      if (['Finance', 'Teachers'].includes(text)) {
        link.style.display = 'none';
      }
    });
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const text = link.querySelector('span:last-child').textContent;
      // Map 'Finance' text to 'Finance' view (already matches)
      const event = new CustomEvent('navigate', { detail: { view: text } });
      document.dispatchEvent(event);
    });
  });

  sidebar.querySelector('#logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    if (window.handleLogout) window.handleLogout();
  });

  // Add overlay for mobile
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
  });

  return sidebar;
}
