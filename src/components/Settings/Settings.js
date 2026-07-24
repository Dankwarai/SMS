export function renderSettings() {
  const container = document.createElement('div');
  container.className = 'settings-container';
  container.style.padding = '2rem';

  const role = localStorage.getItem('sms-role') || 'admin';
  const isAdmin = role === 'admin';

  container.innerHTML = `
    <h1 style="margin-bottom: 2rem;">Settings ⚙️</h1>
    
    <div class="settings-layout">
      <div class="settings-sidebar">
        ${isAdmin ? '<div class="settings-nav-item active" data-tab="general">General</div>' : ''}
        ${isAdmin ? '<div class="settings-nav-item" data-tab="institution">Institution</div>' : ''}
        <div class="settings-nav-item ${!isAdmin ? 'active' : ''}" data-tab="profile">Profile</div>
        <div class="settings-nav-item" data-tab="appearance">Appearance</div>
        <div class="settings-nav-item" data-tab="notifications">Notifications</div>
      </div>
      
      <div class="settings-content">
        <!-- General Tab -->
        ${isAdmin ? `
        <div id="tab-general" class="tab-content">
          <h2 style="margin-bottom: 1.5rem;">General Settings</h2>
          <form id="general-form">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">School Name</label>
              <input type="text" class="form-control" value="SMS Pro School" required>
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">School Address</label>
              <textarea class="form-control" rows="2">123 Education Lane, Cityville</textarea>
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Contact Email</label>
              <input type="email" class="form-control" value="admin@sms.edu" required>
            </div>
            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label class="form-label">Phone Number</label>
              <input type="tel" class="form-control" value="+1 234 567 8900">
            </div>
            <button type="submit" class="btn-primary" style="width: auto;">Save Changes</button>
          </form>
        </div>
        ` : ''}

        <!-- Institution Tab -->
        ${isAdmin ? `
        <div id="tab-institution" class="tab-content" style="display: none;">
          <h2 style="margin-bottom: 1.5rem;">Institution Configuration 🌍</h2>
          <form id="institution-form">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Institution Type</label>
              <select class="form-control" id="inst-type">
                <option value="secondary">Secondary School</option>
                <option value="technical">Technical Institute</option>
                <option value="university">University / College</option>
                <option value="vocational">Vocational Center</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Primary Language</label>
              <select class="form-control" id="inst-lang">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="ar">Arabic</option>
                <option value="pt">Portuguese</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group" style="margin-bottom: 1rem;">
                <label class="form-label">Currency</label>
                <select class="form-control" id="inst-currency">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="NGN">NGN (₦)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label class="form-label">Timezone</label>
                <select class="form-control" id="inst-timezone">
                  <option value="UTC">UTC</option>
                  <option value="EST">EST (UTC-5)</option>
                  <option value="PST">PST (UTC-8)</option>
                  <option value="GMT">GMT (UTC+0)</option>
                  <option value="WAT">WAT (UTC+1)</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn-primary" style="width: auto;">Save Configuration</button>
          </form>
        </div>
        ` : ''}
        
        <!-- Profile Tab -->
        <div id="tab-profile" class="tab-content" style="display: ${!isAdmin ? 'block' : 'none'};">
          <h2 style="margin-bottom: 1.5rem;">Profile Settings</h2>
          <div class="flex items-center gap-4" style="margin-bottom: 2rem;">
            <div class="avatar" style="width: 80px; height: 80px;">
              <img src="https://ui-avatars.com/api/?name=Admin+User&background=random&size=160" alt="Admin">
            </div>
            <button class="btn-primary" style="background: #eee; color: #333; width: auto; padding: 0.5rem 1rem;">Change Photo</button>
          </div>
          
          <form id="profile-form">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-control" value="Admin User">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" value="admin@sms.edu" disabled style="background: #f9f9f9;">
            </div>
            
            <h3 style="margin: 1.5rem 0 1rem; font-size: 1.1rem;">Change Password</h3>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Current Password</label>
              <input type="password" class="form-control">
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">New Password</label>
              <input type="password" class="form-control">
            </div>
            <button type="submit" class="btn-primary" style="width: auto;">Update Profile</button>
          </form>
        </div>
        
        <!-- Appearance Tab -->
        <div id="tab-appearance" class="tab-content" style="display: none;">
          <h2 style="margin-bottom: 1.5rem;">Appearance</h2>
          
          <div style="margin-bottom: 2rem;">
            <label class="form-label" style="display: block; margin-bottom: 1rem;">Theme Mode</label>
            <div class="flex gap-4">
              <label class="theme-option active">
                <input type="radio" name="theme" value="light" checked style="display: none;">
                <div style="position: absolute; bottom: 10px; left: 0; width: 100%; text-align: center; font-size: 0.8rem;">Light</div>
              </label>
              <label class="theme-option" style="background: #333; border-color: #333;">
                <input type="radio" name="theme" value="dark" style="display: none;">
                <div style="position: absolute; bottom: 10px; left: 0; width: 100%; text-align: center; font-size: 0.8rem; color: white;">Dark</div>
              </label>
            </div>
          </div>
          
          <div>
            <label class="form-label" style="display: block; margin-bottom: 1rem;">Accent Color</label>
            <div class="flex gap-2">
              <div class="accent-color-option" data-color="#5c7cfa" data-hue="225" style="width: 30px; height: 30px; border-radius: 50%; background: #5c7cfa; cursor: pointer; border: 2px solid white; box-shadow: 0 0 0 2px #5c7cfa;"></div>
              <div class="accent-color-option" data-color="#0ca678" data-hue="160" style="width: 30px; height: 30px; border-radius: 50%; background: #0ca678; cursor: pointer;"></div>
              <div class="accent-color-option" data-color="#fa5252" data-hue="0" style="width: 30px; height: 30px; border-radius: 50%; background: #fa5252; cursor: pointer;"></div>
              <div class="accent-color-option" data-color="#f59f00" data-hue="35" style="width: 30px; height: 30px; border-radius: 50%; background: #f59f00; cursor: pointer;"></div>
              <div class="accent-color-option" data-color="#be4bdb" data-hue="280" style="width: 30px; height: 30px; border-radius: 50%; background: #be4bdb; cursor: pointer;"></div>
            </div>
          </div>
        </div>
        
        <!-- Notifications Tab -->
        <div id="tab-notifications" class="tab-content" style="display: none;">
          <h2 style="margin-bottom: 1.5rem;">Notifications</h2>
          <div class="flex flex-col gap-4">
            <label class="flex items-center gap-3">
              <input type="checkbox" checked>
              <span>Email notifications for new admissions</span>
            </label>
            <label class="flex items-center gap-3">
              <input type="checkbox" checked>
              <span>Weekly finance reports</span>
            </label>
            <label class="flex items-center gap-3">
              <input type="checkbox">
              <span>SMS alerts for absent students</span>
            </label>
          </div>
          <button class="btn-primary" style="width: auto; margin-top: 1.5rem;">Save Preferences</button>
        </div>
      </div>
    </div>
  `;

  // Tab Switching Logic
  const navItems = container.querySelectorAll('.settings-nav-item');
  const tabContents = container.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Update Nav
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      // Update Content
      const tabId = item.dataset.tab;
      tabContents.forEach(content => {
        content.style.display = content.id === `tab-${tabId}` ? 'block' : 'none';
      });
    });
  });

  // Form Handling (Mock)
  // Form Handling (Mock)

  // --- Appearance Logic ---

  // Theme Toggle
  const themeInputs = container.querySelectorAll('input[name="theme"]');
  themeInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const theme = e.target.value;
      document.documentElement.setAttribute('data-theme', theme);

      // Update UI state
      container.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
      e.target.closest('.theme-option').classList.add('active');

      // Save to localStorage (mock)
      localStorage.setItem('sms-theme', theme);
    });
  });

  // Accent Color Picker
  const accentColors = container.querySelectorAll('.accent-color-option');
  accentColors.forEach(option => {
    option.addEventListener('click', () => {
      const color = option.dataset.color;
      const hue = option.dataset.hue;

      // Update CSS Variables
      document.documentElement.style.setProperty('--primary-hue', hue);

      // Update UI state
      accentColors.forEach(opt => {
        opt.style.boxShadow = 'none';
        opt.style.border = 'none';
      });
      option.style.border = '2px solid white';
      option.style.boxShadow = `0 0 0 2px ${color}`;

      // Save to localStorage (mock)
      localStorage.setItem('sms-accent-hue', hue);
    });
  });

  // Initialize from saved state (Mock)
  const savedTheme = localStorage.getItem('sms-theme');
  if (savedTheme) {
    const input = container.querySelector(`input[value="${savedTheme}"]`);
    if (input) {
      input.click();
    }
  }

  // Institution Settings Logic
  if (isAdmin) {
    const instForm = container.querySelector('#institution-form');
    if (instForm) {
      // Load saved settings
      const settings = JSON.parse(localStorage.getItem('sms-institution-settings') || '{}');
      if (settings.type) container.querySelector('#inst-type').value = settings.type;
      if (settings.lang) container.querySelector('#inst-lang').value = settings.lang;
      if (settings.currency) container.querySelector('#inst-currency').value = settings.currency;
      if (settings.timezone) container.querySelector('#inst-timezone').value = settings.timezone;

      instForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newSettings = {
          type: container.querySelector('#inst-type').value,
          lang: container.querySelector('#inst-lang').value,
          currency: container.querySelector('#inst-currency').value,
          timezone: container.querySelector('#inst-timezone').value
        };
        localStorage.setItem('sms-institution-settings', JSON.stringify(newSettings));
        alert('Institution configuration saved successfully!');
      });
    }
  }

  return container;
}
