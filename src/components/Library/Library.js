
export function renderLibrary() {
    const container = document.createElement('div');
    container.className = 'library-container animate-slide-in';
    container.style.padding = '2rem';

    // Mock Data
    const stats = [
        { label: 'Total Books', value: '1,250', icon: '📚', color: 'var(--color-primary)' },
        { label: 'Issued Books', value: '342', icon: '📖', color: 'var(--color-accent)' },
        { label: 'Overdue', value: '15', icon: '⚠️', color: '#f59f00' },
        { label: 'New Arrivals', value: '45', icon: '✨', color: '#20c997' },
    ];

    const books = [
        { id: 'BK-001', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', status: 'Available', category: 'Fiction' },
        { id: 'BK-002', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0262033848', status: 'Issued', category: 'Computer Science' },
        { id: 'BK-003', title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', status: 'Available', category: 'Computer Science' },
        { id: 'BK-004', title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', status: 'Issued', category: 'Fiction' },
        { id: 'BK-005', title: '1984', author: 'George Orwell', isbn: '978-0451524935', status: 'Available', category: 'Fiction' },
    ];

    container.innerHTML = `
    <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
      <div>
        <h1>Library 📚</h1>
        <p class="text-muted">Manage books, issues, and returns.</p>
      </div>
      <div class="flex gap-2">
        <button class="btn-primary" style="background: var(--color-bg-surface); color: var(--color-text-main); border: 1px solid #eee;">Issue Book</button>
        <button class="btn-primary">+ Add New Book</button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid dashboard-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
      ${stats.map(stat => `
        <div class="card flex items-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: ${stat.color}20; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
            ${stat.icon}
          </div>
          <div>
            <div class="text-muted" style="font-size: 0.9rem;">${stat.label}</div>
            <div style="font-size: 1.5rem; font-weight: 700;">${stat.value}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Books Table -->
    <div class="card">
      <div class="flex justify-between items-center p-4 border-b" style="border-bottom: 1px solid #f1f3f5; padding: 1.5rem; background: #fff;">
        <h3 style="font-size: 1.1rem;">Book Inventory</h3>
        <div class="search-bar" style="width: 250px; background: #f8f9fa;">
          <span>🔍</span>
          <input type="text" class="search-input" placeholder="Search books...">
        </div>
      </div>
      
      <div style="overflow-x: auto;">
        <table class="table" style="width: 100%; border-collapse: separate; border-spacing: 0;">
          <thead style="background: #f8f9fa;">
            <tr>
              <th style="padding: 1rem 1.5rem; text-align: left; font-size: 0.85rem; color: var(--color-text-muted);">Title</th>
              <th style="padding: 1rem; text-align: left; font-size: 0.85rem; color: var(--color-text-muted);">Author</th>
              <th style="padding: 1rem; text-align: left; font-size: 0.85rem; color: var(--color-text-muted);">Category</th>
              <th style="padding: 1rem; text-align: left; font-size: 0.85rem; color: var(--color-text-muted);">ISBN</th>
              <th style="padding: 1rem; text-align: left; font-size: 0.85rem; color: var(--color-text-muted);">Status</th>
              <th style="padding: 1rem 1.5rem; text-align: right; font-size: 0.85rem; color: var(--color-text-muted);">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${books.map(book => `
              <tr style="transition: background 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #f1f3f5;">
                  <div style="font-weight: 600;">${book.title}</div>
                  <div class="text-muted" style="font-size: 0.8rem;">${book.id}</div>
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5;">${book.author}</td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5;"><span style="background: #f1f3f5; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">${book.category}</span></td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5; font-family: monospace;">${book.isbn}</td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5;">
                  <span style="
                    background: ${book.status === 'Available' ? '#dcfce7' : '#fee2e2'}; 
                    color: ${book.status === 'Available' ? '#166534' : '#991b1b'}; 
                    padding: 4px 12px; 
                    border-radius: 20px; 
                    font-size: 0.8rem; 
                    font-weight: 600;
                  ">
                    ${book.status}
                  </span>
                </td>
                <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #f1f3f5; text-align: right;">
                  <button class="action-btn" title="Edit">✏️</button>
                  <button class="action-btn" title="Delete" style="color: #fa5252;">🗑️</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

    return container;
}
