export function renderTeacherList(onAddTeacher, onViewProfile, onEditTeacher, onDeleteTeacher) {
  const container = document.createElement('div');
  container.className = 'teacher-list-container animate-fade-in';
  container.style.padding = '2rem';

  // Mock Data (In a real app, this would come from a store or API)
  // We'll use a static list here, but in main.js we might want to manage state
  let teachers = [
    { id: 'T-001', name: 'Dr. Alan Grant', subject: 'Paleontology', email: 'alan.grant@sms.edu', exp: '15 Years', phone: '+1 (555) 001-0001' },
    { id: 'T-002', name: 'Ms. Ellie Sattler', subject: 'Botany', email: 'ellie.s@sms.edu', exp: '12 Years', phone: '+1 (555) 002-0002' },
    { id: 'T-003', name: 'Mr. Ian Malcolm', subject: 'Mathematics', email: 'ian.m@sms.edu', exp: '10 Years', phone: '+1 (555) 003-0003' },
    { id: 'T-004', name: 'Mrs. Sarah Connor', subject: 'Physical Education', email: 'sarah.c@sms.edu', exp: '8 Years', phone: '+1 (555) 004-0004' },
    { id: 'T-005', name: 'Mr. Walter White', subject: 'Chemistry', email: 'walter.w@sms.edu', exp: '20 Years', phone: '+1 (555) 005-0005' },
    { id: 'T-006', name: 'Ms. Frizzle', subject: 'Science', email: 'frizzle@sms.edu', exp: '25 Years', phone: '+1 (555) 006-0006' },
  ];

  const role = localStorage.getItem('sms-role') || 'admin';
  const isAdmin = role === 'admin';

  const renderGrid = (data) => {
    const grid = container.querySelector('.teacher-grid');
    if (!grid) return;

    grid.innerHTML = data.map(t => `
            <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex flex-col items-center text-center relative group">
                ${isAdmin ? `
                <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition flex space-x-2">
                    <button class="edit-btn text-gray-400 hover:text-nskblue" data-id="${t.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn text-gray-400 hover:text-red-500" data-id="${t.id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                ` : ''}

                <div class="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-nsklight">
                    <img src="https://ui-avatars.com/api/?name=${t.name}&background=random" alt="${t.name}" class="w-full h-full object-cover">
                </div>
                
                <h3 class="text-lg font-bold text-nsknavy mb-1">${t.name}</h3>
                <span class="px-3 py-1 bg-blue-50 text-nskblue rounded-full text-xs font-semibold mb-4">${t.subject}</span>
                
                <div class="w-full space-y-2 text-sm text-gray-500 mb-6">
                    <div class="flex items-center justify-center">
                        <i class="fas fa-envelope mr-2 text-gray-400"></i> ${t.email}
                    </div>
                    <div class="flex items-center justify-center">
                        <i class="fas fa-briefcase mr-2 text-gray-400"></i> ${t.exp}
                    </div>
                </div>
                
                <button class="view-profile-btn w-full py-2 border border-nskblue text-nskblue rounded-lg font-semibold hover:bg-nskblue hover:text-white transition" data-id="${t.id}">
                    View Profile
                </button>
            </div>
        `).join('');

    // Re-attach listeners
    attachGridListeners();
  };

  const attachGridListeners = () => {
    container.querySelectorAll('.view-profile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const teacher = teachers.find(t => t.id === id);
        if (onViewProfile) onViewProfile(teacher);
      });
    });

    if (isAdmin) {
      container.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const teacher = teachers.find(t => t.id === id);
          if (onEditTeacher) onEditTeacher(teacher);
        });
      });

      container.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          if (confirm('Are you sure you want to delete this teacher?')) {
            if (onDeleteTeacher) onDeleteTeacher(id);
            // For demo, just remove from local list and re-render
            teachers = teachers.filter(t => t.id !== id);
            renderGrid(teachers);
          }
        });
      });
    }
  };

  container.innerHTML = `
        <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h1 class="text-2xl font-bold text-nsknavy">Teachers Management 👨‍🏫</h1>
                <p class="text-gray-600">Manage staff, faculty, and assignments.</p>
            </div>
            ${isAdmin ? `
            <button id="add-teacher-btn" class="px-6 py-2 bg-nskblue text-white rounded-lg hover:bg-nsknavy transition shadow-md flex items-center">
                <i class="fas fa-plus mr-2"></i> Add Teacher
            </button>
            ` : ''}
        </div>
        
        <!-- Stats Row -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-white p-4 rounded-xl shadow-sm border-l-4 border-nskblue">
                <p class="text-gray-500 text-sm">Total Teachers</p>
                <p class="text-2xl font-bold text-nsknavy">${teachers.length}</p>
            </div>
            <div class="bg-white p-4 rounded-xl shadow-sm border-l-4 border-nskgreen">
                <p class="text-gray-500 text-sm">Departments</p>
                <p class="text-2xl font-bold text-nsknavy">8</p>
            </div>
            <div class="bg-white p-4 rounded-xl shadow-sm border-l-4 border-nskgold">
                <p class="text-gray-500 text-sm">On Leave</p>
                <p class="text-2xl font-bold text-nsknavy">1</p>
            </div>
            <div class="bg-white p-4 rounded-xl shadow-sm border-l-4 border-nskred">
                <p class="text-gray-500 text-sm">Vacancies</p>
                <p class="text-2xl font-bold text-nsknavy">3</p>
            </div>
        </div>

        <!-- Search & Filter -->
        <div class="bg-white p-4 rounded-xl shadow-sm mb-8 flex items-center gap-4">
            <div class="flex-1 relative">
                <i class="fas fa-search absolute left-4 top-3 text-gray-400"></i>
                <input type="text" id="search-input" placeholder="Search by name, subject, or email..." class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-nskblue transition">
            </div>
            <select class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-nskblue bg-white text-gray-600">
                <option value="">All Departments</option>
                <option value="Science">Science</option>
                <option value="Math">Mathematics</option>
                <option value="Arts">Arts</option>
            </select>
        </div>
        
        <div class="teacher-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Populated by renderGrid -->
        </div>
    `;

  // Initial Render
  setTimeout(() => {
    renderGrid(teachers);

    // Search Listener
    const searchInput = container.querySelector('#search-input');
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = teachers.filter(t =>
        t.name.toLowerCase().includes(term) ||
        t.subject.toLowerCase().includes(term) ||
        t.email.toLowerCase().includes(term)
      );
      renderGrid(filtered);
    });

    // Add Button Listener
    if (isAdmin) {
      container.querySelector('#add-teacher-btn').addEventListener('click', () => {
        if (onAddTeacher) onAddTeacher();
      });
    }
  }, 0);

  return container;
}
