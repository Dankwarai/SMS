export function renderCourseList(onViewCourse) {
  const container = document.createElement('div');
  container.className = 'course-list-container animate-fade-in';
  container.style.padding = '2rem';

  // Mock Data
  const courses = [
    { id: 1, title: 'Mathematics 101', code: 'MTH-101', teacher: 'Dr. Smith', students: 45, modules: 12, progress: 75, color: '#e7f5ff', icon: '📐' },
    { id: 2, title: 'Physics: Mechanics', code: 'PHY-201', teacher: 'Prof. Johnson', students: 32, modules: 8, progress: 40, color: '#fff0f6', icon: '⚛️' },
    { id: 3, title: 'World History', code: 'HIS-105', teacher: 'Mrs. Davis', students: 50, modules: 15, progress: 90, color: '#fff9db', icon: '🌍' },
    { id: 4, title: 'English Literature', code: 'ENG-301', teacher: 'Mr. Wilson', students: 28, modules: 10, progress: 60, color: '#ebfbee', icon: '📚' },
    { id: 5, title: 'Computer Science', code: 'CS-101', teacher: 'Ms. Clark', students: 60, modules: 20, progress: 25, color: '#f3f0ff', icon: '💻' },
    { id: 6, title: 'Chemistry Basics', code: 'CHM-102', teacher: 'Dr. Brown', students: 38, modules: 14, progress: 10, color: '#fff4e6', icon: '🧪' },
  ];

  const role = localStorage.getItem('sms-role') || 'admin';
  const isAdmin = role === 'admin';

  container.innerHTML = `
    <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
      <div>
        <h1>Course Catalog 📚</h1>
        <p class="text-muted">Browse and manage your curriculum.</p>
      </div>
      <div class="flex gap-2">
        <select class="form-control" style="width: auto;">
          <option>All Classes</option>
          <option>Class 10</option>
          <option>Class 12</option>
        </select>
        ${isAdmin ? `<button class="btn-primary">Add Course</button>` : ''}
      </div>
    </div>
    
    <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
      ${courses.map(course => `
        <div class="course-card animate-slide-in" data-id="${course.id}" style="cursor: pointer;">
          <div class="course-cover" style="background: ${course.color};">
            <span class="course-badge">${course.code}</span>
            ${course.icon}
          </div>
          <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <div class="course-meta">
              <span>👨‍🏫 ${course.teacher}</span>
              <span>•</span>
              <span>👥 ${course.students} Students</span>
            </div>
            
            <div class="course-progress">
              <div class="flex justify-between" style="font-size: 0.8rem; margin-bottom: 0.25rem;">
                <span class="text-muted">${course.modules} Modules</span>
                <span style="font-weight: 600; color: var(--color-primary);">${course.progress}% Complete</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${course.progress}%;"></div>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Event Listeners
  container.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      if (onViewCourse) onViewCourse(id);
    });
  });

  return container;
}
