<script setup>
import { MinusCircleIcon } from '@heroicons/vue/24/outline'
defineProps({
  show: Boolean
})
</script>

<template>
  <div v-if="show" class="modal-wrapper">
    <div class="modal">
        <header>
            <slot name="header">
                <button class="" @click="$emit('close')"><MinusCircleIcon class="w-5 text-red-500" title="close"/></button>
            </slot>
        </header>
        <hr class="mt-2 mb-3">
      <div class="main">
        <slot>default body</slot>
      </div>
      <footer class="modal-footer">
        <slot name="footer">
        </slot>
      </footer>
    </div>
  </div>
</template>

<style>
.modal-wrapper {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
}

.modal {
  background: white;
  padding: 1rem;
  width: 80vw;
  max-width: 800px;
  border-radius: 7px;
}

.modal-header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  font-size: 1rem;
}

.modal-header button {
  background: #ddd;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.modal-header button:hover {
  background: #c8c8c8;
}
</style>
