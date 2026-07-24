export function renderAdmissionForm(onCancel, onSave) {
    const container = document.createElement('div');
    container.className = 'admission-form-container';
    container.style.padding = '2rem';
    container.style.maxWidth = '1000px';
    container.style.margin = '0 auto';

    container.innerHTML = `
    <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
      <h1>New Student Admission 📝</h1>
      <button id="cancel-btn" class="text-muted">Cancel</button>
    </div>
    
    <form id="admission-form">
      <!-- Section 1: Personal Details -->
      <div class="card" style="margin-bottom: 2rem;">
        <div class="form-section-title">1. Personal Information</div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">First Name *</label>
            <input type="text" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label">Last Name *</label>
            <input type="text" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label">Date of Birth *</label>
            <input type="date" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label">Gender *</label>
            <select class="form-control" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-group" style="grid-column: span 2;">
            <label class="form-label">Address</label>
            <textarea class="form-control" rows="2"></textarea>
          </div>
        </div>
      </div>
      
      <!-- Section 2: Academic Details -->
      <div class="card" style="margin-bottom: 2rem;">
        <div class="form-section-title">2. Academic Information</div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Class for Admission *</label>
            <select class="form-control" required>
              <option value="">Select Class</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Previous School</label>
            <input type="text" class="form-control">
          </div>
          <div class="form-group">
            <label class="form-label">Admission Date *</label>
            <input type="date" class="form-control" value="${new Date().toISOString().split('T')[0]}" required>
          </div>
        </div>
      </div>
      
      <!-- Section 3: Guardian Details -->
      <div class="card" style="margin-bottom: 2rem;">
        <div class="form-section-title">3. Guardian Information</div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Father's Name *</label>
            <input type="text" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label">Mother's Name</label>
            <input type="text" class="form-control">
          </div>
          <div class="form-group">
            <label class="form-label">Primary Phone *</label>
            <input type="tel" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-control">
          </div>
        </div>
      </div>
      
      <div class="flex justify-end gap-4">
        <button type="button" id="reset-btn" class="btn-primary" style="background: #eee; color: #333; width: auto;">Reset</button>
        <button type="submit" class="btn-primary" style="width: auto;">Submit Admission</button>
      </div>
    </form>
  `;

    // Event Listeners
    const form = container.querySelector('#admission-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate API call
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Processing...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Student admitted successfully! (Mock)');
            if (onSave) onSave();
        }, 1000);
    });

    container.querySelector('#cancel-btn').addEventListener('click', () => {
        if (onCancel) onCancel();
    });

    return container;
}
