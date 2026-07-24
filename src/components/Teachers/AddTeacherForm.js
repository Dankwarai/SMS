export function renderAddTeacherForm(onCancel, onSave) {
    const container = document.createElement('div');
    container.className = 'add-teacher-container';
    container.style.padding = '2rem';
    container.style.maxWidth = '800px';
    container.style.margin = '0 auto';

    container.innerHTML = `
    <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
      <h1>Add New Teacher 👨‍🏫</h1>
      <button id="cancel-btn" class="text-muted">Cancel</button>
    </div>
    
    <form id="add-teacher-form">
      <div class="card">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address *</label>
            <input type="email" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number *</label>
            <input type="tel" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label">Qualification *</label>
            <input type="text" class="form-control" placeholder="e.g. PhD in Physics" required>
          </div>
          <div class="form-group">
            <label class="form-label">Primary Subject *</label>
            <select class="form-control" required>
              <option value="">Select Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Experience (Years)</label>
            <input type="number" class="form-control" min="0">
          </div>
          <div class="form-group" style="grid-column: span 2;">
            <label class="form-label">Bio / Notes</label>
            <textarea class="form-control" rows="3"></textarea>
          </div>
        </div>
        
        <div class="flex justify-end gap-4" style="margin-top: 2rem;">
          <button type="submit" class="btn-primary" style="width: auto;">Save Teacher</button>
        </div>
      </div>
    </form>
  `;

    const form = container.querySelector('#add-teacher-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Saving...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Teacher added successfully! (Mock)');
            if (onSave) onSave();
        }, 1000);
    });

    container.querySelector('#cancel-btn').addEventListener('click', () => {
        if (onCancel) onCancel();
    });

    return container;
}
