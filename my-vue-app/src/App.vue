<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Player and enemy's max width and height in percentage.
const elementMaxWidth = Math.round(100-(128/window.innerWidth*100))
const elementMaxHeight = Math.round(100-(128/window.innerHeight*100))

// Game difficulty
let difficulty = 30

// Player Class
class Player {
  private playerTop: number;
  private playerLeft: number;
  private life: number;
  constructor() {
    this.playerLeft = 80;
    this.playerTop = 50;
    this.life = 100;
  }

  getTopPosition(): number {return this.playerTop;}

  getLeftPosition(): number {return this.playerLeft;}

  getLife(): number {return this.life;}

  setTopPosition(top: number): void {this.playerTop = top}

  setLeftPosition(left: number): void {this.playerLeft = left} 

  setLife(life: number): void {this.life = life} 
}

// Enemy Class
class Enemy {
  private enemyTop: number;
  private enemyLeft: number;
  private enemyTransition: boolean;
  private enemySleep: number;
  private elementMaxWidth: number;

  constructor(elementMaxWidth: number) {
    this.elementMaxWidth = elementMaxWidth;
    this.enemyTop = 0;
    this.enemyLeft = Math.random() * this.elementMaxWidth;
    this.enemyTransition = true;
    this.enemySleep = Math.round(Math.random() * 100);
  }

  getTopPosition(): number {return this.enemyTop;}

  getLeftPosition(): number {return this.enemyLeft;}

  getTransitionState(): boolean {return this.enemyTransition;}

  getSleepTime(): number {return this.enemySleep;}

  setTopPosition(top: number): void {this.enemyTop = top}

  setLeftPosition(left: number): void {this.enemyLeft = left} 

  setEnemySleep(sleepTime: number): void {this.enemySleep = sleepTime}

  toggleTransition(state: boolean): void {this.enemyTransition = state}
}

// Enemy Array
const enemyArray = ref<Enemy[]>(
  Array.from({ length: difficulty }, () => new Enemy(elementMaxWidth))
);

// Player
const player = ref(new Player())

// Set to track currently pressed keys
const pressedKeys = new Set<string>()

// Interval ID for the game loop
let gameLoopInterval: number | null = null

// Function to random alien positions
const randomAlienPositions = () => {
  enemyArray.value.forEach((enemy) => (
    enemy.setLeftPosition(Math.random() * elementMaxWidth)
  ))
}

// Move the player based on pressed keys
const updatePlayerPosition = () => {
  const step = 1 // Step size in percentage
  if (pressedKeys.has('ArrowLeft')) {
    player.value.setLeftPosition(Math.max(player.value.getLeftPosition() - step, 0)) // Prevent moving out of bounds (left edge)
  }
  if (pressedKeys.has('ArrowRight')) {
    player.value.setLeftPosition(Math.min(player.value.getLeftPosition() + step, elementMaxWidth)) // Prevent moving out of bounds (right edge)
  }
  if (pressedKeys.has('ArrowUp')) {
    player.value.setTopPosition(Math.max(player.value.getTopPosition() - step, 0)) // Prevent moving out of bounds (top edge)
  }
  if (pressedKeys.has('ArrowDown')) {
    player.value.setTopPosition(Math.min(player.value.getTopPosition() + step, elementMaxHeight)) // Prevent moving out of bounds (bottom edge)
  }
}

// Move enemies
const updateEnemyPosition = () => {
  enemyArray.value.forEach((enemy) => {
    
    if (enemy.getSleepTime() > 0) {
      enemy.toggleTransition(false);
      enemy.setEnemySleep(enemy.getSleepTime()-1);
      enemy.setLeftPosition(-100);
      enemy.setTopPosition(-100);
      return -100
    }
    else if (enemy.getSleepTime() == 0) {
      enemy.toggleTransition(false);
      enemy.setEnemySleep(enemy.getSleepTime()-1);
      enemy.setLeftPosition(Math.random() * elementMaxWidth);
      enemy.setTopPosition(0);
      return 0;
    }
    else if (enemy.getTopPosition() >= elementMaxHeight) {
      enemy.toggleTransition(false);
      enemy.setEnemySleep(Math.round(Math.random() * 100));
      enemy.setTopPosition(-100);
      return -100;
    }
    else{
      enemy.toggleTransition(true);
      enemy.setTopPosition(enemy.getTopPosition()+1);
      return 1;
    }
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
      v-for="(_, i) in enemyArray" 
      :key="i"
      src="./ShmupSprites/Alien02.png" 
      alt="Alien02" 
      class="Alien02"
      :style="{
        top: enemyArray[i].getTopPosition() + '%',
        left: enemyArray[i].getLeftPosition() + '%',
        transition: enemyArray[i].getTransitionState() ? 'top 0.03s linear, left 0.03s linear' : 'none'
      }" 
    />

    <img 
      src="./ShmupSprites/Player.png" 
      alt="Player" 
      class="player" 
      :style="{ top: player.getTopPosition() + '%', left: player.getLeftPosition() + '%' }" 
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
}

</style>
