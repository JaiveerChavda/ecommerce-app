<script setup>
import { reactive, ref } from "vue";
import GuestLayout from "../components/GuestLayout.vue"
import { useRouter } from "vue-router";
import { useSessionStore } from "@/store/useSessionStore";
import axiosClient from "@/axios";

const router = useRouter();

const session = useSessionStore();

const errors = ref([]);

let loading = false;

const form = reactive({
    email: '',
    password: '',
    remember: false,
})


async function login (form) {
    errors.value = ''
    loading = true
    try{
        let response = await axiosClient.post('/login',form);
        session.setToken(response.data.token);
        session.setUser(response.data.user);
        router.push({name:'app.dashboard'});
    }catch(e){
        if (e.response && e.response.data) {
                //get the error message
                errors.value = e.response.data.message
            }else{
                errors.value = e.message
            }
    }finally{
        loading = false;
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
                    :disabled="loading"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :class="{
                  'cursor-not-allowed': loading,
                  'hover:bg-indigo-500': loading,
                }">
            <svg
            v-if="loading"
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </GuestLayout>
</template>
