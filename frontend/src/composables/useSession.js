import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default function useUser(){

    const endpoint = 'http://127.0.0.1:8000/api';
    const errors = ref('');
    const router = useRouter();

    let user = ref({
        name:'',
        email:'',
        token:'',
    });

    const storeSession = async (data) => {
        errors.value = "";
        try{
            await axios.post(`${endpoint}/login`,data)
                .then((data) => {
                    console.log(data);
                    user.value.token = data.data.token;
                    user.value.email = data.data.user.email;
                    user.value.name = data.data.user.name;
                    console.log(user.value);
                })
            // await router.push({name:'app.dashboard'})
        }catch(e){
            if (e.response.status == 422) {
                let temp = e.response.data.message;
                console.log(temp);
                errors.value = temp
            }
        }
    }



    return {
        user,
        errors,
        storeSession,
    }
}
