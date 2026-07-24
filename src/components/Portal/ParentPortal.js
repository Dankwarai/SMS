import api from '../../services/api.js';

export function renderParentPortal() {
    const container = document.createElement('div');
    container.className = 'animate-fade-in';
    container.style.padding = '2rem';

    // Mock Data
    const student = {
        name: 'Sarah Johnson',
        class: 'Class 10-A',
        id: 'ST-2023-001',
        attendance: 95,
        gpa: 3.8,
        photo: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random'
    };

    const recentGrades = [
        { subject: 'Mathematics', grade: 'A', score: 92, date: '2023-11-20' },
        { subject: 'Physics', grade: 'B+', score: 88, date: '2023-11-18' },
        { subject: 'English', grade: 'A-', score: 90, date: '2023-11-15' }
    ];

    const messages = [
        { from: 'Mr. Smith (Math)', content: 'Sarah is doing great in Algebra!', time: '2 days ago' },
        { from: 'Admin', content: 'School will be closed on Friday.', time: '1 week ago' }
    ];

    container.innerHTML = `
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-nsknavy">Parent Portal 👨‍👩‍👧‍👦</h1>
        <p class="text-gray-600">Welcome back, Mr. Johnson</p>
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 bg-nskblue text-white rounded-lg hover:bg-nsknavy transition">
          <i class="fas fa-envelope mr-2"></i> Contact School
        </button>
      </div>
    </div>

    <!-- Student Profile Card -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
      <img src="${student.photo}" alt="Student" class="w-24 h-24 rounded-full border-4 border-nsklight shadow-sm">
      <div class="flex-1 text-center md:text-left">
        <h2 class="text-xl font-bold text-nsknavy">${student.name}</h2>
        <p class="text-gray-500">${student.class} • ID: ${student.id}</p>
        <div class="flex gap-4 mt-4 justify-center md:justify-start">
          <div class="text-center px-4 py-2 bg-green-50 rounded-lg">
            <span class="block text-xl font-bold text-green-600">${student.attendance}%</span>
            <span class="text-xs text-gray-500">Attendance</span>
          </div>
          <div class="text-center px-4 py-2 bg-blue-50 rounded-lg">
            <span class="block text-xl font-bold text-blue-600">${student.gpa}</span>
            <span class="text-xs text-gray-500">GPA</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Recent Grades -->
      <div class="md:col-span-2 space-y-8">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-nsknavy mb-4 flex items-center">
            <i class="fas fa-graduation-cap mr-2 text-nskblue"></i> Recent Academic Activity
          </h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left p-3 text-sm font-semibold text-gray-600">Subject</th>
                  <th class="text-center p-3 text-sm font-semibold text-gray-600">Grade</th>
                  <th class="text-center p-3 text-sm font-semibold text-gray-600">Score</th>
                  <th class="text-right p-3 text-sm font-semibold text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                ${recentGrades.map(g => `
                  <tr class="border-b border-gray-50 hover:bg-gray-50">
                    <td class="p-3 font-medium text-gray-800">${g.subject}</td>
                    <td class="p-3 text-center">
                      <span class="px-2 py-1 rounded text-xs font-bold ${g.grade.startsWith('A') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}">${g.grade}</span>
                    </td>
                    <td class="p-3 text-center font-mono text-gray-600">${g.score}</td>
                    <td class="p-3 text-right text-sm text-gray-500">${g.date}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <button class="w-full mt-4 py-2 text-nskblue text-sm font-semibold hover:bg-blue-50 rounded transition">
            View Full Report Card
          </button>
        </div>

        <!-- Attendance Overview -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-nsknavy mb-4 flex items-center">
            <i class="fas fa-calendar-check mr-2 text-nskgreen"></i> Attendance Overview
          </h3>
          <div class="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-4">
            <div>
              <p class="text-sm text-gray-500">Days Present</p>
              <p class="text-xl font-bold text-gray-800">45</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Days Absent</p>
              <p class="text-xl font-bold text-red-500">2</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Late</p>
              <p class="text-xl font-bold text-yellow-500">1</p>
            </div>
          </div>
          <p class="text-sm text-gray-500 italic">Last absence: Oct 12, 2023 (Excused - Medical)</p>
        </div>
      </div>

      <!-- Sidebar: Messages & Quick Links -->
      <div class="space-y-8">
        
        <!-- Messages -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-nsknavy">Messages</h3>
            <span class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
          </div>
          <div class="space-y-4">
            ${messages.map(m => `
              <div class="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                <div class="flex justify-between items-start mb-1">
                  <span class="font-semibold text-sm text-gray-800">${m.from}</span>
                  <span class="text-xs text-gray-400">${m.time}</span>
                </div>
                <p class="text-sm text-gray-600 line-clamp-2">${m.content}</p>
              </div>
            `).join('')}
          </div>
          <button class="w-full mt-4 py-2 bg-nskblue text-white rounded-lg text-sm font-semibold hover:bg-nsknavy transition">
            View All Messages
          </button>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-nsknavy mb-4">Quick Actions</h3>
          <div class="space-y-2">
            <button class="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-nskblue hover:text-nskblue transition flex items-center">
              <i class="fas fa-file-invoice-dollar w-6 text-center mr-2 text-gray-400"></i> Pay Fees
            </button>
            <button class="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-nskblue hover:text-nskblue transition flex items-center">
              <i class="fas fa-calendar-alt w-6 text-center mr-2 text-gray-400"></i> School Calendar
            </button>
            <button class="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-nskblue hover:text-nskblue transition flex items-center">
              <i class="fas fa-user-edit w-6 text-center mr-2 text-gray-400"></i> Update Profile
            </button>
          </div>
        </div>

      </div>
    </div>
  `;

    return container;
}
