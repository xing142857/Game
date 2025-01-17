<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Track player's position
const playerTop = ref(80) // 80% from top
const playerLeft = ref(50) // 50% from left

// Set to track currently pressed keys
const pressedKeys = new Set<string>()

// Interval ID for the game loop
let gameLoopInterval: number | null = null

// Move the player based on pressed keys
const updatePlayerPosition = () => {
  const step = 1 // Step size in percentage
  if (pressedKeys.has('ArrowLeft')) {
    playerLeft.value = Math.max(playerLeft.value - step, 0) // Prevent moving out of bounds (left edge)
  }
  if (pressedKeys.has('ArrowRight')) {
    playerLeft.value = Math.min(playerLeft.value + step, 93) // Prevent moving out of bounds (right edge)
  }
  if (pressedKeys.has('ArrowUp')) {
    playerTop.value = Math.max(playerTop.value - step, 0) // Prevent moving out of bounds (top edge)
  }
  if (pressedKeys.has('ArrowDown')) {
    playerTop.value = Math.min(playerTop.value + step, 87) // Prevent moving out of bounds (bottom edge)
  }
}

// Event handlers to update pressed keys
const handleKeyDown = (event: KeyboardEvent) => {
  pressedKeys.add(event.key)
}

const handleKeyUp = (event: KeyboardEvent) => {
  pressedKeys.delete(event.key)
}

// Start the game loop
const startGameLoop = () => {
  gameLoopInterval = window.setInterval(() => {
    updatePlayerPosition()
  }, 30)
}

// Stop the game loop
const stopGameLoop = () => {
  if (gameLoopInterval !== null) {
    clearInterval(gameLoopInterval)
    gameLoopInterval = null
  }
}

// Attach event listeners and start the game loop on mount
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  startGameLoop()
})

// Clean up event listeners and game loop on unmount
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
  stopGameLoop()
})
</script>

<template>
  <div class="outsideBox">
    <img src="./ShmupSprites/Bar.png" alt="Bar" class="bar">
    <img src="./ShmupSprites/Bar_empty.png" alt="Bar_empty" class="barEmpty">
    <!-- Player position dynamically controlled via style binding -->
    <img 
      src="./ShmupSprites/Player.png" 
      alt="Player" 
      class="player" 
      :style="{ top: playerTop + '%', left: playerLeft + '%' }" 
    />
  </div>
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

.barEmpty {
  position: absolute;
  height: 20px;
  width: 20%;
}

.bar {
  position: absolute;
  height: 20px;
  width: 20%;
}

.player {
  position: relative;
}
</style>
