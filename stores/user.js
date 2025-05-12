import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        isRegistering: false, // Flag to indicate registration in progress
        users: [
            { email: 'karona@gmail.com', password: '123' },
        ],
    }),
    actions: {
        login(email, password) {
            const foundUser = this.users.find(u => u.email === email)
            if (!foundUser) {
                return { success: false, error: 'Email not registered' }
            }
            if (foundUser.password === null) {
                return { success: false, error: 'Please use Google login for this account' }
            }
            if (foundUser.password === password) {
                this.user = { email, provider: 'manual' }
                this.isAuthenticated = true
                return { success: true }
            }
            return { success: false, error: 'Invalid email or password' }
        },
        register(email, password) {
            const exists = this.users.some(u => u.email === email)
            if (exists) {
                return false // Indicate email already exists
            }
            this.users.push({ email, password })
            this.isRegistering = true // Set flag
                // Do NOT set isAuthenticated or user
            return true
        },
        completeRegistration() {
            this.isRegistering = false // Reset flag
        },
        setGoogleUser(email) {
            const exists = this.users.some(u => u.email === email)
            if (!exists) {
                this.users.push({ email, password: null }) // No password for Google
            }
            this.isRegistering = true // Set flag
                // Do NOT set isAuthenticated or user
        },
        logout() {
            this.user = null
            this.isAuthenticated = false
            this.isRegistering = false
        },
    },
})