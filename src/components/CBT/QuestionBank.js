export function renderQuestionBank(onSelectQuestions, onCancel) {
    const container = document.createElement('div');
    container.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in';

    // Mock Question Bank Data
    const questionBank = [
        { id: 'q1', text: 'What is the capital of France?', type: 'multiple_choice', subject: 'Geography', difficulty: 'Easy', options: ['London', 'Berlin', 'Paris', 'Madrid'], correct: 2 },
        { id: 'q2', text: 'Explain Newton\'s Second Law.', type: 'short_answer', subject: 'Physics', difficulty: 'Medium', correct: 'F=ma' },
        { id: 'q3', text: 'The mitochondria is the powerhouse of the cell.', type: 'true_false', subject: 'Biology', difficulty: 'Easy', correct: 'True' },
        { id: 'q4', text: 'Solve for x: 2x + 5 = 15', type: 'multiple_choice', subject: 'Math', difficulty: 'Medium', options: ['5', '10', '2.5', '7.5'], correct: 0 },
        { id: 'q5', text: 'Who painted the Mona Lisa?', type: 'multiple_choice', subject: 'Art', difficulty: 'Easy', options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Rembrandt'], correct: 1 },
        { id: 'q6', text: 'Water consists of Hydrogen and Oxygen.', type: 'true_false', subject: 'Chemistry', difficulty: 'Easy', correct: 'True' },
    ];

    let selectedQuestions = new Set();

    const renderList = (filter = '') => {
        const list = container.querySelector('#qb-list');
        const filtered = questionBank.filter(q =>
            q.text.toLowerCase().includes(filter.toLowerCase()) ||
            q.subject.toLowerCase().includes(filter.toLowerCase())
        );

        list.innerHTML = filtered.map(q => `
      <div class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-start gap-3 cursor-pointer q-item" data-id="${q.id}">
        <input type="checkbox" class="mt-1 q-checkbox" value="${q.id}" ${selectedQuestions.has(q.id) ? 'checked' : ''}>
        <div class="flex-1">
          <div class="flex justify-between items-start mb-1">
            <span class="font-semibold text-gray-800 text-sm">${q.subject}</span>
            <span class="text-xs px-2 py-0.5 rounded-full ${q.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}">${q.difficulty}</span>
          </div>
          <p class="text-gray-600 text-sm mb-2">${q.text}</p>
          <div class="text-xs text-gray-400 uppercase font-bold tracking-wider">${q.type.replace('_', ' ')}</div>
        </div>
      </div>
    `).join('');

        // Re-attach listeners
        list.querySelectorAll('.q-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.type !== 'checkbox') {
                    const checkbox = item.querySelector('.q-checkbox');
                    checkbox.checked = !checkbox.checked;
                    toggleSelection(checkbox.value);
                }
            });
        });

        list.querySelectorAll('.q-checkbox').forEach(cb => {
            cb.addEventListener('change', () => toggleSelection(cb.value));
        });
    };

    const toggleSelection = (id) => {
        if (selectedQuestions.has(id)) {
            selectedQuestions.delete(id);
        } else {
            selectedQuestions.add(id);
        }
        updateFooter();
    };

    const updateFooter = () => {
        container.querySelector('#selected-count').textContent = `${selectedQuestions.size} selected`;
    };

    container.innerHTML = `
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-3xl h-[80vh] flex flex-col overflow-hidden">
      <!-- Header -->
      <div class="bg-nsknavy p-6 flex justify-between items-center shrink-0">
        <div>
            <h2 class="text-2xl font-bold text-white">Question Bank 📚</h2>
            <p class="text-blue-200 text-sm">Select questions to import</p>
        </div>
        <button id="close-btn" class="text-white hover:text-gray-200 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <!-- Search & Filter -->
      <div class="p-4 border-b border-gray-100 bg-gray-50 flex gap-4 shrink-0">
        <div class="relative flex-1">
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            <input type="text" id="qb-search" placeholder="Search by question or subject..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-nskblue">
        </div>
        <select class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 focus:outline-none focus:border-nskblue">
            <option value="">All Subjects</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
        </select>
      </div>

      <!-- List -->
      <div id="qb-list" class="flex-1 overflow-y-auto p-4 space-y-3">
        <!-- Populated by JS -->
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
        <span id="selected-count" class="font-semibold text-nsknavy">0 selected</span>
        <div class="flex gap-3">
            <button id="cancel-btn" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition">Cancel</button>
            <button id="import-btn" class="px-6 py-2 bg-nskblue text-white rounded-lg hover:bg-nsknavy transition shadow-md">
                Import Questions
            </button>
        </div>
      </div>
    </div>
  `;

    // Initial Render
    setTimeout(() => {
        renderList();

        // Search Listener
        container.querySelector('#qb-search').addEventListener('input', (e) => {
            renderList(e.target.value);
        });

        // Close/Cancel
        const close = () => {
            container.remove();
            if (onCancel) onCancel();
        };
        container.querySelector('#close-btn').addEventListener('click', close);
        container.querySelector('#cancel-btn').addEventListener('click', close);

        // Import
        container.querySelector('#import-btn').addEventListener('click', () => {
            const selected = questionBank.filter(q => selectedQuestions.has(q.id));
            if (onSelectQuestions) onSelectQuestions(selected);
            container.remove();
        });
    }, 0);

    return container;
}
