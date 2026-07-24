import api from '../../services/api.js';

export function renderAttendance() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in';
  container.style.padding = '2rem';

  // Mock Data
  const students = [
    { id: 'ST-001', name: 'Sarah Johnson', status: 'Present' },
    { id: 'ST-002', name: 'Michael Chen', status: 'Present' },
    { id: 'ST-003', name: 'Emma Wilson', status: 'Absent' },
    { id: 'ST-004', name: 'James Brown', status: 'Present' },
    { id: 'ST-005', name: 'Olivia Davis', status: 'Late' },
  ];

  const role = localStorage.getItem('sms-role') || 'admin';
  const canMark = role === 'admin' || role === 'teacher';

  container.innerHTML = `
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1>Attendance 📅</h1>
        <p class="text-muted">Track daily student attendance</p>
      </div>
      ${canMark ? `
      <div class="flex gap-2">
        <button id="mark-all-btn" class="btn-primary" style="background: #e9ecef; color: #333;">Mark All Present</button>
        <button id="save-btn" class="btn-primary">Save Attendance</button>
      </div>
      ` : ''}
    </div>

    <div class="card p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Class</label>
          <select class="w-full p-2 border border-gray-300 rounded-lg">
            <option>Class 10</option>
            <option>Class 11</option>
            <option>Class 12</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Section</label>
          <select class="w-full p-2 border border-gray-300 rounded-lg">
            <option>Section A</option>
            <option>Section B</option>
            <option>Section C</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input type="date" class="w-full p-2 border border-gray-300 rounded-lg" value="${new Date().toISOString().split('T')[0]}">
        </div>
      </div>
    </div>

    <div class="card p-0 overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="text-left p-4 font-semibold text-gray-600">Student ID</th>
            <th class="text-left p-4 font-semibold text-gray-600">Name</th>
            <th class="text-left p-4 font-semibold text-gray-600">Status</th>
            <th class="text-left p-4 font-semibold text-gray-600">Remarks</th>
          </tr>
        </thead>
        <tbody id="attendance-list">
          ${students.map(s => `
            <tr class="border-b border-gray-50 hover:bg-gray-50">
              <td class="p-4 font-mono text-sm text-gray-500">${s.id}</td>
              <td class="p-4 font-medium">${s.name}</td>
              <td class="p-4">
                <div class="flex gap-2">
                  <button class="status-btn px-3 py-1 rounded-full text-xs font-semibold transition-colors ${s.status === 'Present' ? 'bg-green-100 text-green-700 ring-2 ring-green-500' : 'bg-gray-100 text-gray-500'}" data-status="Present" ${!canMark ? 'disabled style="cursor: default;"' : ''}>Present</button>
                  <button class="status-btn px-3 py-1 rounded-full text-xs font-semibold transition-colors ${s.status === 'Absent' ? 'bg-red-100 text-red-700 ring-2 ring-red-500' : 'bg-gray-100 text-gray-500'}" data-status="Absent" ${!canMark ? 'disabled style="cursor: default;"' : ''}>Absent</button>
                  <button class="status-btn px-3 py-1 rounded-full text-xs font-semibold transition-colors ${s.status === 'Late' ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500' : 'bg-gray-100 text-gray-500'}" data-status="Late" ${!canMark ? 'disabled style="cursor: default;"' : ''}>Late</button>
                </div>
              </td>
              <td class="p-4">
                <input type="text" placeholder="${canMark ? 'Optional remark...' : ''}" class="w-full p-1 text-sm border-b border-gray-200 focus:border-primary outline-none bg-transparent" ${!canMark ? 'readonly' : ''}>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Event Listeners
  if (canMark) {
    const list = container.querySelector('#attendance-list');

    list.addEventListener('click', (e) => {
      if (e.target.classList.contains('status-btn')) {
        const row = e.target.closest('tr');
        const btns = row.querySelectorAll('.status-btn');

        // Reset all
        btns.forEach(btn => {
          btn.className = 'status-btn px-3 py-1 rounded-full text-xs font-semibold transition-colors bg-gray-100 text-gray-500';
        });

        // Activate clicked
        const status = e.target.dataset.status;
        let activeClass = '';
        if (status === 'Present') activeClass = 'bg-green-100 text-green-700 ring-2 ring-green-500';
        if (status === 'Absent') activeClass = 'bg-red-100 text-red-700 ring-2 ring-red-500';
        if (status === 'Late') activeClass = 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500';

        e.target.className = `status-btn px-3 py-1 rounded-full text-xs font-semibold transition-colors ${activeClass}`;
      }
    });

    container.querySelector('#mark-all-btn').addEventListener('click', () => {
      const rows = list.querySelectorAll('tr');
      rows.forEach(row => {
        const presentBtn = row.querySelector('[data-status="Present"]');
        presentBtn.click();
      });
    });

    container.querySelector('#save-btn').addEventListener('click', () => {
      // Mock Save
      const btn = container.querySelector('#save-btn');
      const originalText = btn.textContent;
      btn.textContent = 'Saved! ✓';
      btn.style.background = '#10b981';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 2000);
    });
  }

  return container;
}
