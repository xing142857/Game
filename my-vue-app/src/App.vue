<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

// Game constants
const ELEMENT_SIZE = 5
const ELEMENT_MAX_WIDTH = 100 - ELEMENT_SIZE
const ELEMENT_MAX_HEIGHT = 100 - ELEMENT_SIZE * 2
const DIFFICULTY = 100

// Reactive state
const pressedKeys = ref(new Set<string>())
let gameLoopInterval: number | null = null
let bulletPlayerIndex = 0

// Player state - using reactive object
const player = ref({
  top: 50,
  left: 80,
  life: 100
})

// Enemy array - directly using reactive array
const enemies = ref(Array.from({ length: DIFFICULTY }, () => ({
  top: 0,
  left: Math.random() * ELEMENT_MAX_WIDTH,
  transition: true,
  sleep: Math.round(Math.random() * 100),
  life: 100
})))

// Bullet array
const playerBullets = ref(Array.from({ length: 100 }, () => ({
  top: -100,
  left: -100
})))

// Helper function to constrain position
const constrainPosition = (value: number, max: number) => {
  if (value < 0) return 0
  if (value > max) return max
  return value
}

// Update player position
const updatePlayerPosition = () => {
  const step = 1
  
  if (pressedKeys.value.has('ArrowLeft')) {
    player.value.left = constrainPosition(player.value.left - step, ELEMENT_MAX_WIDTH)
  }
  if (pressedKeys.value.has('ArrowRight')) {
    player.value.left = constrainPosition(player.value.left + step, ELEMENT_MAX_WIDTH)
  }
  if (pressedKeys.value.has('ArrowUp')) {
    player.value.top = constrainPosition(player.value.top - step, ELEMENT_MAX_HEIGHT)
  }
  if (pressedKeys.value.has('ArrowDown')) {
    player.value.top = constrainPosition(player.value.top + step, ELEMENT_MAX_HEIGHT)
  }
}

// Randomize enemy positions
const randomAlienPositions = () => {
  enemies.value.forEach(enemy => {
    enemy.left = Math.random() * ELEMENT_MAX_WIDTH
  })
}

// Update enemy positions
const updateEnemyPosition = () => {
  enemies.value.forEach(enemy => {
    if (enemy.sleep > 0) {
      enemy.transition = false
      enemy.sleep -= 1
      enemy.left = -100
      enemy.top = -100
    } else if (enemy.sleep === 0) {
      enemy.transition = false
      enemy.sleep -= 1
      enemy.left = Math.random() * ELEMENT_MAX_WIDTH
      enemy.top = 0
    } else if (enemy.top >= ELEMENT_MAX_HEIGHT) {
      enemy.transition = false
      enemy.sleep = Math.round(Math.random() * 100)
      enemy.top = -100
    } else {
      enemy.transition = true
      enemy.top += 1
    }
  })
}

// Check for collisions
const checkCollision = () => {
  const hitEnemy = enemies.value.find(enemy => 
    Math.abs(enemy.left - player.value.left) < ELEMENT_SIZE * 0.5 && 
    Math.abs(enemy.top - player.value.top) < ELEMENT_SIZE * 0.5
  )
  
  if (hitEnemy) {
    player.value.life = Math.max(player.value.life - 1, 0)
  }
}

// Fire player bullets
const fireBulletPlayer = () => {
  if (pressedKeys.value.has(' ')) {
    playerBullets.value[bulletPlayerIndex].left = player.value.left
    playerBullets.value[bulletPlayerIndex].top = player.value.top
    
    // Cycle through bullets
    bulletPlayerIndex = (bulletPlayerIndex + 1) % playerBullets.value.length
  }
}

// Keyboard event handlers
const handleKeyDown = (event: KeyboardEvent) => {
  pressedKeys.value.add(event.key)
}

const handleKeyUp = (event: KeyboardEvent) => {
  pressedKeys.value.delete(event.key)
}

// Game loop functions
const startGameLoop = () => {
  gameLoopInterval = window.setInterval(() => {
    updatePlayerPosition()
    fireBulletPlayer()
    updateEnemyPosition()
    checkCollision()
  }, 30)
}

const stopGameLoop = () => {
  if (gameLoopInterval !== null) {
    clearInterval(gameLoopInterval)
    gameLoopInterval = null
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  randomAlienPositions()
  startGameLoop()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
  stopGameLoop()
})

// Computed properties
const barWidth = computed(() => player.value.life * 0.2 + '%')
const elementSize = ELEMENT_SIZE + '%'
</script>

<template>
  <div class="outside-box">
    <img src="./ShmupSprites/Bar.png" alt="Bar" class="bar">
    <img src="./ShmupSprites/Bar_empty.png" alt="Bar_empty" class="bar-empty">
    
    <!-- Enemies -->
    <img 
      v-for="(enemy, i) in enemies" 
      :key="`enemy-${i}`"
      src="./ShmupSprites/Alien02.png" 
      alt="Alien02" 
      class="alien"
      :style="{
        top: `${enemy.top}%`,
        left: `${enemy.left}%`,
        transition: enemy.transition ? 'top 0.03s linear, left 0.03s linear' : 'none'
      }" 
    />

    <!-- Player bullets -->
    <img 
      v-for="(bullet, i) in playerBullets" 
      :key="`bullet-${i}`"
      src="./ShmupSprites/Bullet_player.png" 
      alt="bulletPlayer" 
      class="bullet-player"
      :style="{
        top: `${bullet.top}%`,
        left: `${bullet.left}%`
      }"
    />

    <!-- Player -->
    <img 
      src="./ShmupSprites/Player.png" 
      alt="Player" 
      class="player" 
      :style="{ 
        top: `${player.top}%`, 
        left: `${player.left}%` 
      }" 
    />
  </div>
</template>

<style scoped>
.outside-box {
  width: 90%;
  height: 90vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid green;
}

.bar-empty {
  position: absolute;
  height: 20px;
  width: 20%;
}

.bar {
  position: absolute;
  height: 20px;
  width: v-bind(barWidth);
  transition: width 0.3s ease-in-out;
}

.player {
  position: absolute;
  transition: top 0.03s linear, left 0.03s linear;
  width: v-bind(elementSize);
}

.alien {
  position: absolute;
  width: v-bind(elementSize);
}

.bullet-player {
  position: absolute;
  width: 2%;
}
</style>