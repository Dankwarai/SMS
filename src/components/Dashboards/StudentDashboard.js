export function renderStudentDashboard() {
  const container = document.createElement('div');
  container.className = 'dashboard-container animate-fade-in';
  container.style.padding = '2rem';

  container.innerHTML = `
    <div class="dashboard-header">
      <div class="welcome-text">
        <h1>Student Dashboard 🎓</h1>
        <p class="text-muted">Welcome back, John! Keep up the good work.</p>
      </div>
      <div class="date-badge">
        <span>📅</span>
        ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="stat-card animate-slide-in" style="animation-delay: 0.1s; color: var(--color-primary);">
        <div class="stat-card-header">
          <span class="stat-label">Attendance</span>
          <div class="stat-icon" style="background: #e7f5ff; color: var(--color-primary);">📊</div>
        </div>
        <div class="stat-value">92%</div>
        <div class="stat-trend trend-up">
          <span>Present</span>
        </div>
      </div>

      <div class="stat-card animate-slide-in" style="animation-delay: 0.2s; color: #0ca678;">
        <div class="stat-card-header">
          <span class="stat-label">Assignments</span>
          <div class="stat-icon" style="background: #e6fcf5; color: #0ca678;">📝</div>
        </div>
        <div class="stat-value">12/15</div>
        <div class="stat-trend trend-up">
          <span>Completed</span>
        </div>
      </div>

      <div class="stat-card animate-slide-in" style="animation-delay: 0.3s; color: #f59f00;">
        <div class="stat-card-header">
          <span class="stat-label">Next Exam</span>
          <div class="stat-icon" style="background: #fff9db; color: #f59f00;">⏰</div>
        </div>
        <div class="stat-value" style="font-size: 1.5rem;">Maths 101</div>
        <div class="stat-trend">
          <span class="text-muted">Tomorrow, 10 AM</span>
        </div>
      </div>
    </div>

    <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 2rem;">
      <div class="card animate-slide-in" style="animation-delay: 0.4s;">
        <h3 style="margin-bottom: 1.5rem;">My Schedule 📅</h3>
        <div class="timetable">
          <div class="timetable-header">Time</div>
          <div class="timetable-header">Mon</div>
          <div class="timetable-header">Tue</div>
          <div class="timetable-header">Wed</div>
          <div class="timetable-header">Thu</div>
          <div class="timetable-header">Fri</div>
          
          <div class="time-slot timetable-cell">09:00</div>
          <div class="timetable-cell active">Maths</div>
          <div class="timetable-cell">Physics</div>
          <div class="timetable-cell">Chem</div>
          <div class="timetable-cell">Maths</div>
          <div class="timetable-cell">English</div>
        </div>
      </div>

      <div class="card animate-slide-in" style="animation-delay: 0.5s;">
        <h3 style="margin-bottom: 1.5rem;">Recent Grades 🏆</h3>
        <ul style="list-style: none; margin-bottom: 1.5rem;">
          <li style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #eee;">
            <span>Physics Quiz</span>
            <span style="font-weight: 600; color: #0ca678;">A (95%)</span>
          </li>
          <li style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #eee;">
            <span>History Essay</span>
            <span style="font-weight: 600; color: var(--color-primary);">B+ (88%)</span>
          </li>
          <li style="display: flex; justify-content: space-between; padding: 0.75rem 0;">
            <span>Maths Midterm</span>
            <span style="font-weight: 600; color: #f59f00;">B (82%)</span>
          </li>
        </ul>

        <h3 style="margin-bottom: 1rem;">Quick Actions ⚡</h3>
        <div class="flex flex-col gap-2">
           <button class="btn-primary" style="background: #f1f3f5; color: var(--color-text-main); justify-content: flex-start; gap: 0.5rem;">
             <span>📄</span> Download Report Card
           </button>
           <button class="btn-primary" style="background: #f1f3f5; color: var(--color-text-main); justify-content: flex-start; gap: 0.5rem;">
             <span>📚</span> View Course Syllabus
           </button>
        </div>
      </div>
    </div>
  `;

  return container;
}
