import { renderQuestionBank } from './QuestionBank.js';

export function renderExamCreation(onSave) {
  const container = document.createElement('div');
  container.className = 'exam-creation-container animate-fade-in';
  container.style.padding = '2rem';
  container.style.maxWidth = '900px';
  container.style.margin = '0 auto';

  let questions = [];

  container.innerHTML = `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-nsknavy">Create New Exam ✍️</h1>
        <p class="text-gray-600">Set up exam details and questions.</p>
      </div>
      <button id="cancel-btn" class="text-gray-500 hover:text-gray-700">Cancel</button>
    </div>
    
    <div class="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 class="text-lg font-bold text-nsknavy mb-4">Exam Details</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Exam Title</label>
          <input type="text" id="exam-title" placeholder="e.g., Biology Final Term 1" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nskblue focus:border-transparent outline-none transition">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Duration (mins)</label>
          <input type="number" id="exam-duration" value="60" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nskblue focus:border-transparent outline-none transition">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
          <input type="number" id="exam-marks" value="100" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nskblue focus:border-transparent outline-none transition">
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-xl shadow-md p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-bold text-nsknavy">Questions</h3>
        <div class="flex gap-3">
            <button id="import-qb-btn" class="px-4 py-2 border border-nskblue text-nskblue rounded-lg hover:bg-blue-50 transition flex items-center text-sm font-semibold">
                <i class="fas fa-book mr-2"></i> Question Bank
            </button>
            <button id="add-q-btn" class="px-4 py-2 bg-nskblue text-white rounded-lg hover:bg-nsknavy transition flex items-center text-sm font-semibold">
                <i class="fas fa-plus mr-2"></i> Add Question
            </button>
        </div>
      </div>
      
      <div id="questions-list" class="space-y-4">
        <!-- Questions added here -->
        <div class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 text-gray-500">
          <i class="fas fa-clipboard-list text-4xl mb-3 text-gray-300"></i>
          <p>No questions added yet.</p>
          <p class="text-sm">Click "Add Question" or import from Question Bank.</p>
        </div>
      </div>
    </div>
    
    <div class="flex justify-end">
        <button id="save-exam-btn" class="px-8 py-3 bg-nskgreen text-white rounded-lg hover:bg-green-600 transition shadow-lg font-bold flex items-center">
            <i class="fas fa-check-circle mr-2"></i> Save & Publish Exam
        </button>
    </div>
  `;

  // Logic
  const qList = container.querySelector('#questions-list');
  const addBtn = container.querySelector('#add-q-btn');
  const importBtn = container.querySelector('#import-qb-btn');
  const saveBtn = container.querySelector('#save-exam-btn');
  const cancelBtn = container.querySelector('#cancel-btn');

  const renderQuestions = () => {
    if (questions.length === 0) {
        qList.innerHTML = `
            <div class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 text-gray-500">
                <i class="fas fa-clipboard-list text-4xl mb-3 text-gray-300"></i>
                <p>No questions added yet.</p>
                <p class="text-sm">Click "Add Question" or import from Question Bank.</p>
            </div>`;
        return;
    }

    qList.innerHTML = '';
    questions.forEach((q, index) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-white relative group';
        qDiv.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <span class="font-bold text-nsknavy">Question ${index + 1}</span>
                <button class="text-gray-400 hover:text-red-500 delete-q" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            
            <div class="mb-3">
                <select class="q-type w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-sm focus:outline-none focus:border-nskblue" data-index="${index}">
                    <option value="multiple_choice" ${q.type === 'multiple_choice' ? 'selected' : ''}>Multiple Choice</option>
                    <option value="true_false" ${q.type === 'true_false' ? 'selected' : ''}>True / False</option>
                    <option value="short_answer" ${q.type === 'short_answer' ? 'selected' : ''}>Short Answer</option>
                </select>
            </div>

            <input type="text" class="q-text w-full px-3 py-2 border border-gray-300 rounded mb-3 focus:outline-none focus:border-nskblue" placeholder="Enter question text..." value="${q.text || ''}" data-index="${index}">
            
            <div class="options-inputs space-y-2">
                ${renderOptionsInputs(q, index)}
            </div>
        `;
        qList.appendChild(qDiv);
    });

    attachQuestionListeners();
  };

  const renderOptionsInputs = (q, index) => {
    if (q.type === 'multiple_choice') {
        return (q.options || ['', '', '', '']).map((opt, i) => `
            <div class="flex items-center">
                <div class="w-1 h-full bg-${i === (q.correct || 0) ? 'green-500' : 'gray-300'} mr-2 rounded"></div>
                <input type="text" placeholder="Option ${i + 1} ${i === 0 ? '(Correct)' : ''}" class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-nskblue" value="${opt}" data-q-index="${index}" data-opt-index="${i}">
            </div>
        `).join('');
    } else if (q.type === 'true_false') {
        return `
            <div class="p-3 bg-gray-50 rounded text-sm text-gray-600">
                Correct Answer: 
                <select class="ml-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-nskblue" data-q-index="${index}" data-field="correct">
                    <option value="True" ${q.correct === 'True' ? 'selected' : ''}>True</option>
                    <option value="False" ${q.correct === 'False' ? 'selected' : ''}>False</option>
                </select>
            </div>
        `;
    } else {
        return `
            <textarea placeholder="Model Answer (Optional)" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-nskblue" data-q-index="${index}" data-field="correct">${q.correct || ''}</textarea>
        `;
    }
  };

  const attachQuestionListeners = () => {
    // Delete
    qList.querySelectorAll('.delete-q').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(btn.dataset.index);
            questions.splice(idx, 1);
            renderQuestions();
        });
    });

    // Type Change
    qList.querySelectorAll('.q-type').forEach(select => {
        select.addEventListener('change', (e) => {
            const idx = parseInt(select.dataset.index);
            questions[idx].type = e.target.value;
            // Reset options based on type
            if (questions[idx].type === 'multiple_choice') {
                questions[idx].options = ['', '', '', ''];
                questions[idx].correct = 0;
            } else if (questions[idx].type === 'true_false') {
                questions[idx].correct = 'True';
            } else {
                questions[idx].correct = '';
            }
            renderQuestions();
        });
    });

    // Text Input
    qList.querySelectorAll('.q-text').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = parseInt(input.dataset.index);
            questions[idx].text = e.target.value;
        });
    });
  };

  addBtn.addEventListener('click', () => {
    questions.push({
        id: Date.now(),
        type: 'multiple_choice',
        text: '',
        options: ['', '', '', ''],
        correct: 0
    });
    renderQuestions();
  });

  importBtn.addEventListener('click', () => {
    const qbModal = renderQuestionBank((selectedQuestions) => {
        // Transform QB questions to Exam questions format if needed
        // Here we assume they match or we just push them
        selectedQuestions.forEach(q => {
            questions.push({ ...q, id: Date.now() + Math.random() }); // New ID to avoid conflicts
        });
        renderQuestions();
    });
    document.body.appendChild(qbModal);
  });

  saveBtn.addEventListener('click', () => {
    const title = container.querySelector('#exam-title').value;
    if (!title) {
      alert('Please enter an exam title');
      return;
    }
    if (questions.length === 0) {
        alert('Please add at least one question');
        return;
    }

    alert('Exam saved successfully!');
    if (onSave) onSave();
  });

  cancelBtn.addEventListener('click', () => {
    if (onSave) onSave();
  });

  return container;
}
