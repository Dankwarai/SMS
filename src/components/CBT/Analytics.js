export function renderAnalytics() {
    const container = document.createElement('div');
    container.className = 'animate-fade-in p-6';

    container.innerHTML = `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-nsknavy">Performance Analytics 📈</h1>
        <p class="text-gray-600">Overview of student performance and exam statistics.</p>
      </div>
      <select class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 focus:outline-none focus:border-nskblue">
        <option>Last 30 Days</option>
        <option>This Term</option>
        <option>All Time</option>
      </select>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-nskblue">
        <p class="text-gray-500 text-sm mb-1">Average Score</p>
        <p class="text-3xl font-bold text-nsknavy">78%</p>
        <p class="text-xs text-green-500 mt-1">↑ 4% from last term</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-nskgreen">
        <p class="text-gray-500 text-sm mb-1">Pass Rate</p>
        <p class="text-3xl font-bold text-nsknavy">92%</p>
        <p class="text-xs text-gray-400 mt-1">Total 145 Students</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-nskgold">
        <p class="text-gray-500 text-sm mb-1">Exams Taken</p>
        <p class="text-3xl font-bold text-nsknavy">1,240</p>
        <p class="text-xs text-gray-400 mt-1">Across all subjects</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-nskred">
        <p class="text-gray-500 text-sm mb-1">Needs Improvement</p>
        <p class="text-3xl font-bold text-nsknavy">12</p>
        <p class="text-xs text-red-500 mt-1">Students below 50%</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Subject Performance -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-bold text-nsknavy mb-6">Subject Performance</h3>
        <div class="space-y-4">
            <div>
                <div class="flex justify-between text-sm mb-1">
                    <span class="font-semibold text-gray-700">Mathematics</span>
                    <span class="text-gray-600">82%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2.5">
                    <div class="bg-nskblue h-2.5 rounded-full" style="width: 82%"></div>
                </div>
            </div>
            <div>
                <div class="flex justify-between text-sm mb-1">
                    <span class="font-semibold text-gray-700">Physics</span>
                    <span class="text-gray-600">75%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2.5">
                    <div class="bg-purple-500 h-2.5 rounded-full" style="width: 75%"></div>
                </div>
            </div>
            <div>
                <div class="flex justify-between text-sm mb-1">
                    <span class="font-semibold text-gray-700">Chemistry</span>
                    <span class="text-gray-600">68%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2.5">
                    <div class="bg-yellow-500 h-2.5 rounded-full" style="width: 68%"></div>
                </div>
            </div>
            <div>
                <div class="flex justify-between text-sm mb-1">
                    <span class="font-semibold text-gray-700">Biology</span>
                    <span class="text-gray-600">88%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2.5">
                    <div class="bg-green-500 h-2.5 rounded-full" style="width: 88%"></div>
                </div>
            </div>
        </div>
      </div>

      <!-- Recent Exams -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-bold text-nsknavy mb-6">Recent Exam Results</h3>
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead class="bg-gray-50 text-gray-600">
                    <tr>
                        <th class="p-3 text-left rounded-l-lg">Exam</th>
                        <th class="p-3 text-center">Date</th>
                        <th class="p-3 text-center">Avg. Score</th>
                        <th class="p-3 text-center rounded-r-lg">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b border-gray-50">
                        <td class="p-3 font-medium text-gray-800">Math Final Term 1</td>
                        <td class="p-3 text-center text-gray-500">Nov 20</td>
                        <td class="p-3 text-center font-bold text-nskblue">76%</td>
                        <td class="p-3 text-center"><span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Completed</span></td>
                    </tr>
                    <tr class="border-b border-gray-50">
                        <td class="p-3 font-medium text-gray-800">Physics Quiz 3</td>
                        <td class="p-3 text-center text-gray-500">Nov 18</td>
                        <td class="p-3 text-center font-bold text-nskblue">81%</td>
                        <td class="p-3 text-center"><span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Completed</span></td>
                    </tr>
                    <tr class="border-b border-gray-50">
                        <td class="p-3 font-medium text-gray-800">English Lit Review</td>
                        <td class="p-3 text-center text-gray-500">Nov 15</td>
                        <td class="p-3 text-center font-bold text-nskblue">85%</td>
                        <td class="p-3 text-center"><span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Completed</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  `;

    return container;
}
