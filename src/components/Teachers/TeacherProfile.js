export function renderTeacherProfile(teacher, onBack) {
  const container = document.createElement('div');
  container.className = 'animate-fade-in p-8';

  // Mock Schedule Data
  const schedule = [
    { time: '08:00 - 08:45', mon: 'Math (10-A)', tue: 'Math (10-B)', wed: 'Free', thu: 'Math (10-A)', fri: 'Math (10-B)' },
    { time: '08:45 - 09:30', mon: 'Free', tue: 'Math (9-A)', wed: 'Math (10-A)', thu: 'Free', fri: 'Math (9-A)' },
    { time: '09:30 - 10:15', mon: 'Math (9-A)', tue: 'Free', wed: 'Math (9-B)', thu: 'Math (9-B)', fri: 'Free' },
  ];

  container.innerHTML = `
    <!-- Header -->
    <div class="flex items-center mb-8">
      <button id="back-btn" class="mr-4 p-2 rounded-full hover:bg-gray-100 transition text-gray-600">
        <i class="fas fa-arrow-left text-xl"></i>
      </button>
      <div>
        <h1 class="text-2xl font-bold text-nsknavy">Teacher Profile</h1>
        <p class="text-gray-500">View details and schedule</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Profile Card -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="h-32 bg-gradient-to-r from-nskblue to-nsklightblue"></div>
          <div class="px-6 pb-6 relative">
            <div class="relative -top-12 mb-[-3rem]">
              <img src="https://ui-avatars.com/api/?name=${teacher.name}&background=random&size=128" alt="${teacher.name}" class="w-24 h-24 rounded-full border-4 border-white shadow-lg">
            </div>
            <div class="mt-16 text-center">
              <h2 class="text-xl font-bold text-nsknavy">${teacher.name}</h2>
              <p class="text-nskblue font-medium">${teacher.subject} Department</p>
              <div class="mt-4 flex justify-center space-x-2">
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Active</span>
                <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">Full Time</span>
              </div>
            </div>
            
            <div class="mt-8 space-y-4 border-t border-gray-100 pt-6">
              <div class="flex items-center text-gray-600">
                <i class="fas fa-envelope w-6 text-center text-nskblue mr-3"></i>
                <span>${teacher.email}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <i class="fas fa-phone w-6 text-center text-nskblue mr-3"></i>
                <span>${teacher.phone || '+1 (555) 123-4567'}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <i class="fas fa-briefcase w-6 text-center text-nskblue mr-3"></i>
                <span>${teacher.exp} Experience</span>
              </div>
              <div class="flex items-center text-gray-600">
                <i class="fas fa-map-marker-alt w-6 text-center text-nskblue mr-3"></i>
                <span>${teacher.address || '123 School Lane, Education City'}</span>
              </div>
            </div>

            <div class="mt-8">
              <button class="w-full py-2 bg-nsklight text-nskblue rounded-lg font-semibold hover:bg-blue-100 transition">
                <i class="fas fa-edit mr-2"></i> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Schedule & Stats -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p class="text-gray-500 text-sm">Total Classes</p>
            <p class="text-2xl font-bold text-nsknavy">18</p>
          </div>
          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p class="text-gray-500 text-sm">Students</p>
            <p class="text-2xl font-bold text-nsknavy">145</p>
          </div>
          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p class="text-gray-500 text-sm">Rating</p>
            <p class="text-2xl font-bold text-nskgold">4.8/5</p>
          </div>
        </div>

        <!-- Schedule Table -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-nsknavy mb-4 flex items-center">
            <i class="fas fa-calendar-alt mr-2 text-nskblue"></i> Weekly Schedule
          </h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-50 text-gray-600">
                  <th class="p-3 text-left rounded-l-lg">Time</th>
                  <th class="p-3 text-center">Mon</th>
                  <th class="p-3 text-center">Tue</th>
                  <th class="p-3 text-center">Wed</th>
                  <th class="p-3 text-center">Thu</th>
                  <th class="p-3 text-center rounded-r-lg">Fri</th>
                </tr>
              </thead>
              <tbody>
                ${schedule.map(row => `
                  <tr class="border-b border-gray-50">
                    <td class="p-3 font-medium text-gray-500">${row.time}</td>
                    <td class="p-2 text-center">${row.mon !== 'Free' ? `<span class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">${row.mon}</span>` : '<span class="text-gray-300">-</span>'}</td>
                    <td class="p-2 text-center">${row.tue !== 'Free' ? `<span class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">${row.tue}</span>` : '<span class="text-gray-300">-</span>'}</td>
                    <td class="p-2 text-center">${row.wed !== 'Free' ? `<span class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">${row.wed}</span>` : '<span class="text-gray-300">-</span>'}</td>
                    <td class="p-2 text-center">${row.thu !== 'Free' ? `<span class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">${row.thu}</span>` : '<span class="text-gray-300">-</span>'}</td>
                    <td class="p-2 text-center">${row.fri !== 'Free' ? `<span class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">${row.fri}</span>` : '<span class="text-gray-300">-</span>'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#back-btn').addEventListener('click', () => {
    if (onBack) onBack();
  });

  return container;
}
