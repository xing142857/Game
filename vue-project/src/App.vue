<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <div class="w-3 h-3 bg-sky-500"></div>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
