<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import store from '@/store';
import { computed } from 'vue';

const test = computed(() => {
    return store.state.test;
})

</script>

<template>
  <main>
    <TheWelcome />
    <h1 class="bg-red-500">{{ test }}</h1>

  </main>
</template>
