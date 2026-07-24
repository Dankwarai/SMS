export function renderTeacherForm(teacher = null, onSave, onCancel) {
    const container = document.createElement('div');
    container.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in';

    const isEdit = !!teacher;

    container.innerHTML = `
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all scale-100">
      <div class="bg-nsknavy p-6 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-white">${isEdit ? 'Edit Teacher' : 'Add New Teacher'}</h2>
        <button id="close-btn" class="text-white hover:text-gray-200 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <div class="p-8">
        <form id="teacher-form" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Personal Info -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" value="${teacher?.name || ''}" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nskblue focus:border-transparent outline-none transition">
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" value="${teacher?.email || ''}" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nskblue focus:border-transparent outline-none transition">
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Subject Specialization</label>
              <select name="subject" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nskblue focus:border-transparent outline-none transition">
                <option value="">Select Subject</option>
                <option value="Mathematics" ${teacher?.subject === 'Mathematics' ? 'selected' : ''}>Mathematics</option>
                <option value="English" ${teacher?.subject === 'English' ? 'selected' : ''}>English</option>
                <option value="Science" ${teacher?.subject === 'Science' ? 'selected' : ''}>Science</option>
                <option value="History" ${teacher?.subject === 'History' ? 'selected' : ''}>History</option>
                <option value="Geography" ${teacher?.subject === 'Geography' ? 'selected' : ''}>Geography</option>
                <option value="Physics" ${teacher?.subject === 'Physics' ? 'selected' : ''}>Physics</option>
                <option value="Chemistry" ${teacher?.subject === 'Chemistry' ? 'selected' : ''}>Chemistry</option>
                <option value="Biology" ${teacher?.subject === 'Biology' ? 'selected' : ''}>Biology</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Experience (Years)</label>
              <input type="number" name="exp" value="${teacher?.exp?.replace(' Years', '') || ''}" min="0" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nskblue focus:border-transparent outline-none transition">
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" name="phone" value="${teacher?.phone || ''}" placeholder="+1 (555) 000-0000" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nskblue focus:border-transparent outline-none transition">
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Join Date</label>
              <input type="date" name="joinDate" value="${teacher?.joinDate || ''}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nskblue focus:border-transparent outline-none transition">
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Address</label>
            <textarea name="address" rows="2" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nskblue focus:border-transparent outline-none transition">${teacher?.address || ''}</textarea>
          </div>

          <div class="flex justify-end space-x-4 pt-4 border-t border-gray-100">
            <button type="button" id="cancel-btn" class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">Cancel</button>
            <button type="submit" class="px-6 py-2 bg-nskblue text-white rounded-lg hover:bg-nsknavy transition shadow-md flex items-center">
              <i class="fas fa-save mr-2"></i> ${isEdit ? 'Update Teacher' : 'Save Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

    // Event Listeners
    const close = () => {
        container.classList.remove('animate-fade-in');
        container.classList.add('animate-fade-out');
        setTimeout(() => {
            if (onCancel) onCancel();
            container.remove();
        }, 300);
    };

    container.querySelector('#close-btn').addEventListener('click', close);
    container.querySelector('#cancel-btn').addEventListener('click', close);

    container.querySelector('#teacher-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            id: teacher?.id || `T-${Date.now()}`, // Generate ID if new
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            exp: `${formData.get('exp')} Years`,
            phone: formData.get('phone'),
            joinDate: formData.get('joinDate'),
            address: formData.get('address')
        };

        if (onSave) onSave(data);
        close();
    });

    return container;
}
