import {defineStore} from 'pinia'
export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        users: [
            {email: 'karona@gmail.com', password:'123'},
        ],
    }),
    actions: {
        login(email, password){
            const foundUser = this.users.find(u => u.email === email && u.password === password)
            if(foundUser){
                this.user = {email, provider: 'manual'}
                this.isAuthenticated = true
                return true
            }
            return false
        },
        register(email, password){
            const exists = this.users.some(u => u.email === email)
            if(!exists){
                this.users.push({email, password})
            }
            this.user = {email, provider: 'manual'}
            this.isAuthenticated = true
            return true
        },
        setGoogleUser(user){
            this.user = {email: user.email, provider: 'google'}
            this.isAuthenticated = true
        },
        logout(){
            this.user = null
            this.isAuthenticated = false
        },
    },
})