export function renderExamInterface(examId, onSubmit) {
  // Mock Data
  const questions = [
    { id: 1, type: 'multiple_choice', text: "What is the value of Pi (π) to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], correct: 1 },
    { id: 2, type: 'true_false', text: "The Earth is flat.", correct: "False" },
    { id: 3, type: 'short_answer', text: "Explain the theory of relativity in one sentence.", correct: "E=mc^2" },
    { id: 4, type: 'multiple_choice', text: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: 1 },
    { id: 5, type: 'true_false', text: "Water boils at 100°C at sea level.", correct: "True" },
  ];

  let currentQuestionIndex = 0;
  let answers = {}; // { questionId: selectedOptionIndex }
  let timeLeft = 60 * 60; // 60 minutes in seconds

  const container = document.createElement('div');
  container.className = 'exam-layout';
  container.style.padding = '2rem';

  // Render Layout
  container.innerHTML = `
    <div class="question-area">
      <div class="flex justify-between items-center" style="margin-bottom: 1rem;">
        <span class="text-muted">Question <span id="q-number">1</span> of ${questions.length}</span>
        <span class="status-badge status-pending">Unanswered</span>
      </div>
      
      <div id="question-content">
        <!-- Question injected here -->
      </div>
      
      <div class="flex justify-between items-center" style="margin-top: 3rem;">
        <button id="prev-btn" class="btn-primary" style="width: auto; background: #eee; color: #333;">Previous</button>
        <button id="next-btn" class="btn-primary" style="width: auto;">Next</button>
      </div>
    </div>
    
    <div class="exam-sidebar">
      <div class="timer-card">
        <div class="text-muted" style="color: rgba(255,255,255,0.7); margin-bottom: 0.5rem;">Time Remaining</div>
        <div class="timer-display" id="timer">60:00</div>
      </div>
      
      <div class="card">
        <h4 style="margin-bottom: 1rem;">Question Palette</h4>
        <div class="nav-grid" id="nav-grid">
          <!-- Grid injected here -->
        </div>
        
        <button id="submit-exam-btn" class="btn-primary" style="margin-top: 2rem; background: var(--color-accent);">Submit Exam</button>
      </div>
    </div>
  `;

  // Elements
  const qContent = container.querySelector('#question-content');
  const qNumber = container.querySelector('#q-number');
  const navGrid = container.querySelector('#nav-grid');
  const timerDisplay = container.querySelector('#timer');
  const prevBtn = container.querySelector('#prev-btn');
  const nextBtn = container.querySelector('#next-btn');
  const submitBtn = container.querySelector('#submit-exam-btn');

  // Functions
  function updateQuestion() {
    const q = questions[currentQuestionIndex];
    qNumber.textContent = currentQuestionIndex + 1;

    let questionHTML = `<div class="question-text">${q.text}</div>`;

    if (q.type === 'multiple_choice' || !q.type) {
      questionHTML += `
            <div class="options-list">
                ${q.options.map((opt, idx) => `
                <div class="option-item ${answers[q.id] === idx ? 'selected' : ''}" data-idx="${idx}">
                    <div style="width: 20px; height: 20px; border: 2px solid #ddd; border-radius: 50%; margin-right: 1rem; display: flex; align-items: center; justify-content: center;">
                    ${answers[q.id] === idx ? '<div style="width: 10px; height: 10px; background: var(--color-primary); border-radius: 50%;"></div>' : ''}
                    </div>
                    ${opt}
                </div>
                `).join('')}
            </div>`;
    } else if (q.type === 'true_false') {
      questionHTML += `
            <div class="options-list">
                <div class="option-item ${answers[q.id] === 'True' ? 'selected' : ''}" data-val="True">
                    <div style="width: 20px; height: 20px; border: 2px solid #ddd; border-radius: 50%; margin-right: 1rem; display: flex; align-items: center; justify-content: center;">
                    ${answers[q.id] === 'True' ? '<div style="width: 10px; height: 10px; background: var(--color-primary); border-radius: 50%;"></div>' : ''}
                    </div>
                    True
                </div>
                <div class="option-item ${answers[q.id] === 'False' ? 'selected' : ''}" data-val="False">
                    <div style="width: 20px; height: 20px; border: 2px solid #ddd; border-radius: 50%; margin-right: 1rem; display: flex; align-items: center; justify-content: center;">
                    ${answers[q.id] === 'False' ? '<div style="width: 10px; height: 10px; background: var(--color-primary); border-radius: 50%;"></div>' : ''}
                    </div>
                    False
                </div>
            </div>`;
    } else if (q.type === 'short_answer') {
      questionHTML += `
            <div style="margin-top: 1.5rem;">
                <textarea class="form-control answer-input" rows="4" placeholder="Type your answer here...">${answers[q.id] || ''}</textarea>
            </div>`;
    }

    qContent.innerHTML = questionHTML;

    // Bind Events
    if (q.type === 'multiple_choice' || !q.type) {
      const options = qContent.querySelectorAll('.option-item');
      options.forEach(opt => {
        opt.addEventListener('click', () => {
          const idx = parseInt(opt.dataset.idx);
          answers[q.id] = idx;
          updateQuestion();
          updateNavGrid();
        });
      });
    } else if (q.type === 'true_false') {
      const options = qContent.querySelectorAll('.option-item');
      options.forEach(opt => {
        opt.addEventListener('click', () => {
          const val = opt.dataset.val;
          answers[q.id] = val;
          updateQuestion();
          updateNavGrid();
        });
      });
    } else if (q.type === 'short_answer') {
      const input = qContent.querySelector('.answer-input');
      input.addEventListener('input', (e) => {
        answers[q.id] = e.target.value;
        updateNavGrid();
      });
    }

    // Button States
    prevBtn.disabled = currentQuestionIndex === 0;
    prevBtn.style.opacity = currentQuestionIndex === 0 ? '0.5' : '1';

    if (currentQuestionIndex === questions.length - 1) {
      nextBtn.textContent = 'Finish';
    } else {
      nextBtn.textContent = 'Next';
    }
  }

  function updateNavGrid() {
    navGrid.innerHTML = questions.map((q, idx) => `
      <div class="nav-btn ${idx === currentQuestionIndex ? 'active' : ''} ${answers[q.id] !== undefined ? 'answered' : ''}" data-idx="${idx}">
        ${idx + 1}
      </div>
    `).join('');

    // Bind Grid Clicks
    const navBtns = navGrid.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentQuestionIndex = parseInt(btn.dataset.idx);
        updateQuestion();
        updateNavGrid();
      });
    });
  }

  function startTimer() {
    const interval = setInterval(() => {
      timeLeft--;
      const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
      const s = (timeLeft % 60).toString().padStart(2, '0');
      timerDisplay.textContent = `${m}:${s}`;

      if (timeLeft <= 0) {
        clearInterval(interval);
        finishExam();
      }
    }, 1000);
  }

  function finishExam() {
    // Calculate Score
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    questions.forEach(q => {
      const userAnswer = answers[q.id];
      // Simple equality check. For real apps, might need more robust checking (e.g. case insensitive for short answer)
      // For multiple choice, userAnswer is index, q.correct is index
      // For true/false, userAnswer is string "True"/"False", q.correct is string

      let isCorrect = false;
      if (q.type === 'multiple_choice') {
        isCorrect = parseInt(userAnswer) === q.correct;
      } else if (q.type === 'true_false') {
        isCorrect = userAnswer === q.correct;
      } else if (q.type === 'short_answer') {
        // Very basic check
        isCorrect = userAnswer?.toLowerCase().trim() === q.correct?.toLowerCase().trim();
      }

      if (isCorrect) {
        score += 1; // Assuming 1 mark per question for now
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const result = {
      score: score,
      total: questions.length,
      correct: correctCount,
      incorrect: incorrectCount,
      answers: answers
    };

    if (onSubmit) onSubmit(result);
  }

  // Event Listeners
  prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      updateQuestion();
      updateNavGrid();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      updateQuestion();
      updateNavGrid();
    } else {
      // Finish button clicked
      if (confirm('Are you sure you want to submit?')) {
        finishExam();
      }
    }
  });

  submitBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to submit?')) {
      finishExam();
    }
  });

  // Init
  updateQuestion();
  updateNavGrid();
  startTimer();

  return container;
}
