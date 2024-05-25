<script setup>
import { ref,onMounted,onUnmounted,computed } from 'vue';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import { useSessionStore } from '@/store/useSessionStore';
import Spinner from './core/Spinner.vue';
import axiosClient from '@/axios';

const session = useSessionStore();

const currentUser = computed(() => session.user.data)

const sidebarOpened = ref(true);

function toggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value;
}

function updateSidebarState(){
    sidebarOpened.value = window.outerWidth > 768;
}

onMounted(() => {
    updateSidebarState();
    window.addEventListener('resize',updateSidebarState)
    axiosClient.get('/user').then((response) => {
        session.setUser(response.data.data);
        });
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSidebarState)
})

</script>
<template>
    <div v-if="currentUser.id" class="min-h-full bg-gray-200 flex">
        <!--    Sidebar-->
        <Sidebar :class="{'-ml-[200px]': !sidebarOpened}"/>
        <!--/    Sidebar-->

        <div class="flex-1">
            <Navbar @toggle-sidebar="toggleSidebar"></Navbar>
            <!--      Content-->
            <main class="p-6">
                <router-view></router-view>
            </main>
            <!--      Content-->
        </div>
    </div>

    <div v-else class="min-h-full bg-gray-200 flex items-center justify-center">
        <Spinner />
    </div>
</template>
