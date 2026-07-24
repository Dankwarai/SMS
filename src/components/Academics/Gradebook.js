import api from '../../services/api.js';

export function renderGradebook() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in';
  container.style.padding = '2rem';

  // Mock Data
  const students = [
    { id: 'ST-001', name: 'Sarah Johnson', ca1: 18, ca2: 19, exam: 55 },
    { id: 'ST-002', name: 'Michael Chen', ca1: 15, ca2: 16, exam: 45 },
    { id: 'ST-003', name: 'Emma Wilson', ca1: 20, ca2: 20, exam: 58 },
    { id: 'ST-004', name: 'James Brown', ca1: 12, ca2: 14, exam: 40 },
    { id: 'ST-005', name: 'Olivia Davis', ca1: 16, ca2: 18, exam: 50 },
  ];

  function calculateGrade(total) {
    if (total >= 90) return 'A+';
    if (total >= 80) return 'A';
    if (total >= 70) return 'B';
    if (total >= 60) return 'C';
    if (total >= 50) return 'D';
    return 'F';
  }

  function getGradeColor(grade) {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50';
    if (grade.startsWith('D')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  }

  const role = localStorage.getItem('sms-role') || 'admin';
  const canEdit = role === 'admin' || role === 'teacher';

  container.innerHTML = `
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1>Gradebook 📚</h1>
        <p class="text-muted">Manage student marks and academic performance</p>
      </div>
      ${canEdit ? `<button id="publish-btn" class="btn-primary">Publish Results</button>` : ''}
    </div>

    <div class="card p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Class</label>
          <select class="w-full p-2 border border-gray-300 rounded-lg">
            <option>Class 10</option>
            <option>Class 11</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Section</label>
          <select class="w-full p-2 border border-gray-300 rounded-lg">
            <option>Section A</option>
            <option>Section B</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select class="w-full p-2 border border-gray-300 rounded-lg">
            <option>Mathematics</option>
            <option>Physics</option>
            <option>English</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Term</label>
          <select class="w-full p-2 border border-gray-300 rounded-lg">
            <option>First Term</option>
            <option>Second Term</option>
          </select>
        </div>
      </div>
    </div>

    <div class="card p-0 overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="text-left p-4 font-semibold text-gray-600">Student</th>
            <th class="text-center p-4 font-semibold text-gray-600 w-24">CA 1 (20)</th>
            <th class="text-center p-4 font-semibold text-gray-600 w-24">CA 2 (20)</th>
            <th class="text-center p-4 font-semibold text-gray-600 w-24">Exam (60)</th>
            <th class="text-center p-4 font-semibold text-gray-600 w-24">Total</th>
            <th class="text-center p-4 font-semibold text-gray-600 w-24">Grade</th>
          </tr>
        </thead>
        <tbody id="grades-list">
          ${students.map(s => {
    const total = s.ca1 + s.ca2 + s.exam;
    const grade = calculateGrade(total);
    const gradeColor = getGradeColor(grade);
    return `
            <tr class="border-b border-gray-50 hover:bg-gray-50 group" data-id="${s.id}">
              <td class="p-4">
                <div class="font-medium text-gray-900">${s.name}</div>
                <div class="text-xs text-gray-500">${s.id}</div>
              </td>
              <td class="p-4 text-center">
                <input type="number" min="0" max="20" value="${s.ca1}" class="score-input w-16 p-1 text-center border border-gray-200 rounded focus:border-primary outline-none" data-field="ca1" ${!canEdit ? 'disabled' : ''}>
              </td>
              <td class="p-4 text-center">
                <input type="number" min="0" max="20" value="${s.ca2}" class="score-input w-16 p-1 text-center border border-gray-200 rounded focus:border-primary outline-none" data-field="ca2" ${!canEdit ? 'disabled' : ''}>
              </td>
              <td class="p-4 text-center">
                <input type="number" min="0" max="60" value="${s.exam}" class="score-input w-16 p-1 text-center border border-gray-200 rounded focus:border-primary outline-none" data-field="exam" ${!canEdit ? 'disabled' : ''}>
              </td>
              <td class="p-4 text-center font-bold text-gray-700 total-cell">${total}</td>
              <td class="p-4 text-center">
                <span class="grade-badge px-2 py-1 rounded text-sm font-bold ${gradeColor}">${grade}</span>
              </td>
            </tr>
            `;
  }).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Logic
  const list = container.querySelector('#grades-list');

  if (canEdit) {
    list.addEventListener('input', (e) => {
      if (e.target.classList.contains('score-input')) {
        const row = e.target.closest('tr');
        const inputs = row.querySelectorAll('.score-input');
        let sum = 0;

        inputs.forEach(input => {
          let val = parseInt(input.value) || 0;
          // Basic validation
          const max = parseInt(input.getAttribute('max'));
          if (val > max) {
            val = max;
            input.value = max;
          }
          if (val < 0) {
            val = 0;
            input.value = 0;
          }
          sum += val;
        });

        // Update Total
        row.querySelector('.total-cell').textContent = sum;

        // Update Grade
        const grade = calculateGrade(sum);
        const gradeBadge = row.querySelector('.grade-badge');
        gradeBadge.textContent = grade;
        gradeBadge.className = `grade-badge px-2 py-1 rounded text-sm font-bold ${getGradeColor(grade)}`;
      }
    });

    container.querySelector('#publish-btn').addEventListener('click', () => {
      alert('Results published successfully! Parents and students will be notified.');
    });
  }

  return container;
}
