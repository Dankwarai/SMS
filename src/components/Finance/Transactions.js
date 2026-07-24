export function renderTransactions(onBack) {
    const container = document.createElement('div');
    container.className = 'transactions-container';
    container.style.padding = '2rem';

    // Mock Data
    const transactions = [
        { id: 'TRX-001', date: '2023-10-24', student: 'Sarah Johnson', type: 'Tuition Fee', amount: 1200, mode: 'Online', status: 'Success' },
        { id: 'TRX-002', date: '2023-10-24', student: 'Michael Chen', type: 'Transport Fee', amount: 350, mode: 'Cash', status: 'Success' },
        { id: 'TRX-003', date: '2023-10-23', student: 'Emma Wilson', type: 'Exam Fee', amount: 150, mode: 'Card', status: 'Success' },
        { id: 'TRX-004', date: '2023-10-22', student: 'Olivia Davis', type: 'Library Fine', amount: 15, mode: 'Cash', status: 'Success' },
        { id: 'TRX-005', date: '2023-10-22', student: 'James Brown', type: 'Tuition Fee', amount: 1200, mode: 'Online', status: 'Failed' },
    ];

    container.innerHTML = `
    <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
      <div class="flex items-center gap-4">
        <button id="back-btn" class="text-muted">← Back</button>
        <h1>Transaction History 🧾</h1>
      </div>
      <button class="btn-primary" style="background: #eee; color: #333; width: auto;">Export CSV</button>
    </div>
    
    <div class="card">
      <div class="filters-bar">
        <input type="date" class="filter-input">
        <select class="filter-input">
          <option value="">All Payment Modes</option>
          <option value="Cash">Cash</option>
          <option value="Online">Online</option>
          <option value="Card">Card</option>
        </select>
        <select class="filter-input">
          <option value="">All Status</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
        </select>
      </div>
      
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Student</th>
            <th>Type</th>
            <th>Mode</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${transactions.map(t => `
            <tr>
              <td><small class="text-muted">${t.id}</small></td>
              <td>${t.date}</td>
              <td><strong>${t.student}</strong></td>
              <td>${t.type}</td>
              <td>${t.mode}</td>
              <td>$${t.amount}</td>
              <td><span class="status-badge ${t.status === 'Success' ? 'status-active' : 'status-pending'}" style="${t.status === 'Failed' ? 'background: #ffe3e3; color: #fa5252;' : ''}">${t.status}</span></td>
              <td><button class="text-primary">Receipt</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

    container.querySelector('#back-btn').addEventListener('click', () => {
        if (onBack) onBack();
    });

    return container;
}
