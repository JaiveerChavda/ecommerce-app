import { defineStore } from "pinia";

export const useSessionStore = defineStore('session', {

    state() {
        return {
            user: {
                token: sessionStorage.getItem('TOKEN') ?? null,
                data: {}
            }
        }
    },

    actions: {
        setToken(token) {
            this.user.token = token;
            sessionStorage.setItem('TOKEN', token);
        },

        removeToken() {
            this.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },

        setUser(data){
            this.user.data = data
        },

        removeUser(){
            this.user.data = null;
        }
    }
})
