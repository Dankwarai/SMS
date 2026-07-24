export function renderStudentProfile(studentId, onBack) {
  const container = document.createElement('div');
  container.className = 'student-profile-container animate-fade-in';
  container.style.padding = '2rem';

  // Mock Data
  const student = {
    id: studentId || 'ST-2023-001',
    name: 'John Doe',
    class: 'Class 10-A',
    roll: '1001',
    email: 'john.doe@student.sms.edu',
    phone: '+1 234 567 8900',
    address: '123 Maple Street, Springfield',
    guardian: 'Robert Doe (Father)',
    dob: '2008-05-15'
  };

  container.innerHTML = `
    <div class="flex justify-between items-center" style="margin-bottom: 1rem;">
      <button id="back-btn" class="text-muted">← Back to List</button>
      <button id="print-btn" class="btn-primary" style="width: auto; background: #eee; color: #333;">🖨️ Print Profile</button>
    </div>
    
    <div class="profile-header card animate-slide-in" style="margin-bottom: 2rem; display: flex; gap: 2rem; align-items: center;">
      <div class="profile-avatar" style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 4px solid white; box-shadow: var(--shadow-md);">
        <img src="https://ui-avatars.com/api/?name=${student.name}&background=random&size=240" alt="${student.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div style="flex: 1;">
        <div class="flex justify-between items-start">
          <div>
            <h1 style="margin-bottom: 0.5rem;">${student.name}</h1>
            <div class="flex gap-4" style="opacity: 0.9; font-size: 1.1rem;">
              <span class="badge" style="background: var(--color-primary-light); color: var(--color-primary); padding: 0.25rem 0.75rem; border-radius: 20px;">${student.class}</span>
              <span class="text-muted">Roll: <strong>${student.roll}</strong></span>
            </div>
          </div>
          <div class="text-right">
            <div style="font-size: 0.9rem; color: var(--color-text-muted);">Attendance</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: #0ca678;">92%</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="profile-tabs" style="margin-bottom: 1.5rem;">
      <button class="tab-btn active">Overview</button>
      <button class="tab-btn">Academic Performance</button>
      <button class="tab-btn">Attendance History</button>
      <button class="tab-btn">Fee Status</button>
    </div>
    
    <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 2rem;">
      <!-- Left Column -->
      <div class="flex flex-col gap-4">
        <!-- Personal Info -->
        <div class="card animate-slide-in" style="animation-delay: 0.1s;">
          <h3 style="margin-bottom: 1rem;">Personal Details</h3>
          <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            <div>
              <label class="text-muted" style="font-size: 0.85rem;">Email</label>
              <div>${student.email}</div>
            </div>
            <div>
              <label class="text-muted" style="font-size: 0.85rem;">Phone</label>
              <div>${student.phone}</div>
            </div>
            <div>
              <label class="text-muted" style="font-size: 0.85rem;">Date of Birth</label>
              <div>${student.dob}</div>
            </div>
            <div>
              <label class="text-muted" style="font-size: 0.85rem;">Guardian</label>
              <div>${student.guardian}</div>
            </div>
            <div style="grid-column: span 2;">
              <label class="text-muted" style="font-size: 0.85rem;">Address</label>
              <div>${student.address}</div>
            </div>
          </div>
        </div>
        
        <!-- Performance Graph -->
        <div class="card animate-slide-in" style="animation-delay: 0.2s;">
          <h3 style="margin-bottom: 1.5rem;">Exam Performance 📊</h3>
          <div class="chart-container" style="height: 250px;">
            <div class="bar-group">
              <div class="bar" style="height: 65%;" data-value="65%"></div>
              <span class="bar-label">Term 1</span>
            </div>
            <div class="bar-group">
              <div class="bar" style="height: 72%;" data-value="72%"></div>
              <span class="bar-label">Mid-Term</span>
            </div>
            <div class="bar-group">
              <div class="bar" style="height: 85%; background: var(--color-primary);" data-value="85%"></div>
              <span class="bar-label">Term 2</span>
            </div>
            <div class="bar-group">
              <div class="bar" style="height: 78%;" data-value="78%"></div>
              <span class="bar-label">Finals</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column -->
      <div class="flex flex-col gap-4">
        <!-- Quick Stats -->
        <div class="card animate-slide-in" style="animation-delay: 0.3s;">
          <h3 style="margin-bottom: 1rem;">Summary</h3>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between items-center p-2" style="background: #f8f9fa; border-radius: 8px;">
              <span>Assignments</span>
              <strong>12 / 15</strong>
            </div>
            <div class="flex justify-between items-center p-2" style="background: #f8f9fa; border-radius: 8px;">
              <span>Rank</span>
              <strong>5th</strong>
            </div>
            <div class="flex justify-between items-center p-2" style="background: #f8f9fa; border-radius: 8px;">
              <span>Remarks</span>
              <strong style="color: #0ca678;">Excellent</strong>
            </div>
          </div>
        </div>
        
        <!-- Attendance Heatmap (Mock) -->
        <div class="card animate-slide-in" style="animation-delay: 0.4s;">
          <h3 style="margin-bottom: 1rem;">Attendance</h3>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px;">
            ${Array(28).fill(0).map(() => {
    const opacity = Math.random() > 0.2 ? 1 : 0.2;
    const color = `rgba(12, 166, 120, ${opacity})`;
    return `<div style="aspect-ratio: 1; background: ${color}; border-radius: 2px;"></div>`;
  }).join('')}
          </div>
          <div class="text-center text-muted" style="margin-top: 0.5rem; font-size: 0.8rem;">Last 4 Weeks</div>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#back-btn').addEventListener('click', () => {
    if (onBack) onBack();
  });

  container.querySelector('#print-btn').addEventListener('click', () => {
    window.print();
  });

  return container;
}
