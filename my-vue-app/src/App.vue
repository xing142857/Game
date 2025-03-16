<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

// Player and enemy's size in percentage of the screen.
const ELEMENTSIZE = 5

// Player and enemy's max width and height in percentage of the screen.
const ELEMENTMAXWIDTH = 100-ELEMENTSIZE
const ELEMENTMAXHEIGHT = 100-ELEMENTSIZE*2

// Game difficulty
let difficulty = 100

// How many bullets player are fired.
let bulletPlayerIndex = 0

// Player Class
class Player {
  private playerTop: number;
  private playerLeft: number;
  private playerLife: number;
  constructor() {
    this.playerLeft = 80;
    this.playerTop = 50;
    this.playerLife = 100;
  }

  getTopPosition(): number {return this.playerTop;}

  getLeftPosition(): number {return this.playerLeft;}

  getplayerLife(): number {return this.playerLife;}

  setTopPosition(top: number): void {
    if (top < 0) {
      this.playerTop = 0
    } else if(top > ELEMENTMAXHEIGHT) {
      this.playerTop = ELEMENTMAXHEIGHT
    } else {
      this.playerTop = top
    }
  }

  setLeftPosition(left: number): void {
    if (left < 0) {
      this.playerLeft = 0
    } else if(left > ELEMENTMAXWIDTH) {
      this.playerLeft = ELEMENTMAXWIDTH
    } else {
      this.playerLeft = left
    }
  } 

  setplayerLife(playerLife: number): void {this.playerLife = Math.max(playerLife, 0)} 

  // Move the player based on pressed keys
  updatePlayerPosition = () => {
    const step = 1 // Step size in percentage
    if (pressedKeys.has('ArrowLeft')) {
      this.setLeftPosition(this.getLeftPosition() - step) // Prevent moving out of bounds (left edge)
    }
    if (pressedKeys.has('ArrowRight')) {
      this.setLeftPosition(this.getLeftPosition() + step) // Prevent moving out of bounds (right edge)
    }
    if (pressedKeys.has('ArrowUp')) {
      this.setTopPosition(this.getTopPosition() - step) // Prevent moving out of bounds (top edge)
    }
    if (pressedKeys.has('ArrowDown')) {
      this.setTopPosition(this.getTopPosition() + step) // Prevent moving out of bounds (bottom edge)
    }
  }
}

// Enemy Class
class Enemy {
  private enemyTop: number;
  private enemyLeft: number;
  private enemyTransition: boolean;
  private enemySleep: number;
  private enemyLife: number;
  private ELEMENTMAXWIDTH: number;

  constructor(ELEMENTMAXWIDTH: number) {
    this.ELEMENTMAXWIDTH = ELEMENTMAXWIDTH;
    this.enemyTop = 0;
    this.enemyLeft = Math.random() * this.ELEMENTMAXWIDTH;
    this.enemyTransition = true;
    this.enemySleep = Math.round(Math.random() * 100);
    this.enemyLife = 100;
  }

  getTopPosition(): number {return this.enemyTop;}

  getLeftPosition(): number {return this.enemyLeft;}

  getTransitionState(): boolean {return this.enemyTransition;}

  getSleepTime(): number {return this.enemySleep;}

  getEnemyLife(): number {return this.enemyLife}

  setTopPosition(top: number): void {this.enemyTop = top}

  setLeftPosition(left: number): void {this.enemyLeft = left}

  setEnemySleep(sleepTime: number): void {this.enemySleep = sleepTime}

  setEnemyLife(enemyLife: number): void {this.enemyLife =  Math.max(enemyLife, 0)}

  toggleTransition(state: boolean): void {this.enemyTransition = state}
}

// BulletPlayer Class
class BulletPlayer {
  private bulletPlayerTop: number;
  private bulletPlayerLeft: number;
  constructor() {
    this.bulletPlayerLeft = -100;
    this.bulletPlayerTop = -100;
  }

  getTopPosition(): number {return this.bulletPlayerTop;}

  getLeftPosition(): number {return this.bulletPlayerLeft;}

  setTopPosition(top: number): void {this.bulletPlayerTop = top}

  setLeftPosition(left: number): void {this.bulletPlayerLeft = left} 
}

// Enemy Array
const enemyArray = ref<Enemy[]>(
  Array.from({ length: difficulty }, () => new Enemy(ELEMENTMAXWIDTH))
);

// Player
const player = ref(new Player())

// Player Bullet Array
const bulletPlayerArray = ref<BulletPlayer[]>(
  Array.from({ length: 100 }, () => new BulletPlayer())
);

// Set to track currently pressed keys
const pressedKeys = new Set<string>()

// Interval ID for the game loop
let gameLoopInterval: number | null = null

// Function to random all aliens' positions
const randomAlienPositions = () => {
  enemyArray.value.forEach((enemy) => (
    enemy.setLeftPosition(Math.random() * ELEMENTMAXWIDTH)
  ))
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
    player.value.setplayerLife(player.value.getplayerLife()-1)
  }
}

// Event handlers to update pressed keys
const handleKeyDown = (event: KeyboardEvent) => {
  pressedKeys.add(event.key)
}

const handleKeyUp = (event: KeyboardEvent) => {
  pressedKeys.delete(event.key)
}

// Moniter the player's bullet and initial their start position
const fireBulletPlayer = () => {
  if (pressedKeys.has(' ')) {
    bulletPlayerArray.value[bulletPlayerIndex].setLeftPosition(player.value.getLeftPosition())
    bulletPlayerArray.value[bulletPlayerIndex].setTopPosition(player.value.getTopPosition())
  }
}

// Start the game loop
const startGameLoop = () => {
  gameLoopInterval = window.setInterval(() => {
    player.value.updatePlayerPosition()
    fireBulletPlayer()
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

// Reactive bar width based on player's playerLife
const barWidth = computed(() => player.value.getplayerLife() * 0.2 + '%')
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
      v-for="(_, i) in bulletPlayerArray" 
      :key="i"
      src="./ShmupSprites/Bullet_player.png" 
      alt="bulletPlayer" 
      class="bulletPlayer"
      :style="{
        top: bulletPlayerArray[i].getTopPosition() + '%',
        left: bulletPlayerArray[i].getLeftPosition() + '%',
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

.bulletPlayer {
  position: absolute;
}

</style>
