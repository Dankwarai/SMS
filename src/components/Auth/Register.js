import api from '../../services/api.js';

export function renderRegister(onRegister, onLoginClick) {
  const container = document.createElement('div');
  container.className = 'auth-container';

  // Add overlay
  const overlay = document.createElement('div');
  overlay.className = 'auth-overlay';
  container.appendChild(overlay);

  const card = document.createElement('div');
  card.className = 'auth-card';

  card.innerHTML = `
    <div class="auth-header">
      <div class="auth-logo">S</div>
      <h2 class="auth-title">Create Account</h2>
      <p class="auth-subtitle">Join SMS Pro today</p>
    </div>

    <form id="register-form">
      <div class="auth-input-group">
        <label class="auth-label">Full Name</label>
        <input type="text" id="name" class="auth-input" placeholder="Full Name" required>
      </div>

      <div class="auth-input-group">
        <label class="auth-label">Email Address</label>
        <input type="email" id="email" class="auth-input" placeholder="email@example.com" required>
      </div>
      
      <div class="auth-input-group">
        <label class="auth-label">Password</label>
        <input type="password" id="password" class="auth-input" placeholder="••••••••" required>
      </div>

      <div class="role-selector">
        <div class="role-option">
          <input type="radio" name="role" id="reg-role-student" value="student" class="role-input" checked>
          <label for="reg-role-student" class="role-label">Student</label>
        </div>
        <div class="role-option">
          <input type="radio" name="role" id="reg-role-teacher" value="teacher" class="role-input">
          <label for="reg-role-teacher" class="role-label">Teacher</label>
        </div>
        <div class="role-option">
          <input type="radio" name="role" id="reg-role-admin" value="admin" class="role-input">
          <label for="reg-role-admin" class="role-label">Admin</label>
        </div>
      </div>

      <button type="submit" class="btn-auth">Sign Up</button>
    </form>

    <div class="auth-footer">
      <p>Already have an account? <a href="#" id="go-login" class="auth-link">Sign In</a></p>
    </div>
  `;

  container.appendChild(card);

  const form = card.querySelector('#register-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = card.querySelector('#name').value;
    const email = card.querySelector('#email').value;
    const password = card.querySelector('#password').value;
    const role = card.querySelector('input[name="role"]:checked').value;
    const btn = form.querySelector('button');

    try {
      const originalText = btn.textContent;
      btn.textContent = 'Creating account...';
      btn.disabled = true;

      await api.auth.register({ name, email, password, role });

      if (onRegister) onRegister(role);
    } catch (error) {
      alert(error.message || 'Registration failed');
      btn.textContent = 'Sign Up';
      btn.disabled = false;
    }
  });

  card.querySelector('#go-login').addEventListener('click', (e) => {
    e.preventDefault();
    if (onLoginClick) onLoginClick();
  });

  return container;
}
