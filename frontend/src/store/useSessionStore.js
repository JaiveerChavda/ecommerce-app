import { defineStore } from "pinia";

export const useSessionStore = defineStore('session',{

    state(){
        return{
            token: sessionStorage.getItem('TOKEN') ?? null,
        }
    },

    actions:{
        setToken(token){
            this.token = token;
            sessionStorage.setItem('TOKEN',token);
        },

        removeToken(){
            this.token = null;
            sessionStorage.removeItem('TOKEN');
        }
    }
})
