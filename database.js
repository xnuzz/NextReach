// IndexedDB Manager for NextReach - Better than LocalStorage for user data
class NextReachDB {
    constructor() {
        this.dbName = 'NextReachDB';
        this.version = 1;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => {
                console.error('IndexedDB failed to open');
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('IndexedDB opened successfully');
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create users object store
                if (!db.objectStoreNames.contains('users')) {
                    const userStore = db.createObjectStore('users', { 
                        keyPath: 'id', 
                        autoIncrement: false 
                    });
                    
                    // Create indexes for faster queries
                    userStore.createIndex('email', 'email', { unique: true });
                    userStore.createIndex('createdAt', 'createdAt', { unique: false });
                }

                // Create chats object store
                if (!db.objectStoreNames.contains('chats')) {
                    const chatStore = db.createObjectStore('chats', { 
                        keyPath: 'id', 
                        autoIncrement: true 
                    });
                    
                    // Create indexes
                    chatStore.createIndex('userId', 'userId', { unique: false });
                    chatStore.createIndex('createdAt', 'createdAt', { unique: false });
                }

                // Create sessions object store
                if (!db.objectStoreNames.contains('sessions')) {
                    const sessionStore = db.createObjectStore('sessions', { 
                        keyPath: 'key' 
                    });
                }

                console.log('IndexedDB schema created');
            };
        });
    }

    // User Methods
    async addUser(userData) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['users'], 'readwrite');
            const store = transaction.objectStore('users');
            
            // Add user
            const request = store.add(userData);

            request.onsuccess = () => {
                console.log('User added to IndexedDB');
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('Error adding user:', request.error);
                reject(request.error);
            };
        });
    }

    async getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['users'], 'readonly');
            const store = transaction.objectStore('users');
            const index = store.index('email');
            
            const request = index.get(email);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async getUserById(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['users'], 'readonly');
            const store = transaction.objectStore('users');
            
            const request = store.get(id);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async updateUser(userData) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['users'], 'readwrite');
            const store = transaction.objectStore('users');
            
            const request = store.put(userData);

            request.onsuccess = () => {
                console.log('User updated in IndexedDB');
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('Error updating user:', request.error);
                reject(request.error);
            };
        });
    }

    async getAllUsers() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['users'], 'readonly');
            const store = transaction.objectStore('users');
            
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async deleteUser(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['users'], 'readwrite');
            const store = transaction.objectStore('users');
            
            const request = store.delete(id);

            request.onsuccess = () => {
                console.log('User deleted from IndexedDB');
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    // Chat Methods
    async addChat(chatData) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['chats'], 'readwrite');
            const store = transaction.objectStore('chats');
            
            const request = store.add(chatData);

            request.onsuccess = () => {
                console.log('Chat saved to IndexedDB');
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async getChatsByUserId(userId) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['chats'], 'readonly');
            const store = transaction.objectStore('chats');
            const index = store.index('userId');
            
            const request = index.getAll(userId);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async deleteChat(chatId) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['chats'], 'readwrite');
            const store = transaction.objectStore('chats');
            
            const request = store.delete(chatId);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    // Session Methods
    async setSession(key, value) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['sessions'], 'readwrite');
            const store = transaction.objectStore('sessions');
            
            const request = store.put({ key, value, timestamp: Date.now() });

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async getSession(key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['sessions'], 'readonly');
            const store = transaction.objectStore('sessions');
            
            const request = store.get(key);

            request.onsuccess = () => {
                resolve(request.result?.value);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    async deleteSession(key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['sessions'], 'readwrite');
            const store = transaction.objectStore('sessions');
            
            const request = store.delete(key);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    // Migrate data from LocalStorage to IndexedDB
    async migrateFromLocalStorage() {
        try {
            // Migrate users
            const usersData = localStorage.getItem('nextreach_users');
            if (usersData) {
                const users = JSON.parse(usersData);
                for (const user of users) {
                    try {
                        await this.addUser(user);
                    } catch (error) {
                        // User might already exist, update instead
                        await this.updateUser(user);
                    }
                }
                console.log(`Migrated ${users.length} users from LocalStorage`);
            }

            // Migrate current user session
            const currentUser = localStorage.getItem('nextreach_user');
            if (currentUser) {
                await this.setSession('current_user', JSON.parse(currentUser));
                console.log('Migrated current user session');
            }

            // Keep LocalStorage as backup for now
            console.log('Migration completed successfully');
            return true;
        } catch (error) {
            console.error('Migration error:', error);
            return false;
        }
    }

    // Export data (for backup)
    async exportAllData() {
        const users = await this.getAllUsers();
        const currentUser = await this.getSession('current_user');
        
        return {
            users,
            currentUser,
            exportedAt: new Date().toISOString()
        };
    }
}

// Initialize database
const nextReachDB = new NextReachDB();

// Auto-initialize when script loads
(async () => {
    try {
        await nextReachDB.init();
        console.log('NextReach Database initialized');
        
        // Migrate existing LocalStorage data
        await nextReachDB.migrateFromLocalStorage();
    } catch (error) {
        console.error('Failed to initialize database:', error);
        console.log('Falling back to LocalStorage');
    }
})();

// Export for use in other scripts
window.nextReachDB = nextReachDB;
