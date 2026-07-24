export function renderSchoolCalendar() {
    const container = document.createElement('div');
    container.className = 'animate-fade-in p-6';

    // State
    let currentDate = new Date();
    let events = [
        { id: 1, title: 'Mid-Term Break', date: '2023-11-15', type: 'holiday' },
        { id: 2, title: 'Math Exam', date: '2023-11-20', type: 'exam' },
        { id: 3, title: 'Staff Meeting', date: '2023-11-05', type: 'meeting' },
        { id: 4, title: 'Sports Day', date: '2023-11-25', type: 'event' },
    ];

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Adjust for Monday start

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let html = `
      <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-nsknavy">School Calendar 📅</h1>
          <p class="text-gray-600">Manage events, holidays, and schedules.</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            <button id="prev-month" class="p-2 hover:bg-gray-100 rounded-md transition text-gray-600">
              <i class="fas fa-chevron-left"></i>
            </button>
            <span class="px-4 py-2 font-semibold text-nsknavy min-w-[150px] text-center">
              ${monthNames[month]} ${year}
            </span>
            <button id="next-month" class="p-2 hover:bg-gray-100 rounded-md transition text-gray-600">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <button id="add-event-btn" class="px-4 py-2 bg-nskblue text-white rounded-lg hover:bg-nsknavy transition shadow-md flex items-center">
            <i class="fas fa-plus mr-2"></i> Add Event
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <!-- Days Header -->
        <div class="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => `
            <div class="py-3 text-center text-sm font-semibold text-gray-600">${day}</div>
          `).join('')}
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 auto-rows-fr bg-gray-200 gap-px border-b border-gray-200">
    `;

        // Empty cells for previous month
        for (let i = 0; i < startingDay; i++) {
            html += `<div class="bg-white min-h-[120px] p-2 opacity-50"></div>`;
        }

        // Days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === dateStr);
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

            html += `
        <div class="bg-white min-h-[120px] p-2 hover:bg-gray-50 transition relative group cursor-pointer day-cell" data-date="${dateStr}">
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium ${isToday ? 'bg-nskblue text-white w-7 h-7 flex items-center justify-center rounded-full' : 'text-gray-700'}">
              ${day}
            </span>
            ${dayEvents.length > 0 ? `<span class="text-xs text-gray-400 font-medium">${dayEvents.length} events</span>` : ''}
          </div>
          
          <div class="mt-2 space-y-1">
            ${dayEvents.map(event => {
                let colorClass = 'bg-blue-100 text-blue-700 border-blue-200';
                if (event.type === 'holiday') colorClass = 'bg-red-100 text-red-700 border-red-200';
                if (event.type === 'exam') colorClass = 'bg-purple-100 text-purple-700 border-purple-200';
                if (event.type === 'meeting') colorClass = 'bg-yellow-100 text-yellow-700 border-yellow-200';

                return `
                <div class="text-xs px-2 py-1 rounded border ${colorClass} truncate" title="${event.title}">
                  ${event.title}
                </div>
              `;
            }).join('')}
          </div>
          
          <!-- Add Button on Hover -->
          <button class="absolute bottom-2 right-2 w-6 h-6 bg-gray-100 rounded-full text-gray-400 hover:bg-nskblue hover:text-white items-center justify-center hidden group-hover:flex transition add-event-mini" data-date="${dateStr}">
            <i class="fas fa-plus text-xs"></i>
          </button>
        </div>
      `;
        }

        // Empty cells for next month to fill grid
        const totalCells = startingDay + daysInMonth;
        const remainingCells = 42 - totalCells; // 6 rows * 7 cols
        for (let i = 0; i < remainingCells; i++) {
            html += `<div class="bg-white min-h-[120px] p-2 opacity-50"></div>`;
        }

        html += `</div></div>`;

        // Legend
        html += `
      <div class="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
        <div class="flex items-center text-sm text-gray-600">
          <span class="w-3 h-3 rounded-full bg-red-500 mr-2"></span> Holiday
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <span class="w-3 h-3 rounded-full bg-purple-500 mr-2"></span> Exam
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <span class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span> Meeting
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <span class="w-3 h-3 rounded-full bg-blue-500 mr-2"></span> Event
        </div>
      </div>
    `;

        container.innerHTML = html;
        attachListeners();
    };

    const attachListeners = () => {
        container.querySelector('#prev-month').addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        container.querySelector('#next-month').addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        container.querySelector('#add-event-btn').addEventListener('click', () => {
            const title = prompt('Enter event title:');
            if (title) {
                const date = prompt('Enter date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
                if (date) {
                    events.push({
                        id: Date.now(),
                        title,
                        date,
                        type: 'event'
                    });
                    renderCalendar();
                }
            }
        });

        container.querySelectorAll('.add-event-mini').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const date = btn.dataset.date;
                const title = prompt(`Add event for ${date}:`);
                if (title) {
                    events.push({
                        id: Date.now(),
                        title,
                        date,
                        type: 'event'
                    });
                    renderCalendar();
                }
            });
        });
    };

    // Initial Render
    renderCalendar();

    return container;
}
