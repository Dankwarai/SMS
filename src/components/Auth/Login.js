import api from '../../services/api.js';

export function renderLogin(onLogin, onRegisterClick) {
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
      <h2 class="auth-title">Welcome Back</h2>
      <p class="auth-subtitle">Sign in to continue to SMS Pro</p>
    </div>

    <form id="login-form">
      <div class="auth-input-group">
        <label class="auth-label">Email Address</label>
        <input type="email" id="email" class="auth-input" placeholder="name@school.com" value="admin@school.com" required>
      </div>
      
      <div class="auth-input-group">
        <label class="auth-label">Password</label>
        <input type="password" id="password" class="auth-input" placeholder="••••••••" value="password" required>
      </div>

      <div class="role-selector">
        <div class="role-option">
          <input type="radio" name="role" id="role-admin" value="admin" class="role-input" checked>
          <label for="role-admin" class="role-label">Admin</label>
        </div>
        <div class="role-option">
          <input type="radio" name="role" id="role-teacher" value="teacher" class="role-input">
          <label for="role-teacher" class="role-label">Teacher</label>
        </div>
        <div class="role-option">
          <input type="radio" name="role" id="role-student" value="student" class="role-input">
          <label for="role-student" class="role-label">Student</label>
        </div>
      </div>

      <button type="submit" class="btn-auth">Sign In</button>
    </form>

    <div class="auth-footer">
      <p>Don't have an account? <a href="#" id="go-register" class="auth-link">Create Account</a></p>
    </div>
  `;

  container.appendChild(card);

  const form = card.querySelector('#login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = card.querySelector('#email').value;
    const password = card.querySelector('#password').value;
    const role = card.querySelector('input[name="role"]:checked').value;
    const btn = form.querySelector('button');

    try {
      const originalText = btn.textContent;
      btn.textContent = 'Signing in...';
      btn.disabled = true;

      await api.auth.login(email, password, role);

      if (onLogin) onLogin(role);
    } catch (error) {
      alert(error.message || 'Login failed');
      btn.textContent = 'Sign In';
      btn.disabled = false;
    }
  });

  card.querySelector('#go-register').addEventListener('click', (e) => {
    e.preventDefault();
    if (onRegisterClick) onRegisterClick();
  });

  return container;
}
