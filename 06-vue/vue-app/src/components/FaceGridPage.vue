<template>
  <div class="grid-page">
    <!-- Fixed header -->
    <header class="fixed-header">
      <h1>My Face Grids</h1>
    </header>
    
    <!-- Fixed grid container -->
    <div class="fixed-grid-container">
      <div class="face-grids-container">
        <FaceGrid
        v-for="(grid, index) in faceGrids"
        :key="index"
        :filledCount="grid.filledCount"
        :minImage="grid.minImage"
        :maxImage="grid.maxImage"
      />
      </div>
    </div>
    
    <!-- Fixed text container that updates in place -->
    <div class="fixed-text-container">
      <h2>{{ currentScene.title }}</h2>
      <p>{{ currentScene.description }}</p>
    </div>
    
    <!-- Invisible scroll container to drive scene changes -->
    <div class="scroll-container"></div>
  </div>
</template>

<script>
import FaceGrid from '@/components/FaceGrid.vue';

export default {
  name: 'FaceGridPage',
  components: { FaceGrid },
  data() {
    return {
      currentSceneIndex: 0,
      scenes: [
        {
          title: 'Scene 1: Six Grids',
          description: 'This scene displays 6 grids across the page.',
          faceGrids: [
          { filledCount: 10, minImage: 1, maxImage: 12 },
          { filledCount: 15, minImage: 13, maxImage: 23 },
          { filledCount: 20, minImage: 24, maxImage: 33 },
          { filledCount: 12, minImage: 34, maxImage: 42 },
          { filledCount: 18, minImage: 43, maxImage: 51 },
          { filledCount: 24, minImage: 52, maxImage: 56 }
          ]
        },
        {
          title: 'Scene 2: Two Grids',
          description: 'This scene displays 2 grids.',
          faceGrids: [
            { filledCount: 8, imageNumber: 1 },
            { filledCount: 16, imageNumber: 2 }
          ]
        },
        {
          title: 'Scene 3: Seven Grids',
          description: 'This scene displays 7 grids.',
          faceGrids: [
            { filledCount: 5, imageNumber: 1 },
            { filledCount: 10, imageNumber: 2 },
            { filledCount: 15, imageNumber: 2 },
            { filledCount: 20, imageNumber: 1 },
            { filledCount: 10, imageNumber: 2 },
            { filledCount: 12, imageNumber: 2 },
            { filledCount: 18, imageNumber: 1 }
          ]
        }
      ]
    };
  },
  computed: {
    currentScene() {
      return this.scenes[this.currentSceneIndex];
    }
  },
  methods: {
    // Updates the currentSceneIndex based on scroll position.
    handleScroll() {
      const scrollPos = window.scrollY;
      const viewportHeight = window.innerHeight;
      const index = Math.floor(scrollPos / viewportHeight);
      // Clamp the scene index to available scenes.
      if (index < 0) {
        this.currentSceneIndex = 0;
      } else if (index >= this.scenes.length) {
        this.currentSceneIndex = this.scenes.length - 1;
      } else {
        this.currentSceneIndex = index;
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.grid-page {
  position: relative;
}

/* Fixed header */
.fixed-header {
  position: fixed;
  top: 20;
  left: 0;
  right: 0;
  z-index: 100;
  text-align: center;
  padding: 20px;
}

/* Fixed grid container below the header */
.fixed-grid-container {
  position: fixed;
  top: 60px; /* Adjust if header height changes */
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 50;
}

/* Layout for FaceGrid components */
.face-grids-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

/* Fixed text container that stays in place */
.fixed-text-container {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 100;
  padding: 10px;
}

/* Invisible scroll container to provide scroll height */
.scroll-container {
  height: 300vh; /* Adjust height as needed to control scroll length */
  pointer-events: none; /* Ensures it doesn't block mouse events */
}
</style>




  
  