export function renderStudentList(onAddStudent, onViewProfile) {
  const container = document.createElement('div');
  container.className = 'student-list-container';
  container.style.padding = '2rem';

  // Mock Data
  const students = [
    { id: 'ST-2023-001', name: 'Sarah Johnson', class: '10-A', parent: 'Robert Johnson', status: 'Active' },
    { id: 'ST-2023-002', name: 'Michael Chen', class: '10-A', parent: 'David Chen', status: 'Active' },
    { id: 'ST-2023-003', name: 'Emma Wilson', class: '9-B', parent: 'Mary Wilson', status: 'Inactive' },
    { id: 'ST-2023-004', name: 'James Brown', class: '11-C', parent: 'Patricia Brown', status: 'Active' },
    { id: 'ST-2023-005', name: 'Olivia Davis', class: '9-B', parent: 'Jennifer Davis', status: 'Active' },
  ];

  const role = localStorage.getItem('sms-role') || 'admin';
  const isAdmin = role === 'admin';

  container.innerHTML = `
    <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
      <div>
        <h1>Students 🎓</h1>
        <p class="text-muted">Manage student records and admissions.</p>
      </div>
      ${isAdmin ? `<button id="add-student-btn" class="btn-primary" style="width: auto;">+ New Admission</button>` : ''}
    </div>
    
    <div class="card">
      <div class="filters-bar">
        <input type="text" class="filter-input" placeholder="Search by name or ID...">
        <select class="filter-input">
          <option value="">All Classes</option>
          <option value="10-A">Class 10-A</option>
          <option value="9-B">Class 9-B</option>
          <option value="11-C">Class 11-C</option>
        </select>
        <select class="filter-input">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      
      <div style="overflow-x: auto; border-radius: 12px; border: 1px solid #f1f3f5;">
        <table class="table" style="width: 100%; border-collapse: separate; border-spacing: 0;">
          <thead style="background: #f8f9fa;">
            <tr>
              <th style="padding: 1rem 1.5rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600; border-bottom: 1px solid #eee;">ID</th>
              <th style="padding: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600; border-bottom: 1px solid #eee;">Name</th>
              <th style="padding: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600; border-bottom: 1px solid #eee;">Class</th>
              <th style="padding: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600; border-bottom: 1px solid #eee;">Parent Name</th>
              <th style="padding: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600; border-bottom: 1px solid #eee;">Status</th>
              <th style="padding: 1rem 1.5rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600; border-bottom: 1px solid #eee; text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${students.map((s, index) => `
              <tr style="transition: all 0.2s ease; cursor: pointer; animation: fadeIn 0.3s ease forwards; animation-delay: ${index * 0.05}s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #f1f3f5; font-family: 'Courier New', monospace; font-weight: 600; color: var(--color-text-muted);">${s.id}</td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5;">
                  <div class="flex items-center gap-3">
                    <div class="avatar" style="width: 36px; height: 36px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                      <img src="https://ui-avatars.com/api/?name=${s.name}&background=random&bold=true" alt="${s.name}" style="border-radius: 10px;">
                    </div>
                    <div>
                      <div style="font-weight: 600; color: var(--color-text-main);">${s.name}</div>
                      <div class="text-muted" style="font-size: 0.75rem;">${s.id.toLowerCase()}@sms.edu</div>
                    </div>
                  </div>
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5;">
                  <span style="background: #f3f0ff; color: #7950f2; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">${s.class}</span>
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5; color: var(--color-text-main);">${s.parent}</td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5;">
                  <span style="
                    background: ${s.status === 'Active' ? '#dcfce7' : '#fee2e2'}; 
                    color: ${s.status === 'Active' ? '#166534' : '#991b1b'}; 
                    padding: 4px 12px; 
                    border-radius: 20px; 
                    font-size: 0.8rem; 
                    font-weight: 600; 
                    display: inline-flex; 
                    align-items: center; 
                    gap: 6px;">
                    <span style="width: 6px; height: 6px; background: currentColor; border-radius: 50%;"></span>
                    ${s.status}
                  </span>
                </td>
                <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #f1f3f5; text-align: right;">
                  <div class="flex justify-end gap-2">
                    <button class="action-btn view-profile-btn" data-id="${s.id}" title="View Profile" style="width: 32px; height: 32px; border-radius: 8px; background: #f8f9fa; border: 1px solid #eee; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                      <span style="font-size: 1rem;">👁️</span>
                    </button>
                    ${isAdmin ? `
                    <button class="action-btn" title="Edit" style="width: 32px; height: 32px; border-radius: 8px; background: #f8f9fa; border: 1px solid #eee; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                      <span style="font-size: 1rem;">✏️</span>
                    </button>
                    <button class="action-btn" title="Delete" style="width: 32px; height: 32px; border-radius: 8px; background: #fff5f5; border: 1px solid #ffe3e3; color: #fa5252; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                      <span style="font-size: 1rem;">🗑️</span>
                    </button>
                    ` : ''}
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div class="flex justify-between items-center" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #eee;">
        <span class="text-muted">Showing 1-5 of 124 students</span>
        <div class="flex gap-2">
          <button class="btn-primary" style="padding: 0.5rem 1rem; background: #eee; color: #333;">Previous</button>
          <button class="btn-primary" style="padding: 0.5rem 1rem;">Next</button>
        </div>
      </div>
    </div>
  `;

  // Event Listeners
  if (isAdmin) {
    container.querySelector('#add-student-btn').addEventListener('click', () => {
      if (onAddStudent) onAddStudent();
    });
  }

  const viewBtns = container.querySelectorAll('.view-profile-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (onViewProfile) onViewProfile(id);
    });
  });

  return container;
}
