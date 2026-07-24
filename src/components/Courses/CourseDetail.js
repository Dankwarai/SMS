export function renderCourseDetail(courseId, onBack) {
    const container = document.createElement('div');
    container.className = 'course-detail-container animate-fade-in';
    container.style.padding = '2rem';

    // Mock Data
    const course = {
        id: courseId,
        title: 'Mathematics 101',
        code: 'MTH-101',
        teacher: 'Dr. Smith',
        description: 'A comprehensive introduction to algebra, geometry, and calculus basics. Designed for Class 10 students.',
        syllabus: [
            { title: 'Introduction to Algebra', desc: 'Variables, equations, and inequalities.', completed: true },
            { title: 'Linear Equations', desc: 'Solving linear equations in one and two variables.', completed: true },
            { title: 'Quadratic Equations', desc: 'Factoring, quadratic formula, and graphing.', completed: true },
            { title: 'Geometry Basics', desc: 'Points, lines, angles, and shapes.', completed: false },
            { title: 'Trigonometry', desc: 'Sine, cosine, and tangent ratios.', completed: false },
            { title: 'Calculus Preview', desc: 'Limits and derivatives.', completed: false },
        ]
    };

    container.innerHTML = `
    <button id="back-btn" class="text-muted" style="margin-bottom: 1rem;">← Back to Courses</button>
    
    <div class="card animate-slide-in" style="margin-bottom: 2rem; padding: 2rem;">
      <div class="flex justify-between items-start">
        <div>
          <span class="badge" style="background: var(--color-primary-light); color: var(--color-primary); padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.9rem;">${course.code}</span>
          <h1 style="margin-top: 0.5rem; margin-bottom: 0.5rem;">${course.title}</h1>
          <p class="text-muted" style="max-width: 600px;">${course.description}</p>
          
          <div class="flex gap-4" style="margin-top: 1.5rem;">
            <div class="flex items-center gap-2">
              <div style="width: 30px; height: 30px; background: #eee; border-radius: 50%; display: flex; align-items: center; justify-content: center;">👨‍🏫</div>
              <span style="font-weight: 600;">${course.teacher}</span>
            </div>
            <div class="flex items-center gap-2">
              <div style="width: 30px; height: 30px; background: #eee; border-radius: 50%; display: flex; align-items: center; justify-content: center;">📅</div>
              <span class="text-muted">Mon, Wed, Fri</span>
            </div>
          </div>
        </div>
        
        <div class="text-right">
          <button class="btn-primary">Edit Course</button>
        </div>
      </div>
    </div>
    
    <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 2rem;">
      <!-- Syllabus -->
      <div class="card animate-slide-in" style="animation-delay: 0.1s;">
        <h2 style="margin-bottom: 1.5rem;">Syllabus 📝</h2>
        <div class="syllabus-list">
          ${course.syllabus.map(item => `
            <div class="syllabus-item">
              <div class="syllabus-title flex items-center gap-2">
                ${item.title}
                ${item.completed ? '<span style="font-size: 0.8rem; color: #0ca678;">(Completed)</span>' : ''}
              </div>
              <div class="syllabus-desc">${item.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- Resources & Stats -->
      <div class="flex flex-col gap-4">
        <div class="card animate-slide-in" style="animation-delay: 0.2s;">
          <h3 style="margin-bottom: 1rem;">Resources 📂</h3>
          <ul style="list-style: none;">
            <li style="padding: 0.75rem 0; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 0.5rem; cursor: pointer;" class="text-primary">
              📄 Course Syllabus.pdf
            </li>
            <li style="padding: 0.75rem 0; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 0.5rem; cursor: pointer;" class="text-primary">
              📊 Practice Problems.docx
            </li>
            <li style="padding: 0.75rem 0; display: flex; align-items: center; gap: 0.5rem; cursor: pointer;" class="text-primary">
              🎥 Lecture Recordings
            </li>
          </ul>
        </div>
        
        <div class="card animate-slide-in" style="animation-delay: 0.3s; background: var(--color-primary); color: white;">
          <h3 style="margin-bottom: 0.5rem;">Next Class</h3>
          <div style="font-size: 1.5rem; font-weight: 700;">Tomorrow, 10:00 AM</div>
          <p style="opacity: 0.9; margin-top: 0.5rem;">Topic: Trigonometry</p>
        </div>
      </div>
    </div>
  `;

    container.querySelector('#back-btn').addEventListener('click', () => {
        if (onBack) onBack();
    });

    return container;
}
