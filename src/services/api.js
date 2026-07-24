
// API Service Layer
// Currently mocks network requests using localStorage and setTimeout

const DELAY = 500; // Simulate network latency

const api = {
    auth: {
        login: async (email, password, role) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Mock validation
                    if (email && password) {
                        localStorage.setItem('sms-role', role);
                        localStorage.setItem('sms-user', JSON.stringify({ email, role }));
                        resolve({
                            success: true,
                            user: { email, role },
                            token: 'mock-jwt-token'
                        });
                    } else {
                        reject({ success: false, message: 'Invalid credentials' });
                    }
                }, DELAY);
            });
        },

        register: async (userData) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (userData.email && userData.password && userData.role) {
                        localStorage.setItem('sms-role', userData.role);
                        localStorage.setItem('sms-user', JSON.stringify(userData));
                        resolve({
                            success: true,
                            user: userData,
                            token: 'mock-jwt-token'
                        });
                    } else {
                        reject({ success: false, message: 'Registration failed' });
                    }
                }, DELAY);
            });
        },

        logout: async () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    localStorage.removeItem('sms-role');
                    localStorage.removeItem('sms-user');
                    resolve({ success: true });
                }, 200);
            });
        },

        getUserRole: () => {
            return localStorage.getItem('sms-role') || 'guest';
        },

        getCurrentUser: () => {
            const userStr = localStorage.getItem('sms-user');
            return userStr ? JSON.parse(userStr) : null;
        }
    },

    students: {
        getAll: async () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    // Mock data would go here, currently just resolving empty or static list
                    resolve([]);
                }, DELAY);
            });
        }
    },

    // Add other domains (teachers, finance, etc.) as needed
};

export default api;
