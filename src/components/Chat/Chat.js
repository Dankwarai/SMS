
export function renderChat() {
    const container = document.createElement('div');
    container.className = 'chat-container animate-slide-in';
    container.style.height = 'calc(100vh - 100px)';
    container.style.display = 'flex';
    container.style.gap = '1.5rem';
    container.style.padding = '1rem 2rem 2rem 2rem';

    // Mock Data
    const contacts = [
        { id: 1, name: 'Sarah Johnson', role: 'Student', status: 'online', avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random' },
        { id: 2, name: 'Mr. Anderson', role: 'Teacher', status: 'offline', avatar: 'https://ui-avatars.com/api/?name=Mr+Anderson&background=random' },
        { id: 3, name: 'Principal Skinner', role: 'Admin', status: 'busy', avatar: 'https://ui-avatars.com/api/?name=Principal+Skinner&background=random' },
        { id: 4, name: 'Emily Davis', role: 'Student', status: 'online', avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=random' },
    ];

    const messages = [
        { id: 1, sender: 'Sarah Johnson', text: 'Hi, I have a question about the assignment.', time: '10:30 AM', isMe: false },
        { id: 2, sender: 'Me', text: 'Sure, Sarah. What do you need help with?', time: '10:32 AM', isMe: true },
        { id: 3, sender: 'Sarah Johnson', text: 'Is it due tomorrow or Friday?', time: '10:33 AM', isMe: false },
    ];

    container.innerHTML = `
    <!-- Sidebar / Contact List -->
    <div class="card" style="width: 300px; display: flex; flex-direction: column; padding: 0; overflow: hidden;">
      <div style="padding: 1.5rem; border-bottom: 1px solid #f1f3f5;">
        <h3 style="margin-bottom: 1rem;">Messages 💬</h3>
        <div class="search-bar" style="width: 100%; background: #f8f9fa;">
          <span>🔍</span>
          <input type="text" class="search-input" placeholder="Search contacts...">
        </div>
      </div>
      
      <div style="flex: 1; overflow-y: auto;">
        ${contacts.map(contact => `
          <div class="contact-item" style="padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1rem; cursor: pointer; transition: background 0.2s; border-bottom: 1px solid #f8f9fa;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
            <div style="position: relative;">
              <img src="${contact.avatar}" style="width: 40px; height: 40px; border-radius: 50%;">
              <span style="position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; background: ${contact.status === 'online' ? '#20c997' : contact.status === 'busy' ? '#fa5252' : '#adb5bd'};"></span>
            </div>
            <div>
              <div style="font-weight: 600; font-size: 0.9rem;">${contact.name}</div>
              <div class="text-muted" style="font-size: 0.8rem;">${contact.role}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Chat Area -->
    <div class="card" style="flex: 1; display: flex; flex-direction: column; padding: 0; overflow: hidden;">
      <!-- Chat Header -->
      <div style="padding: 1rem 1.5rem; border-bottom: 1px solid #f1f3f5; display: flex; align-items: center; justify-content: space-between;">
        <div class="flex items-center gap-3">
          <img src="${contacts[0].avatar}" style="width: 40px; height: 40px; border-radius: 50%;">
          <div>
            <div style="font-weight: 600;">${contacts[0].name}</div>
            <div class="text-muted" style="font-size: 0.8rem; color: #20c997;">Online</div>
          </div>
        </div>
        <button class="action-btn">⋮</button>
      </div>

      <!-- Messages -->
      <div id="messages-area" style="flex: 1; padding: 1.5rem; overflow-y: auto; background: #f8f9fa; display: flex; flex-direction: column; gap: 1rem;">
        ${messages.map(msg => `
          <div style="display: flex; flex-direction: column; align-items: ${msg.isMe ? 'flex-end' : 'flex-start'};">
            <div style="
              max-width: 70%; 
              padding: 0.75rem 1rem; 
              border-radius: 12px; 
              background: ${msg.isMe ? 'var(--color-primary)' : 'white'}; 
              color: ${msg.isMe ? 'white' : 'var(--color-text-main)'}; 
              box-shadow: ${msg.isMe ? 'none' : '0 2px 4px rgba(0,0,0,0.05)'};
              border-bottom-${msg.isMe ? 'right' : 'left'}-radius: 2px;
            ">
              ${msg.text}
            </div>
            <div class="text-muted" style="font-size: 0.7rem; margin-top: 4px;">${msg.time}</div>
          </div>
        `).join('')}
      </div>

      <!-- Input Area -->
      <div style="padding: 1rem 1.5rem; background: white; border-top: 1px solid #f1f3f5;">
        <form id="chat-form" style="display: flex; gap: 1rem;">
          <input type="text" id="message-input" placeholder="Type a message..." style="flex: 1; padding: 0.75rem 1rem; border-radius: 50px; border: 1px solid #dee2e6; outline: none;">
          <button type="submit" class="btn-primary" style="width: 50px; height: 50px; border-radius: 50%; padding: 0; display: flex; align-items: center; justify-content: center;">➤</button>
        </form>
      </div>
    </div>
  `;

    // Event Listeners
    const form = container.querySelector('#chat-form');
    const input = container.querySelector('#message-input');
    const messagesArea = container.querySelector('#messages-area');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const msgHtml = `
        <div style="display: flex; flex-direction: column; align-items: flex-end; animation: slideIn 0.3s ease;">
          <div style="
            max-width: 70%; 
            padding: 0.75rem 1rem; 
            border-radius: 12px; 
            background: var(--color-primary); 
            color: white; 
            border-bottom-right-radius: 2px;
          ">
            ${text}
          </div>
          <div class="text-muted" style="font-size: 0.7rem; margin-top: 4px;">${time}</div>
        </div>
      `;
            messagesArea.insertAdjacentHTML('beforeend', msgHtml);
            input.value = '';
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }
    });

    return container;
}
