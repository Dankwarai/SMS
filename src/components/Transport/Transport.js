
export function renderTransport() {
    const container = document.createElement('div');
    container.className = 'transport-container animate-slide-in';
    container.style.padding = '2rem';

    // Mock Data
    const stats = [
        { label: 'Total Buses', value: '12', icon: '🚌', color: 'var(--color-primary)' },
        { label: 'Active Routes', value: '8', icon: '🛣️', color: 'var(--color-accent)' },
        { label: 'Students Transported', value: '450', icon: '🎒', color: '#20c997' },
        { label: 'Maintenance', value: '2', icon: '🔧', color: '#f59f00' },
    ];

    const routes = [
        { id: 'RT-101', name: 'North City Loop', driver: 'James Wilson', vehicle: 'BUS-04', capacity: '40/50', status: 'On Route' },
        { id: 'RT-102', name: 'South Suburbs', driver: 'Sarah Connor', vehicle: 'BUS-07', capacity: '48/50', status: 'On Route' },
        { id: 'RT-103', name: 'East Side Express', driver: 'Mike O\'Hearn', vehicle: 'BUS-02', capacity: '30/50', status: 'Completed' },
        { id: 'RT-104', name: 'West End Shuttle', driver: 'Linda Hamilton', vehicle: 'BUS-09', capacity: '25/30', status: 'Delayed' },
        { id: 'RT-105', name: 'Downtown Connector', driver: 'Arnold S.', vehicle: 'BUS-01', capacity: '50/50', status: 'On Route' },
    ];

    container.innerHTML = `
    <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
      <div>
        <h1>Transport 🚌</h1>
        <p class="text-muted">Manage fleet, routes, and drivers.</p>
      </div>
      <div class="flex gap-2">
        <button class="btn-primary" style="background: var(--color-bg-surface); color: var(--color-text-main); border: 1px solid #eee;">Driver Roster</button>
        <button class="btn-primary">+ Add Route</button>
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

    <!-- Live Map Placeholder -->
    <div class="card" style="margin-bottom: 2rem; height: 300px; background: #e9ecef; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
      <div style="text-align: center; color: var(--color-text-muted);">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
        <h3>Live Fleet Tracking</h3>
        <p>Interactive map integration would go here.</p>
      </div>
    </div>

    <!-- Routes Table -->
    <div class="card">
      <div class="flex justify-between items-center p-4 border-b" style="border-bottom: 1px solid #f1f3f5; padding: 1.5rem; background: #fff;">
        <h3 style="font-size: 1.1rem;">Active Routes</h3>
        <div class="search-bar" style="width: 250px; background: #f8f9fa;">
          <span>🔍</span>
          <input type="text" class="search-input" placeholder="Search routes...">
        </div>
      </div>
      
      <div style="overflow-x: auto;">
        <table class="table" style="width: 100%; border-collapse: separate; border-spacing: 0;">
          <thead style="background: #f8f9fa;">
            <tr>
              <th style="padding: 1rem 1.5rem; text-align: left; font-size: 0.85rem; color: var(--color-text-muted);">Route Name</th>
              <th style="padding: 1rem; text-align: left; font-size: 0.85rem; color: var(--color-text-muted);">Driver</th>
              <th style="padding: 1rem; text-align: left; font-size: 0.85rem; color: var(--color-text-muted);">Vehicle No.</th>
              <th style="padding: 1rem; text-align: left; font-size: 0.85rem; color: var(--color-text-muted);">Capacity</th>
              <th style="padding: 1rem; text-align: left; font-size: 0.85rem; color: var(--color-text-muted);">Status</th>
              <th style="padding: 1rem 1.5rem; text-align: right; font-size: 0.85rem; color: var(--color-text-muted);">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${routes.map(route => `
              <tr style="transition: background 0.2s;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #f1f3f5;">
                  <div style="font-weight: 600;">${route.name}</div>
                  <div class="text-muted" style="font-size: 0.8rem;">${route.id}</div>
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5;">${route.driver}</td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5;"><span style="background: #f1f3f5; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem; font-family: monospace;">${route.vehicle}</span></td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5;">${route.capacity}</td>
                <td style="padding: 1rem; border-bottom: 1px solid #f1f3f5;">
                  <span style="
                    background: ${route.status === 'On Route' ? '#dbeafe' : route.status === 'Completed' ? '#dcfce7' : '#fee2e2'}; 
                    color: ${route.status === 'On Route' ? '#1e40af' : route.status === 'Completed' ? '#166534' : '#991b1b'}; 
                    padding: 4px 12px; 
                    border-radius: 20px; 
                    font-size: 0.8rem; 
                    font-weight: 600;
                  ">
                    ${route.status}
                  </span>
                </td>
                <td style="padding: 1rem 1.5rem; border-bottom: 1px solid #f1f3f5; text-align: right;">
                  <button class="action-btn" title="View Details">👁️</button>
                  <button class="action-btn" title="Edit">✏️</button>
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
