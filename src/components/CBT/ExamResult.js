export function renderExamResult(result, onBack) {
  const container = document.createElement('div');
  container.className = 'animate-fade-in p-8 flex items-center justify-center min-h-[80vh]';

  const percentage = Math.round((result.score / result.total) * 100);
  const passed = percentage >= 50;

  container.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
      <div class="mb-6">
        <div class="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}">
            <i class="fas ${passed ? 'fa-trophy' : 'fa-times-circle'} text-5xl"></i>
        </div>
        <h2 class="text-3xl font-bold text-nsknavy mb-2">${passed ? 'Congratulations!' : 'Keep Practicing'}</h2>
        <p class="text-gray-500">${passed ? 'You have passed the exam.' : 'You did not meet the passing criteria.'}</p>
      </div>

      <div class="bg-gray-50 rounded-xl p-6 mb-8">
        <div class="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Your Score</div>
        <div class="text-5xl font-bold text-nsknavy mb-2">${percentage}%</div>
        <div class="text-gray-600">${result.score} / ${result.total} Points</div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-8 text-left">
        <div class="p-4 border border-gray-100 rounded-lg">
            <div class="text-xs text-gray-400">Correct</div>
            <div class="text-xl font-bold text-green-600">${result.correct}</div>
        </div>
        <div class="p-4 border border-gray-100 rounded-lg">
            <div class="text-xs text-gray-400">Incorrect</div>
            <div class="text-xl font-bold text-red-600">${result.incorrect}</div>
        </div>
      </div>

      <button id="back-btn" class="w-full py-3 bg-nskblue text-white rounded-xl font-bold hover:bg-nsknavy transition shadow-lg">
        Return to Dashboard
      </button>
    </div>
  `;

  container.querySelector('#back-btn').addEventListener('click', () => {
    if (onBack) onBack();
  });

  return container;
}
