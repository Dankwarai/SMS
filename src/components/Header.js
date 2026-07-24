export function renderHeader() {
  const header = document.createElement('header');
  header.className = 'header glass';

  header.innerHTML = `
    <div class="flex items-center">
      <button id="hamburger-btn" class="hamburger-btn">☰</button>
      <div class="search-bar">
        <span>🔍</span>
        <input type="text" class="search-input" placeholder="Search...">
      </div>
    </div>
    
    <div class="user-profile">
      <div class="notifications">
        <button>🔔</button>
      </div>
      <div class="avatar">
        <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="User">
      </div>
      <div>
        <h4>Admin User</h4>
        <small class="text-muted">Administrator</small>
      </div>
    </div>
  `;

  // Event Listeners
  const hamburgerBtn = header.querySelector('#hamburger-btn');
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      const overlay = document.querySelector('.sidebar-overlay');
      if (sidebar) sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('visible');
    });
  }

  return header;
}
