<script setup>
import { reactive, ref } from "vue";
import GuestLayout from "../components/GuestLayout.vue"
import { useRouter } from "vue-router";
import axios from "axios";
import { useSessionStore } from "@/store/useSessionStore";

const endpoint = 'http://127.0.0.1:8000/api';

const router = useRouter();

const session = useSessionStore();

const errors = ref([]);

const form = reactive({
    email: '',
    password: '',
    remember: false,
})


async function login (form) {
    errors.value = ''
    try{
        let response = await axios.post(`${endpoint}/login`,form);
        session.setToken(response.data.token);
        router.push({name:'app.dashboard'});
    }catch(e){
        if (e.response && e.response.data) {
                //get the error message
                errors.value = e.response.data.message
            }else{
                errors.value = e.message
            }
    }

}

</script>
<template>
    <GuestLayout title="Sign in to your account">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST" @submit.prevent="login(form)">
                <div v-if="errors[0] ?? false" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded">
                    {{ errors }}
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div class="mt-2">
                        <input id="password" v-model="form.password" name="password" type="password" autocomplete="current-password" required=""
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div class="flex justify-between mt-4">
                        <div class="inline-flex">
                            <input id="remember-me" name="remember-me" type="checkbox" v-model="form.remember"
                                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
                        </div>
                        <div class="text-sm">
                            <RouterLink :to="{ name: 'request.password' }"
                                class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?
                            </RouterLink>
                        </div>
                    </div>
                </div>


                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        in</button>
                </div>
            </form>
        </div>
    </GuestLayout>
</template>
