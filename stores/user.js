import {defineStore} from 'pinia'
export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        isAuthenticated: false,
    }),
    actions: {
        login(email, password){
            const dummyUsers = [
                {email: 'karona@gmail.com', password:'123'},
            ]
            const foundUser = dummyUsers.find(u => u.email === email && u.password === password)
            if(foundUser){
                this.user = {email, provider: 'manual'}
                return true
            }
            return false
        },
        register(email, password){
            this.user = {email, provider: 'manual'}
            return true
        },
        setGoogleUser(user){
            this.user = {email: user.email, provider: 'google'}
        },
        logout(){
            this.user = null
        },
    },
})