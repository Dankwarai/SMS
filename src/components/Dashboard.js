export function renderDashboard() {
  const container = document.createElement('div');
  container.className = 'dashboard-container animate-fade-in';
  container.style.padding = '2rem';

  container.innerHTML = `
    <!-- Header -->
    <div class="dashboard-header">
      <div class="welcome-text">
        <h1>Dashboard Overview</h1>
        <p class="text-muted">Welcome back, Admin! Here's your daily school summary.</p>
      </div>
      <div class="date-badge">
        <span>📅</span>
        ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
    
    <!-- Stats Grid -->
    <div class="dashboard-grid">
      <!-- Students Card -->
      <div class="stat-card animate-slide-in" style="color: var(--color-primary); animation-delay: 0.1s;">
        <div class="stat-card-header">
          <span class="stat-label">Total Students</span>
          <div class="stat-icon" style="background: #e7f5ff; color: #1c7ed6;">👥</div>
        </div>
        <div class="stat-value">2,543</div>
        <div class="stat-trend trend-up">
          <span>↑ 12%</span>
          <span class="text-muted" style="font-weight: 400;">vs last month</span>
        </div>
      </div>
      
      <!-- Teachers Card -->
      <div class="stat-card animate-slide-in" style="color: #7950f2; animation-delay: 0.2s;">
        <div class="stat-card-header">
          <span class="stat-label">Total Teachers</span>
          <div class="stat-icon" style="background: #f3f0ff; color: #7950f2;">👨‍🏫</div>
        </div>
        <div class="stat-value">145</div>
        <div class="stat-trend trend-up">
          <span>↑ 4</span>
          <span class="text-muted" style="font-weight: 400;">new joined</span>
        </div>
      </div>
      
      <!-- Revenue Card -->
      <div class="stat-card animate-slide-in" style="color: #f59f00; animation-delay: 0.3s;">
        <div class="stat-card-header">
          <span class="stat-label">Revenue (YTD)</span>
          <div class="stat-icon" style="background: #fff9db; color: #f59f00;">💰</div>
        </div>
        <div class="stat-value">$1.2M</div>
        <div class="stat-trend trend-up">
          <span>↑ 8%</span>
          <span class="text-muted" style="font-weight: 400;">vs last year</span>
        </div>
      </div>
      
      <!-- Attendance Card -->
      <div class="stat-card animate-slide-in" style="color: #0ca678; animation-delay: 0.4s;">
        <div class="stat-card-header">
          <span class="stat-label">Avg Attendance</span>
          <div class="stat-icon" style="background: #e6fcf5; color: #0ca678;">📊</div>
        </div>
        <div class="stat-value">94%</div>
        <div class="stat-trend trend-down">
          <span>↓ 1%</span>
          <span class="text-muted" style="font-weight: 400;">from yesterday</span>
        </div>
      </div>
    </div>
    
    <!-- Main Content Grid -->
    <!-- Main Content Grid -->
    <div class="dashboard-content-grid">
      
      <!-- Revenue Chart Section -->
      <div class="card animate-slide-in" style="animation-delay: 0.5s; padding: 1.5rem;">
        <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
          <div>
            <h3>Revenue Analytics 📈</h3>
            <p class="text-muted" style="font-size: 0.9rem;">Monthly income overview</p>
          </div>
          <select class="form-control" style="width: auto; padding: 0.4rem 1rem;">
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </div>
        
        <div class="chart-container" style="height: 240px;">
          <div class="bar-group">
            <div class="bar" style="height: 40%; background: #a5d8ff;" data-value="$40k"></div>
            <span class="bar-label">Jan</span>
          </div>
          <div class="bar-group">
            <div class="bar" style="height: 55%; background: #a5d8ff;" data-value="$55k"></div>
            <span class="bar-label">Feb</span>
          </div>
          <div class="bar-group">
            <div class="bar" style="height: 45%; background: #a5d8ff;" data-value="$45k"></div>
            <span class="bar-label">Mar</span>
          </div>
          <div class="bar-group">
            <div class="bar" style="height: 70%; background: var(--color-primary);" data-value="$70k"></div>
            <span class="bar-label">Apr</span>
          </div>
          <div class="bar-group">
            <div class="bar" style="height: 60%; background: #a5d8ff;" data-value="$60k"></div>
            <span class="bar-label">May</span>
          </div>
          <div class="bar-group">
            <div class="bar" style="height: 85%; background: #a5d8ff;" data-value="$85k"></div>
            <span class="bar-label">Jun</span>
          </div>
          <div class="bar-group">
            <div class="bar" style="height: 50%; background: #a5d8ff;" data-value="$50k"></div>
            <span class="bar-label">Jul</span>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions & Attendance -->
      <div class="flex flex-col gap-4">
        <!-- Quick Actions -->
        <div class="card animate-slide-in" style="animation-delay: 0.6s; padding: 1.5rem;">
          <h3 style="margin-bottom: 1.5rem;">Quick Actions ⚡</h3>
          <div class="quick-actions-grid" style="grid-template-columns: 1fr 1fr;">
            <div class="action-btn" onclick="document.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'Admission' } }))">
              <div class="action-icon" style="font-size: 1.25rem;">🎓</div>
              <div class="action-label">Admit</div>
            </div>
            <div class="action-btn" onclick="document.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'FeeCollection' } }))">
              <div class="action-icon" style="font-size: 1.25rem;">💳</div>
              <div class="action-label">Fees</div>
            </div>
            <div class="action-btn" onclick="document.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'AddTeacher' } }))">
              <div class="action-icon" style="font-size: 1.25rem;">👨‍🏫</div>
              <div class="action-label">Teacher</div>
            </div>
            <div class="action-btn" onclick="document.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'CreateExam' } }))">
              <div class="action-icon" style="font-size: 1.25rem;">📝</div>
              <div class="action-label">Exam</div>
            </div>
          </div>
        </div>
        
        <!-- Attendance Widget -->
        <div class="card animate-slide-in" style="animation-delay: 0.7s; padding: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h4 style="margin-bottom: 0.5rem;">Attendance</h4>
            <div class="text-muted" style="font-size: 0.9rem;">Today's Status</div>
            <div style="margin-top: 0.5rem; font-weight: 600; color: #0ca678;">2,288 Present</div>
          </div>
          <div class="progress-ring" style="width: 80px; height: 80px;">
            <svg width="80" height="80">
              <circle stroke="#eee" stroke-width="6" fill="transparent" r="34" cx="40" cy="40"/>
              <circle class="progress-ring-circle" stroke="var(--color-primary)" stroke-width="6" fill="transparent" r="34" cx="40" cy="40" stroke-dasharray="213.6" stroke-dashoffset="21.36"/>
            </svg>
            <div class="progress-value" style="font-size: 1rem;">90%</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recent Activity -->
    <div class="card animate-slide-in" style="animation-delay: 0.8s; padding: 0; overflow: hidden; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
      <div class="flex justify-between items-center p-4 border-b" style="border-bottom: 1px solid #f1f3f5; padding: 1.5rem; background: #fff;">
        <div>
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text-main);">Recent Admissions 🆕</h3>
          <p class="text-muted" style="font-size: 0.85rem; margin-top: 0.25rem;">Latest students joined this semester</p>
        </div>
        <button class="btn-primary" style="width: auto; padding: 0.5rem 1.25rem; font-size: 0.85rem; border-radius: 20px; background: #f8f9fa; color: var(--color-primary); font-weight: 600;">View All Students</button>
      </div>
      
      <div style="overflow-x: auto;">
        <table class="table" style="margin-top: 0; width: 100%; border-collapse: separate; border-spacing: 0;">
          <thead style="background: #f8f9fa;">
            <tr>
              <th style="padding: 1rem 1.5rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600;">Student Name</th>
              <th style="padding: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600;">ID</th>
              <th style="padding: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600;">Class</th>
              <th style="padding: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600;">Date</th>
              <th style="padding: 1rem 1.5rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600; text-align: right;">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style="transition: all 0.2s ease; cursor: pointer;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
              <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #f1f3f5;">
                <div class="flex items-center gap-3">
                  <div style="width: 40px; height: 40px; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <img src="https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff" width="40" style="display: block;">
                  </div>
                  <div>
                    <div style="font-weight: 600; color: var(--color-text-main);">John Doe</div>
                    <div class="text-muted" style="font-size: 0.8rem;">john@sms.edu</div>
                  </div>
                </div>
              </td>
              <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5; font-family: 'Courier New', monospace; font-weight: 600; color: var(--color-text-muted);">#ST-001</td>
              <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5;"><span style="background: #eef2ff; color: #4f46e5; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">Class 10-A</span></td>
              <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5; color: var(--color-text-muted); font-size: 0.9rem;">Oct 24, 2023</td>
              <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #f1f3f5; text-align: right;">
                <span style="background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                  <span style="width: 6px; height: 6px; background: #166534; border-radius: 50%;"></span> Admitted
                </span>
              </td>
            </tr>
            <tr style="transition: all 0.2s ease; cursor: pointer;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
              <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #f1f3f5;">
                <div class="flex items-center gap-3">
                  <div style="width: 40px; height: 40px; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <img src="https://ui-avatars.com/api/?name=Jane+Smith&background=ec4899&color=fff" width="40" style="display: block;">
                  </div>
                  <div>
                    <div style="font-weight: 600; color: var(--color-text-main);">Jane Smith</div>
                    <div class="text-muted" style="font-size: 0.8rem;">jane@sms.edu</div>
                  </div>
                </div>
              </td>
              <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5; font-family: 'Courier New', monospace; font-weight: 600; color: var(--color-text-muted);">#ST-002</td>
              <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5;"><span style="background: #fdf2f8; color: #db2777; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">Class 9-B</span></td>
              <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5; color: var(--color-text-muted); font-size: 0.9rem;">Oct 23, 2023</td>
              <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #f1f3f5; text-align: right;">
                <span style="background: #fef9c3; color: #854d0e; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                  <span style="width: 6px; height: 6px; background: #854d0e; border-radius: 50%;"></span> Pending
                </span>
              </td>
            </tr>
            <tr style="transition: all 0.2s ease; cursor: pointer;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
              <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #f1f3f5;">
                <div class="flex items-center gap-3">
                  <div style="width: 40px; height: 40px; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <img src="https://ui-avatars.com/api/?name=Mike+Ross&background=8b5cf6&color=fff" width="40" style="display: block;">
                  </div>
                  <div>
                    <div style="font-weight: 600; color: var(--color-text-main);">Mike Ross</div>
                    <div class="text-muted" style="font-size: 0.8rem;">mike@sms.edu</div>
                  </div>
                </div>
              </td>
              <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5; font-family: 'Courier New', monospace; font-weight: 600; color: var(--color-text-muted);">#ST-003</td>
              <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5;"><span style="background: #f0fdf4; color: #16a34a; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">Class 11-C</span></td>
              <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5; color: var(--color-text-muted); font-size: 0.9rem;">Oct 22, 2023</td>
              <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #f1f3f5; text-align: right;">
                <span style="background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                  <span style="width: 6px; height: 6px; background: #166534; border-radius: 50%;"></span> Admitted
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  return container;
}
