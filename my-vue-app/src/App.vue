<script setup lang="ts">
import { RefSymbol } from '@vue/reactivity'
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Player and enemy's max width and height in percentage.
const elementMaxWidth = Math.round(100-(128/window.innerWidth*100))
const elementMaxHeight = Math.round(100-(128/window.innerHeight*100))

// Track player's position
const playerTop = ref(80) // 80% from top
const playerLeft = ref(50) // 50% from left

// Track enemy's position
const enemyTop = ref(Array(10).fill(0));
const enemyLeft = ref(Array(10).fill(Math.random() * elementMaxWidth));

// Game difficulty
let difficulty: number = 2

// Set to track currently pressed keys
const pressedKeys = new Set<string>()

// Interval ID for the game loop
let gameLoopInterval: number | null = null

// Function to random alien positions
const randomAlienPositions = () => {
  enemyLeft.value = enemyLeft.value.map(() => (
    Math.random() * elementMaxWidth
  ));
}

// Move the player based on pressed keys
const updatePlayerPosition = () => {
  const step = 1 // Step size in percentage
  if (pressedKeys.has('ArrowLeft')) {
    playerLeft.value = Math.max(playerLeft.value - step, 0) // Prevent moving out of bounds (left edge)
  }
  if (pressedKeys.has('ArrowRight')) {
    playerLeft.value = Math.min(playerLeft.value + step, elementMaxWidth) // Prevent moving out of bounds (right edge)
  }
  if (pressedKeys.has('ArrowUp')) {
    playerTop.value = Math.max(playerTop.value - step, 0) // Prevent moving out of bounds (top edge)
  }
  if (pressedKeys.has('ArrowDown')) {
    playerTop.value = Math.min(playerTop.value + step, elementMaxHeight) // Prevent moving out of bounds (bottom edge)
  }
}

// Move enemies
const updateEnemyPosition = () => {
  enemyTop.value = enemyTop.value.map((top, i) => {
    if (top >= elementMaxHeight) {
      enemyLeft.value[i] = Math.random() * elementMaxWidth;
      return 0;
    }
    return top + 1;
  });
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
    updateEnemyPosition()
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
  randomAlienPositions()
  startGameLoop()
})

// Clean up event listeners and game loop on unmount
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
  randomAlienPositions()
  stopGameLoop()
})
</script>

<template>
  <div class="outsideBox">
    <img src="./ShmupSprites/Bar.png" alt="Bar" class="bar">
    <img src="./ShmupSprites/Bar_empty.png" alt="Bar_empty" class="barEmpty">
    <!-- Player position dynamically controlled via style binding -->
    
    <img 
      v-for="i in difficulty" 
      src="./ShmupSprites/Alien02.png" 
      alt="Alien02" 
      class="Alien02"
      :style="{ top: enemyTop[i] + '%', left: enemyLeft[i] + '%' }" 
    />

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
  position: absolute;
  transition: top 0.03s linear, left 0.03s linear; /* Smooth movement */
}

.Alien02 {
  position: absolute;
  transition: top 0.03s linear, left 0.03s linear; /* Smooth movement */
}

</style>
