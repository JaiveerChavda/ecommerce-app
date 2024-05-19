import { ref } from "vue";

export default function useUser(){

    let user = ref({
        token: ''
    });


    return user
}
