import Chart from 'chart.js/auto';

export function renderAIInsights() {
    const container = document.createElement('div');
    container.className = 'ai-insights-container animate-fade-in';
    container.style.padding = '2rem';

    container.innerHTML = `
    <div class="flex justify-between items-center mb-8">
        <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                AI Insights 🧠
            </h1>
            <p class="text-gray-600 mt-2">Predictive analytics and smart recommendations for your institution.</p>
        </div>
        <div class="flex gap-3">
            <button class="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg font-semibold hover:bg-purple-100 transition flex items-center gap-2">
                <i class="fas fa-sync-alt"></i> Refresh Data
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2">
                <i class="fas fa-file-export"></i> Export Report
            </button>
        </div>
    </div>

    <!-- Smart Cards Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Card 1: At-Risk Prediction -->
        <div class="bg-white p-6 rounded-2xl shadow-lg border border-purple-50 relative overflow-hidden group hover:shadow-xl transition">
            <div class="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 transition group-hover:scale-110"></div>
            <div class="relative z-10">
                <div class="flex justify-between items-start mb-4">
                    <div class="p-3 bg-red-100 text-red-600 rounded-xl">
                        <i class="fas fa-exclamation-triangle text-xl"></i>
                    </div>
                    <span class="text-xs font-bold px-2 py-1 bg-red-50 text-red-600 rounded-full">High Priority</span>
                </div>
                <h3 class="text-gray-500 text-sm font-medium mb-1">At-Risk Students</h3>
                <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-bold text-gray-800">12</span>
                    <span class="text-sm text-red-500 font-medium">↑ 2 this week</span>
                </div>
                <p class="text-xs text-gray-400 mt-4">Predicted based on attendance & recent grades.</p>
            </div>
        </div>

        <!-- Card 2: Top Performers -->
        <div class="bg-white p-6 rounded-2xl shadow-lg border border-purple-50 relative overflow-hidden group hover:shadow-xl transition">
            <div class="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 transition group-hover:scale-110"></div>
            <div class="relative z-10">
                <div class="flex justify-between items-start mb-4">
                    <div class="p-3 bg-green-100 text-green-600 rounded-xl">
                        <i class="fas fa-star text-xl"></i>
                    </div>
                    <span class="text-xs font-bold px-2 py-1 bg-green-50 text-green-600 rounded-full">Rising Stars</span>
                </div>
                <h3 class="text-gray-500 text-sm font-medium mb-1">Top Performers</h3>
                <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-bold text-gray-800">28</span>
                    <span class="text-sm text-green-500 font-medium">Consistent >90%</span>
                </div>
                <p class="text-xs text-gray-400 mt-4">Students exceeding expectations in STEM.</p>
            </div>
        </div>

        <!-- Card 3: Attendance Forecast -->
        <div class="bg-white p-6 rounded-2xl shadow-lg border border-purple-50 relative overflow-hidden group hover:shadow-xl transition">
            <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition group-hover:scale-110"></div>
            <div class="relative z-10">
                <div class="flex justify-between items-start mb-4">
                    <div class="p-3 bg-blue-100 text-blue-600 rounded-xl">
                        <i class="fas fa-chart-line text-xl"></i>
                    </div>
                    <span class="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Forecast</span>
                </div>
                <h3 class="text-gray-500 text-sm font-medium mb-1">Attendance Trend</h3>
                <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-bold text-gray-800">94%</span>
                    <span class="text-sm text-blue-500 font-medium">Expected next week</span>
                </div>
                <p class="text-xs text-gray-400 mt-4">Based on historical seasonal data.</p>
            </div>
        </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left Column: Charts -->
        <div class="lg:col-span-2 space-y-8">
            <!-- Performance Prediction Chart -->
            <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="font-bold text-lg text-gray-800">Performance Prediction Model</h3>
                    <select class="text-sm border-gray-200 rounded-lg text-gray-500 focus:ring-purple-500">
                        <option>All Classes</option>
                        <option>Class 10</option>
                        <option>Class 12</option>
                    </select>
                </div>
                <div style="height: 300px;">
                    <canvas id="performanceChart"></canvas>
                </div>
            </div>

            <!-- Subject Analysis -->
            <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 class="font-bold text-lg text-gray-800 mb-6">Subject Difficulty Analysis</h3>
                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span class="font-medium text-gray-700">Physics (Mechanics)</span>
                            <span class="text-red-500 font-bold">Hardest</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2.5">
                            <div class="bg-red-500 h-2.5 rounded-full" style="width: 85%"></div>
                        </div>
                        <p class="text-xs text-gray-400 mt-1">85% of students struggle with this topic.</p>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span class="font-medium text-gray-700">Mathematics (Calculus)</span>
                            <span class="text-orange-500 font-bold">Moderate</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2.5">
                            <div class="bg-orange-400 h-2.5 rounded-full" style="width: 65%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span class="font-medium text-gray-700">English Literature</span>
                            <span class="text-green-500 font-bold">Easiest</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2.5">
                            <div class="bg-green-500 h-2.5 rounded-full" style="width: 25%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Column: AI Recommendations -->
        <div class="space-y-6">
            <div class="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-2xl shadow-xl text-white">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <i class="fas fa-robot text-xl"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-lg">AI Assistant</h3>
                        <p class="text-indigo-200 text-xs">Real-time analysis</p>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                        <p class="text-sm leading-relaxed">
                            "I've noticed a <strong>15% drop</strong> in Physics scores for Class 10-A. Consider scheduling a remedial session for 'Newton's Laws'."
                        </p>
                        <button class="mt-3 text-xs bg-white text-indigo-900 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-50 transition">
                            Schedule Session
                        </button>
                    </div>
                    <div class="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                        <p class="text-sm leading-relaxed">
                            "Student <strong>Sarah Johnson</strong> is showing signs of burnout. Her attendance has dipped for 3 consecutive days."
                        </p>
                        <button class="mt-3 text-xs bg-white text-indigo-900 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-50 transition">
                            View Profile
                        </button>
                    </div>
                </div>
            </div>

            <!-- Learning Gaps -->
            <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 class="font-bold text-lg text-gray-800 mb-4">Identified Learning Gaps</h3>
                <div class="space-y-3">
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div class="w-2 h-12 bg-purple-500 rounded-full"></div>
                        <div>
                            <h4 class="font-bold text-sm text-gray-800">Quadratic Equations</h4>
                            <p class="text-xs text-gray-500">Math • Class 9</p>
                        </div>
                        <span class="ml-auto text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">Critical</span>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div class="w-2 h-12 bg-blue-500 rounded-full"></div>
                        <div>
                            <h4 class="font-bold text-sm text-gray-800">Chemical Bonding</h4>
                            <p class="text-xs text-gray-500">Chemistry • Class 11</p>
                        </div>
                        <span class="ml-auto text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">Moderate</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    // Initialize Charts
    setTimeout(() => {
        const ctx = container.querySelector('#performanceChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Actual Performance',
                        data: [75, 78, 80, 82, 85, 88],
                        borderColor: '#7c3aed',
                        backgroundColor: 'rgba(124, 58, 237, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'AI Prediction',
                        data: [null, null, null, null, 88, 92],
                        borderColor: '#9333ea',
                        borderDash: [5, 5],
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 100
                    }
                }
            }
        });
    }, 0);

    return container;
}
