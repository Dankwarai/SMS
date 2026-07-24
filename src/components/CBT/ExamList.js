export function renderExamList(onStartExam) {
  const container = document.createElement('div');
  container.className = 'exam-list-container animate-fade-in';
  container.style.padding = '2rem';

  const role = localStorage.getItem('sms-role') || 'admin';
  const isStudent = role === 'student';
  const canManage = role === 'admin' || role === 'teacher';

  container.innerHTML = `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-nsknavy">${isStudent ? 'My Exams 📝' : 'Exam Management 🛠️'}</h1>
        <p class="text-gray-600">${isStudent ? 'Select an exam to start. Good luck!' : 'Create, edit, and manage exams.'}</p>
      </div>
      ${canManage ? `
        <button id="create-exam-btn" class="px-4 py-2 bg-nskblue text-white rounded-lg hover:bg-nsknavy transition shadow-md flex items-center">
            <i class="fas fa-plus mr-2"></i> Create New Exam
        </button>
      ` : ''}
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Exam 1 -->
      <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border border-gray-100">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-bold text-nsknavy">Mathematics Final</h3>
          <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Active</span>
        </div>
        <p class="text-gray-500 text-sm mb-4">Comprehensive test covering Algebra, Geometry, and Calculus basics.</p>
        <div class="flex justify-between text-sm text-gray-500 mb-6 border-t border-gray-50 pt-4">
          <span><i class="fas fa-clock mr-1"></i> 60m</span>
          <span><i class="fas fa-question-circle mr-1"></i> 20 Qs</span>
          <span><i class="fas fa-star mr-1"></i> 100 Pts</span>
        </div>
        
        ${isStudent ? `
            <button class="w-full py-2 bg-nskblue text-white rounded-lg font-semibold hover:bg-nsknavy transition start-btn" data-id="math-101">
                Start Exam
            </button>
        ` : `
            <div class="flex gap-2">
                <button class="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm font-medium edit-btn" data-id="math-101">
                    <i class="fas fa-edit mr-1"></i> Edit
                </button>
                <button class="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm font-medium results-btn" data-id="math-101">
                    <i class="fas fa-chart-bar mr-1"></i> Results
                </button>
                <button class="p-2 border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition delete-btn" data-id="math-101">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `}
      </div>
      
      <!-- Exam 2 -->
      <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border border-gray-100">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-bold text-nsknavy">Physics Mid-Term</h3>
          <span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Active</span>
        </div>
        <p class="text-gray-500 text-sm mb-4">Topics include Mechanics, Thermodynamics, and Waves.</p>
        <div class="flex justify-between text-sm text-gray-500 mb-6 border-t border-gray-50 pt-4">
          <span><i class="fas fa-clock mr-1"></i> 45m</span>
          <span><i class="fas fa-question-circle mr-1"></i> 15 Qs</span>
          <span><i class="fas fa-star mr-1"></i> 75 Pts</span>
        </div>
        
        ${isStudent ? `
            <button class="w-full py-2 bg-nskblue text-white rounded-lg font-semibold hover:bg-nsknavy transition start-btn" data-id="phy-101">
                Start Exam
            </button>
        ` : `
            <div class="flex gap-2">
                <button class="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm font-medium edit-btn" data-id="phy-101">
                    <i class="fas fa-edit mr-1"></i> Edit
                </button>
                <button class="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm font-medium results-btn" data-id="phy-101">
                    <i class="fas fa-chart-bar mr-1"></i> Results
                </button>
                <button class="p-2 border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition delete-btn" data-id="phy-101">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `}
      </div>
      
      <!-- Exam 3 -->
      <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border border-gray-100">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-bold text-nsknavy">English Literature</h3>
          <span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">Upcoming</span>
        </div>
        <p class="text-gray-500 text-sm mb-4">Analysis of Shakespearean plays and modern poetry.</p>
        <div class="flex justify-between text-sm text-gray-500 mb-6 border-t border-gray-50 pt-4">
          <span><i class="fas fa-clock mr-1"></i> 90m</span>
          <span><i class="fas fa-question-circle mr-1"></i> 30 Qs</span>
          <span><i class="fas fa-star mr-1"></i> 100 Pts</span>
        </div>
        
        ${isStudent ? `
            <button class="w-full py-2 bg-gray-100 text-gray-400 rounded-lg font-semibold cursor-not-allowed" disabled>
                Scheduled for Tomorrow
            </button>
        ` : `
            <div class="flex gap-2">
                <button class="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm font-medium edit-btn" data-id="eng-101">
                    <i class="fas fa-edit mr-1"></i> Edit
                </button>
                <button class="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm font-medium results-btn" data-id="eng-101">
                    <i class="fas fa-chart-bar mr-1"></i> Results
                </button>
                <button class="p-2 border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition delete-btn" data-id="eng-101">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `}
      </div>
    </div>
  `;

  // Add event listeners
  if (isStudent) {
    const startBtns = container.querySelectorAll('.start-btn');
    startBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const examId = btn.dataset.id;
        if (onStartExam) onStartExam(examId);
      });
    });
  } else {
    // Admin/Teacher Listeners
    container.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => alert('Edit Exam functionality would open here.'));
    });
    container.querySelectorAll('.results-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Navigate to Analytics or specific exam results
        const event = new CustomEvent('navigate', { detail: { view: 'Analytics' } });
        document.dispatchEvent(event);
      });
    });
    container.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this exam?')) alert('Exam deleted.');
      });
    });
  }

  const createBtn = container.querySelector('#create-exam-btn');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      const event = new CustomEvent('navigate', { detail: { view: 'CreateExam' } });
      document.dispatchEvent(event);
    });
  }

  return container;
}
