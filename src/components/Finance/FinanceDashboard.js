export function renderFinanceDashboard(onCollectFee, onViewTransactions) {
    const container = document.createElement('div');
    container.className = 'finance-dashboard-container';
    container.style.padding = '2rem';

    container.innerHTML = `
    <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
      <div>
        <h1>Finance Overview 💰</h1>
        <p class="text-muted">Track revenue, expenses, and pending fees.</p>
      </div>
      <div class="flex gap-2">
        <button id="transactions-btn" class="btn-primary" style="background: #eee; color: #333; width: auto;">View History</button>
        <button id="collect-fee-btn" class="btn-primary" style="width: auto;">+ Collect Fee</button>
      </div>
    </div>
    
    <div class="finance-grid">
      <div class="finance-card highlight">
        <div>
          <span class="text-muted" style="font-size: 0.9rem;">Total Revenue (This Month)</span>
          <div class="stat-value" style="font-size: 2.5rem; margin-top: 0.5rem;">$124,500</div>
        </div>
        <div style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.9;">
          ↑ 15% vs last month
        </div>
      </div>
      
      <div class="finance-card">
        <div>
          <span class="text-muted" style="font-size: 0.9rem;">Pending Fees</span>
          <div class="stat-value text-primary" style="font-size: 2.5rem; margin-top: 0.5rem;">$12,400</div>
        </div>
        <div style="margin-top: 1rem; font-size: 0.9rem; color: #fa5252;">
          45 Students Pending
        </div>
      </div>
      
      <div class="finance-card">
        <div>
          <span class="text-muted" style="font-size: 0.9rem;">Total Expenses</span>
          <div class="stat-value" style="font-size: 2.5rem; margin-top: 0.5rem; color: var(--color-text-main);">$45,200</div>
        </div>
        <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--color-text-muted);">
          Salaries & Maintenance
        </div>
      </div>
    </div>
    
    <div class="card">
      <h3 style="margin-bottom: 1.5rem;">Recent Transactions</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Student</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Oct 24, 2023</td>
            <td>Sarah Johnson</td>
            <td>Tuition Fee</td>
            <td>$1,200</td>
            <td><span class="status-badge status-active">Paid</span></td>
          </tr>
          <tr>
            <td>Oct 24, 2023</td>
            <td>Michael Chen</td>
            <td>Transport Fee</td>
            <td>$350</td>
            <td><span class="status-badge status-active">Paid</span></td>
          </tr>
          <tr>
            <td>Oct 23, 2023</td>
            <td>Emma Wilson</td>
            <td>Exam Fee</td>
            <td>$150</td>
            <td><span class="status-badge status-active">Paid</span></td>
          </tr>
          <tr>
            <td>Oct 23, 2023</td>
            <td>James Brown</td>
            <td>Tuition Fee</td>
            <td>$1,200</td>
            <td><span class="status-badge status-pending">Pending</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

    // Event Listeners
    container.querySelector('#collect-fee-btn').addEventListener('click', () => {
        if (onCollectFee) onCollectFee();
    });

    container.querySelector('#transactions-btn').addEventListener('click', () => {
        if (onViewTransactions) onViewTransactions();
    });

    return container;
}
