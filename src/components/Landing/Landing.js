export function renderLanding(onLogin) {
    const container = document.createElement('div');
    container.className = 'landing-container';

    container.innerHTML = `
    <nav class="landing-nav">
      <div class="landing-logo">
        <span>🎓</span> SMS Pro
      </div>
      <button id="login-btn" class="btn-primary" style="width: auto; padding: 0.5rem 1.5rem;">Login</button>
    </nav>
    
    <header class="hero-section">
      <h1 class="hero-title">The Future of School Management</h1>
      <p class="hero-subtitle">Streamline administration, empower teachers, and engage students with the most advanced education platform.</p>
      <div class="hero-buttons">
        <button id="hero-login-btn" class="btn-primary btn-lg">Get Started</button>
        <button class="btn-primary btn-lg" style="background: white; color: var(--color-primary); border: 1px solid #ddd;">Learn More</button>
      </div>
    </header>
    
    <section class="features-section">
      <h2 class="section-title">Everything You Need</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">📝</div>
          <h3 class="feature-title">Smart Exams</h3>
          <p class="feature-desc">Computer-based testing with real-time analytics, question banks, and instant results.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">👥</div>
          <h3 class="feature-title">Student Management</h3>
          <p class="feature-desc">Comprehensive profiles, admission workflows, and attendance tracking in one place.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">💰</div>
          <h3 class="feature-title">Finance & Fees</h3>
          <p class="feature-desc">Automated fee collection, invoice generation, and financial reporting made easy.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">👨‍🏫</div>
          <h3 class="feature-title">Teacher Portal</h3>
          <p class="feature-desc">Manage staff schedules, payroll, and performance with dedicated tools.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3 class="feature-title">Insightful Dashboards</h3>
          <p class="feature-desc">Data-driven insights to help school administrators make better decisions.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3 class="feature-title">Secure & Reliable</h3>
          <p class="feature-desc">Enterprise-grade security to keep your sensitive school data safe and accessible.</p>
        </div>
      </div>
    </section>
    
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-item">
          <h3>500+</h3>
          <p>Schools Trusted</p>
        </div>
        <div class="stat-item">
          <h3>50k+</h3>
          <p>Students Managed</p>
        </div>
        <div class="stat-item">
          <h3>1M+</h3>
          <p>Exams Conducted</p>
        </div>
        <div class="stat-item">
          <h3>99.9%</h3>
          <p>Uptime Guarantee</p>
        </div>
      </div>
    </section>
    
    <footer class="landing-footer">
      <div class="footer-links">
        <a href="#">About Us</a>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">Contact</a>
        <a href="#">Privacy Policy</a>
      </div>
      <p>&copy; 2023 SMS Pro. All rights reserved.</p>
    </footer>
  `;

    // Event Listeners
    const handleLoginClick = () => {
        if (onLogin) onLogin();
    };

    container.querySelector('#login-btn').addEventListener('click', handleLoginClick);
    container.querySelector('#hero-login-btn').addEventListener('click', handleLoginClick);

    return container;
}
