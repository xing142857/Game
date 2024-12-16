<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <div class="outsideBox"></div>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>

<style scoped>
.outsideBox {
  width: 90%;
  height: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid green;
}
</style>