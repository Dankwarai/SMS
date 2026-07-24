import api from '../../services/api.js';

export function renderTimetable() {
  const container = document.createElement('div');
  container.className = 'animate-fade-in';
  container.style.padding = '2rem';

  const role = api.auth.getUserRole();
  const isStudent = role === 'student';

  // --- Student View (Kept Simple) ---
  if (isStudent) {
    const examSchedule = [
      { id: 1, day: 'Wednesday', time: '09:00 AM', subject: 'Chemistry Exam', type: 'Exam', room: 'Hall B' },
      { id: 2, day: 'Friday', time: '10:00 AM', subject: 'Biology Exam', type: 'Exam', room: 'Hall A' },
    ];

    container.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-nsknavy">My Exam Schedule</h1>
          <p class="text-muted">Upcoming exams and tests</p>
        </div>
      </div>

      <div class="card p-0 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left p-4 font-semibold text-gray-600">Day</th>
                <th class="text-left p-4 font-semibold text-gray-600">Time</th>
                <th class="text-left p-4 font-semibold text-gray-600">Subject</th>
                <th class="text-left p-4 font-semibold text-gray-600">Type</th>
                <th class="text-left p-4 font-semibold text-gray-600">Room</th>
              </tr>
            </thead>
            <tbody>
              ${examSchedule.map(item => `
                <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td class="p-4 font-medium">${item.day}</td>
                  <td class="p-4 text-gray-600">${item.time}</td>
                  <td class="p-4 font-medium text-primary">${item.subject}</td>
                  <td class="p-4">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      ${item.type}
                    </span>
                  </td>
                  <td class="p-4 text-gray-600">${item.room}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    return container;
  }

  // --- Admin/Teacher View (New Management Dashboard) ---

  // State
  let currentLevel = 'primary';
  let currentClass = '';
  let currentView = 'weekly';

  // Render Layout
  container.innerHTML = `
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
        <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-nsknavy">Timetable Management</h1>
        </div>
        
        <div class="flex items-center space-x-4">
            <div class="relative">
                <div class="flex items-center space-x-2 bg-nsklight rounded-full py-2 px-4">
                    <i class="fas fa-search text-gray-500"></i>
                    <input type="text" placeholder="Search timetable..." class="bg-transparent outline-none w-32 md:w-64">
                </div>
            </div>
        </div>
    </div>

    <!-- Stats Overview -->
    <div class="quick-stats mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="timetable-card bg-white rounded-xl shadow-md p-5 flex items-center">
            <div class="bg-nsklightblue p-4 rounded-full mr-4 text-white">
                <i class="fas fa-calendar-day text-xl"></i>
            </div>
            <div>
                <p class="text-gray-600">Active Schedules</p>
                <p class="text-2xl font-bold text-nsknavy">24</p>
                <p class="text-xs text-nskgreen">Current term</p>
            </div>
        </div>
        
        <div class="timetable-card bg-white rounded-xl shadow-md p-5 flex items-center">
            <div class="bg-nskgreen p-4 rounded-full mr-4 text-white">
                <i class="fas fa-clock text-xl"></i>
            </div>
            <div>
                <p class="text-gray-600">Periods per Day</p>
                <p class="text-2xl font-bold text-nsknavy">8</p>
                <p class="text-xs text-gray-600">45 minutes each</p>
            </div>
        </div>
        
        <div class="timetable-card bg-white rounded-xl shadow-md p-5 flex items-center">
            <div class="bg-nskgold p-4 rounded-full mr-4 text-white">
                <i class="fas fa-chalkboard text-xl"></i>
            </div>
            <div>
                <p class="text-gray-600">Classrooms</p>
                <p class="text-2xl font-bold text-nsknavy">32</p>
                <p class="text-xs text-nskgreen">All occupied</p>
            </div>
        </div>
        
        <div class="timetable-card bg-white rounded-xl shadow-md p-5 flex items-center">
            <div class="bg-nskred p-4 rounded-full mr-4 text-white">
                <i class="fas fa-exclamation-circle text-xl"></i>
            </div>
            <div>
                <p class="text-gray-600">Conflicts</p>
                <p class="text-2xl font-bold text-nsknavy">3</p>
                <p class="text-xs text-nskred">Needs resolution</p>
            </div>
        </div>
    </div>

    <!-- Filter Section -->
    <div class="filter-section p-6 mb-8 bg-white rounded-xl shadow-sm">
        <div class="mb-6">
            <div class="flex flex-wrap gap-2 mb-4">
                <button class="level-btn px-4 py-2 rounded-lg border border-nskblue text-nskblue" data-level="early-childhood">Early Childhood</button>
                <button class="level-btn active px-4 py-2 rounded-lg bg-nskblue text-white" data-level="primary">Primary School</button>
                <button class="level-btn px-4 py-2 rounded-lg border border-nskblue text-nskblue" data-level="secondary">Secondary School</button>
            </div>
            
            <!-- Class Selectors -->
            <div id="class-selection-container">
                <select id="class-selector" class="px-4 py-2 border rounded-lg w-full md:w-64">
                    <option value="">Select Class</option>
                    <!-- Populated dynamically -->
                </select>
            </div>
        </div>

        <!-- View Options -->
        <div class="view-options flex flex-wrap gap-2 mb-4">
            <button class="view-btn active px-4 py-2 rounded-lg bg-nskblue text-white" data-view="weekly">Weekly View</button>
            <button class="view-btn px-4 py-2 rounded-lg border border-nskblue text-nskblue" data-view="daily">Daily View</button>
        </div>
    </div>

    <!-- Timetable Display Area -->
    <div id="timetableDisplay" class="bg-white rounded-xl shadow-md p-6 mb-8 min-h-[300px]">
        <div class="text-center py-8 text-gray-500">
            <i class="fas fa-calendar-alt text-4xl mb-4"></i>
            <p>Select a class to view the timetable</p>
        </div>
    </div>

    <!-- Floating Action Button -->
    <button id="add-schedule-fab" class="floating-action-btn w-14 h-14 bg-nskblue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-nsknavy transition">
        <i class="fas fa-plus text-xl"></i>
    </button>
  `;

  // --- Logic Functions ---

  const updateClassOptions = (level) => {
    const select = container.querySelector('#class-selector');
    select.innerHTML = '<option value="">Select Class</option>';

    let classes = [];
    if (level === 'early-childhood') {
      classes = ['Garden', 'Pre-Nursery', 'Nursery', 'KG 1', 'KG 2'];
    } else if (level === 'primary') {
      classes = ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'];
    } else {
      classes = ['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'];
    }

    classes.forEach(cls => {
      const opt = document.createElement('option');
      opt.value = cls;
      opt.textContent = cls;
      select.appendChild(opt);
    });
  };

  const getTimetableData = (level) => {
    // Mock Data Providers
    if (level === 'early-childhood') {
      return [
        {
          time: '8:00 - 8:30', days: [
            { activity: 'Arrival', teacher: 'Ms. Sarah', room: 'Play Area', class: 'subject-art' },
            { activity: 'Circle Time', teacher: 'Ms. Sarah', room: 'Carpet', class: 'subject-english' },
            { activity: 'Arrival', teacher: 'Ms. Sarah', room: 'Play Area', class: 'subject-art' },
            { activity: 'Circle Time', teacher: 'Ms. Sarah', room: 'Carpet', class: 'subject-english' },
            { activity: 'Arrival', teacher: 'Ms. Sarah', room: 'Play Area', class: 'subject-art' }
          ]
        },
        {
          time: '8:30 - 9:00', days: [
            { activity: 'Art', teacher: 'Ms. Sarah', room: 'Art Corner', class: 'subject-art' },
            { activity: 'Story', teacher: 'Ms. Sarah', room: 'Reading', class: 'subject-story' },
            { activity: 'Music', teacher: 'Ms. Sarah', room: 'Music Room', class: 'subject-music' },
            { activity: 'Math', teacher: 'Ms. Sarah', room: 'Table 1', class: 'subject-math' },
            { activity: 'Play', teacher: 'Ms. Sarah', room: 'Outside', class: 'subject-pe' }
          ]
        }
      ];
    } else {
      // Primary/Secondary
      return [
        {
          time: '8:00 - 8:45', days: [
            { subject: 'Math', teacher: 'Mr. Johnson', room: '201', class: 'subject-math' },
            { subject: 'English', teacher: 'Mr. Yusuf', room: '105', class: 'subject-english' },
            { subject: 'Science', teacher: 'Dr. Amina', room: 'Lab 3', class: 'subject-science' },
            { subject: 'Math', teacher: 'Mr. Johnson', room: '201', class: 'subject-math' },
            { subject: 'History', teacher: 'Mr. Kabir', room: '112', class: 'subject-history' }
          ]
        },
        {
          time: '8:45 - 9:30', days: [
            { subject: 'Science', teacher: 'Dr. Amina', room: 'Lab 2', class: 'subject-science' },
            { subject: 'Math', teacher: 'Mr. Johnson', room: '201', class: 'subject-math' },
            { subject: 'English', teacher: 'Mr. Yusuf', room: '105', class: 'subject-english' },
            { subject: 'Biology', teacher: 'Mrs. Fatima', room: 'Lab 1', class: 'subject-science' },
            { subject: 'Math', teacher: 'Mr. Johnson', room: '201', class: 'subject-math' }
          ]
        },
        {
          time: '9:30 - 10:15', days: [
            { subject: 'Civics', teacher: 'Mr. Kabir', room: '112', class: 'subject-history' },
            { subject: 'PE', teacher: 'Coach Ahmed', room: 'Field', class: 'subject-pe' },
            { subject: 'Art', teacher: 'Mrs. Zainab', room: 'Art Room', class: 'subject-art' },
            { subject: 'PE', teacher: 'Coach Ahmed', room: 'Field', class: 'subject-pe' },
            { subject: 'Science', teacher: 'Dr. Amina', room: 'Lab 3', class: 'subject-science' }
          ]
        },
        { time: '10:15 - 11:00', days: [null, null, null, null, null] } // Break
      ];
    }
  };

  const renderTimetableGrid = () => {
    const display = container.querySelector('#timetableDisplay');
    if (!currentClass) {
      display.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-calendar-alt text-4xl mb-4"></i>
                <p>Select a class to view the timetable</p>
            </div>`;
      return;
    }

    const data = getTimetableData(currentLevel);
    const isEarly = currentLevel === 'early-childhood';
    const key = isEarly ? 'activity' : 'subject';

    if (currentView === 'weekly') {
      display.innerHTML = `
            <h3 class="text-lg font-semibold text-nsknavy mb-4">Weekly Timetable for ${currentClass}</h3>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr>
                            <th class="bg-nsklightblue text-white p-3 rounded-tl-lg">Time</th>
                            <th class="bg-nsklightblue text-white p-3">Monday</th>
                            <th class="bg-nsklightblue text-white p-3">Tuesday</th>
                            <th class="bg-nsklightblue text-white p-3">Wednesday</th>
                            <th class="bg-nsklightblue text-white p-3">Thursday</th>
                            <th class="bg-nsklightblue text-white p-3 rounded-tr-lg">Friday</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(row => `
                            <tr>
                                <td class="bg-nsklight p-3 font-semibold text-center border-b border-gray-100">${row.time}</td>
                                ${row.days.map(day => `
                                    <td class="p-2 border-b border-gray-100">
                                        ${day ? `
                                            <div class="timetable-cell ${day.class} p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                                <p class="font-semibold text-sm">${day[key]}</p>
                                                <p class="text-xs text-gray-600">${day.teacher}</p>
                                                <p class="text-xs text-gray-500">${day.room}</p>
                                            </div>
                                        ` : `
                                            <div class="bg-gray-50 p-3 rounded-lg text-center text-gray-400 text-sm font-medium">
                                                BREAK / FREE
                                            </div>
                                        `}
                                    </td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else {
      // Daily View (Simplified)
      display.innerHTML = `
            <h3 class="text-lg font-semibold text-nsknavy mb-4">Daily View (Monday) for ${currentClass}</h3>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr>
                            <th class="bg-nsklightblue text-white p-3 rounded-tl-lg">Time</th>
                            <th class="bg-nsklightblue text-white p-3">Activity</th>
                            <th class="bg-nsklightblue text-white p-3">Teacher</th>
                            <th class="bg-nsklightblue text-white p-3 rounded-tr-lg">Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(row => {
        const day = row.days[0]; // Monday
        return `
                            <tr>
                                <td class="bg-nsklight p-3 font-semibold text-center border-b border-gray-100">${row.time}</td>
                                <td class="p-3 border-b border-gray-100">
                                    ${day ? `<span class="font-semibold ${day.class ? 'text-nsknavy' : ''}">${day[key]}</span>` : '<span class="text-gray-400">Break</span>'}
                                </td>
                                <td class="p-3 border-b border-gray-100 text-center">${day ? day.teacher : '-'}</td>
                                <td class="p-3 border-b border-gray-100 text-center">${day ? day.room : '-'}</td>
                            </tr>
                            `;
      }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
  };

  // --- Event Listeners ---
  setTimeout(() => {
    // Initial Setup
    updateClassOptions(currentLevel);

    // Level Switching
    const levelBtns = container.querySelectorAll('.level-btn');
    levelBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Update UI
        levelBtns.forEach(b => {
          b.className = 'level-btn px-4 py-2 rounded-lg border border-nskblue text-nskblue';
        });
        e.target.className = 'level-btn active px-4 py-2 rounded-lg bg-nskblue text-white';

        // Update State
        currentLevel = e.target.dataset.level;
        currentClass = '';
        updateClassOptions(currentLevel);
        renderTimetableGrid();
      });
    });

    // Class Selection
    const classSelector = container.querySelector('#class-selector');
    classSelector.addEventListener('change', (e) => {
      currentClass = e.target.value;
      renderTimetableGrid();
    });

    // View Switching
    const viewBtns = container.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        viewBtns.forEach(b => {
          b.className = 'view-btn px-4 py-2 rounded-lg border border-nskblue text-nskblue';
        });
        e.target.className = 'view-btn active px-4 py-2 rounded-lg bg-nskblue text-white';

        currentView = e.target.dataset.view;
        renderTimetableGrid();
      });
    });

    // FAB Click
    container.querySelector('#add-schedule-fab').addEventListener('click', () => {
      alert('Add Schedule Modal would open here.');
    });

  }, 0);

  return container;
}
