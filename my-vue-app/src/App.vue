<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

// Player and enemy's size in percentage of the screen.
const ELEMENTSIZE = 10

// Player and enemy's max width and height in percentage of the screen.
const ELEMENTMAXWIDTH = 90
const ELEMENTMAXHEIGHT = 80

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

  setLife(life: number): void {this.life = Math.max(life, 0)} 
}

// Enemy Class
class Enemy {
  private enemyTop: number;
  private enemyLeft: number;
  private enemyTransition: boolean;
  private enemySleep: number;
  private ELEMENTMAXWIDTH: number;

  constructor(ELEMENTMAXWIDTH: number) {
    this.ELEMENTMAXWIDTH = ELEMENTMAXWIDTH;
    this.enemyTop = 0;
    this.enemyLeft = Math.random() * this.ELEMENTMAXWIDTH;
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
  Array.from({ length: difficulty }, () => new Enemy(ELEMENTMAXWIDTH))
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
    enemy.setLeftPosition(Math.random() * ELEMENTMAXWIDTH)
  ))
}

// Move the player based on pressed keys
const updatePlayerPosition = () => {
  const step = 1 // Step size in percentage
  if (pressedKeys.has('ArrowLeft')) {
    player.value.setLeftPosition(Math.max(player.value.getLeftPosition() - step, 0)) // Prevent moving out of bounds (left edge)
  }
  if (pressedKeys.has('ArrowRight')) {
    player.value.setLeftPosition(Math.min(player.value.getLeftPosition() + step, ELEMENTMAXWIDTH)) // Prevent moving out of bounds (right edge)
  }
  if (pressedKeys.has('ArrowUp')) {
    player.value.setTopPosition(Math.max(player.value.getTopPosition() - step, 0)) // Prevent moving out of bounds (top edge)
  }
  if (pressedKeys.has('ArrowDown')) {
    player.value.setTopPosition(Math.min(player.value.getTopPosition() + step, ELEMENTMAXHEIGHT
)) // Prevent moving out of bounds (bottom edge)
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
      enemy.setLeftPosition(Math.random() * ELEMENTMAXWIDTH);
      enemy.setTopPosition(0);
      return 0;
    }
    else if (enemy.getTopPosition() >= ELEMENTMAXHEIGHT
) {
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

// Check collision
const checkCollision = () => {
  if (enemyArray.value.filter(enemy => Math.abs(enemy.getLeftPosition()-player.value.getLeftPosition()) < ELEMENTSIZE*0.5 && Math.abs(enemy.getTopPosition()-player.value.getTopPosition()) < ELEMENTSIZE*0.5).length>0) {
    player.value.setLife(player.value.getLife()-1)
    console.log(player.value.getLife())
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
    updateEnemyPosition()
    checkCollision()
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

// Reactive bar width based on player's life
const barWidth = computed(() => player.value.getLife() * 0.2 + '%')
// Element size in string percentage of the screen
const elementSize = ELEMENTSIZE + '%'
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
  height: 90vh;
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
  width: v-bind(barWidth);
  transition: width 0.3s ease-in-out;
}

.player {
  position: absolute;
  transition: top 0.03s linear, left 0.03s linear; /* Smooth movement */
  width: v-bind(elementSize)
}

.Alien02 {
  position: absolute;
  width: v-bind(elementSize)
}

</style>
