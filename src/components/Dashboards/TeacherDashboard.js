export function renderTeacherDashboard() {
  const container = document.createElement('div');
  container.className = 'dashboard-container animate-fade-in';
  container.style.padding = '2rem';

  container.innerHTML = `
    <div class="dashboard-header">
      <div class="welcome-text">
        <h1>Teacher Dashboard 👨‍🏫</h1>
        <p class="text-muted">Good morning, Prof. Smith! Here is your day at a glance.</p>
      </div>
      <div class="date-badge">
        <span>📅</span>
        ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="stat-card animate-slide-in" style="animation-delay: 0.1s; color: var(--color-primary);">
        <div class="stat-card-header">
          <span class="stat-label">My Classes</span>
          <div class="stat-icon" style="background: #e7f5ff; color: var(--color-primary);">📚</div>
        </div>
        <div class="stat-value">5</div>
        <div class="stat-trend">
          <span class="text-muted">Active Courses</span>
        </div>
      </div>

      <div class="stat-card animate-slide-in" style="animation-delay: 0.2s; color: #0ca678;">
        <div class="stat-card-header">
          <span class="stat-label">Total Students</span>
          <div class="stat-icon" style="background: #e6fcf5; color: #0ca678;">👥</div>
        </div>
        <div class="stat-value">145</div>
        <div class="stat-trend trend-up">
          <span>Across all classes</span>
        </div>
      </div>

      <div class="stat-card animate-slide-in" style="animation-delay: 0.3s; color: #fa5252;">
        <div class="stat-card-header">
          <span class="stat-label">Pending Grading</span>
          <div class="stat-icon" style="background: #ffe3e3; color: #fa5252;">📝</div>
        </div>
        <div class="stat-value">23</div>
        <div class="stat-trend trend-down">
          <span>Submissions</span>
        </div>
      </div>
    </div>

    <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 2rem;">
      <div class="card animate-slide-in" style="animation-delay: 0.4s;">
        <div class="flex justify-between items-center" style="margin-bottom: 1.5rem;">
          <h3>Today's Classes 📅</h3>
          <button class="btn-primary" style="width: auto; padding: 0.5rem 1rem; font-size: 0.9rem;">View Full Schedule</button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Room</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>09:00 AM</td>
              <td>Class 10-A</td>
              <td>Mathematics</td>
              <td>Room 101</td>
              <td><button class="btn-primary" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">Mark Attendance</button></td>
            </tr>
            <tr>
              <td>11:00 AM</td>
              <td>Class 12-B</td>
              <td>Physics</td>
              <td>Lab 2</td>
              <td><button class="btn-primary" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">Mark Attendance</button></td>
            </tr>
            <tr>
              <td>02:00 PM</td>
              <td>Class 9-C</td>
              <td>Mathematics</td>
              <td>Room 103</td>
              <td><button class="btn-primary" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">Mark Attendance</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card animate-slide-in" style="animation-delay: 0.5s;">
        <h3 style="margin-bottom: 1.5rem;">Quick Actions ⚡</h3>
        <div class="flex flex-col gap-3" style="margin-bottom: 2rem;">
          <button class="action-btn" style="flex-direction: row; gap: 1rem; text-align: left; align-items: center;">
            <div class="action-icon" style="margin-bottom: 0;">📢</div>
            <div>
              <div class="action-label">Post Announcement</div>
              <div class="text-muted" style="font-size: 0.8rem;">Notify your students</div>
            </div>
          </button>
          <button class="action-btn" style="flex-direction: row; gap: 1rem; text-align: left; align-items: center;">
            <div class="action-icon" style="margin-bottom: 0;">📤</div>
            <div>
              <div class="action-label">Upload Material</div>
              <div class="text-muted" style="font-size: 0.8rem;">Share notes/files</div>
            </div>
          </button>
          <button class="action-btn" style="flex-direction: row; gap: 1rem; text-align: left; align-items: center;">
            <div class="action-icon" style="margin-bottom: 0;">📝</div>
            <div>
              <div class="action-label">Create Assignment</div>
              <div class="text-muted" style="font-size: 0.8rem;">Set new homework</div>
            </div>
          </button>
        </div>

        <h3 style="margin-bottom: 1rem;">Recent Submissions 📥</h3>
        <div class="flex flex-col gap-3">
            <div class="flex justify-between items-center p-2" style="background: #f8f9fa; border-radius: 8px;">
                <div class="flex items-center gap-2">
                    <div style="width: 30px; height: 30px; background: #e7f5ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">JD</div>
                    <div>
                        <div style="font-weight: 600; font-size: 0.9rem;">John Doe</div>
                        <div class="text-muted" style="font-size: 0.75rem;">Maths Assignment 3</div>
                    </div>
                </div>
                <button class="btn-primary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; width: auto;">Grade</button>
            </div>
            <div class="flex justify-between items-center p-2" style="background: #f8f9fa; border-radius: 8px;">
                <div class="flex items-center gap-2">
                    <div style="width: 30px; height: 30px; background: #ffe3e3; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">AS</div>
                    <div>
                        <div style="font-weight: 600; font-size: 0.9rem;">Alice Smith</div>
                        <div class="text-muted" style="font-size: 0.75rem;">Physics Lab Report</div>
                    </div>
                </div>
                <button class="btn-primary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; width: auto;">Grade</button>
            </div>
        </div>
      </div>
    </div>
  `;

  return container;
}
