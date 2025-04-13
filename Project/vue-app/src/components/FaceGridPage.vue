<template>
  <div class="grid-page">
    <!-- Fixed header -->
    <header class="fixed-header">
      <h1>My Face Grids</h1>
    </header>
    
    <!-- Fixed grid container (dynamic) -->
    <div class="fixed-grid-container">
      <div class="face-grids-container">
        <FaceGrid
          v-for="(grid, index) in processedFaceGrids"
          :key="index"
          :filledCount="grid.filledCount"
          :headImagePaths="grid.headImagePaths"
          :faceImagePaths="grid.faceImagePaths"
        />
      </div>
    </div>
    
    <!-- Fixed text container that updates in place -->
    <div class="fixed-text-container">
      <h2>{{ currentScene.title || 'Loading...' }}</h2>
      <p>{{ currentScene.description || '' }}</p>
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
      manifest: null, // Will hold the data loaded from manifestPeeps.json
      scenes: [
        {
          title: 'Scene 1: Six Grids',
          description: 'This scene displays 6 grids, each pulling images from the manifest.',
          faceGrids: [
            { filledCount: 12, headManifestKey: 'nativePeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 11, headManifestKey: 'multiracePeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 9,  headManifestKey: 'latinxPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 9,  headManifestKey: 'mideastPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 8,  headManifestKey: 'blackPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 5,  headManifestKey: 'whitePeeps', faceManifestKey: 'facePeeps' }
          ]
        },
        {
          title: 'Scene 2: Two Grids',
          description: 'This scene displays 2 grids.',
          faceGrids: [
            { filledCount: 13, headManifestKey: 'nativePeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 9,  headManifestKey: 'multiracePeeps', faceManifestKey: 'facePeeps' }
          ]
        },
        {
          title: 'Scene 3: Seven Grids',
          description: 'This scene displays 7 grids.',
          faceGrids: [
            { filledCount: 14, headManifestKey: 'nativePeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 10, headManifestKey: 'latinxPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 9,  headManifestKey: 'multiracePeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 9,  headManifestKey: 'mideastPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 9,  headManifestKey: 'blackPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 9,  headManifestKey: 'whitePeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 6,  headManifestKey: 'aapiPeeps', faceManifestKey: 'facePeeps' }
          ]
        }
      ]
    };
  },
  computed: {
    // Define currentScene so the template can access it.
    currentScene() {
      return this.scenes[this.currentSceneIndex] || {};
    },
    processedFaceGrids() {
      if (this.manifest && this.currentScene && this.currentScene.faceGrids) {
        return this.currentScene.faceGrids.map(grid => ({
          ...grid,
          headImagePaths: this.manifest[grid.headManifestKey] || [],
          faceImagePaths: this.manifest[grid.faceManifestKey] || []
        }));
      }
      return [];
    }
  },
  methods: {
    handleScroll() {
      const scrollPos = window.scrollY;
      const viewportHeight = window.innerHeight;
      const index = Math.floor(scrollPos / viewportHeight);
      this.currentSceneIndex = Math.min(Math.max(index, 0), this.scenes.length - 1);
    },
    fetchManifest() {
      fetch('/data/manifestPeeps.json')
        .then(response => response.json())
        .then(data => {
          this.manifest = data;
          console.log("Manifest loaded:", this.manifest);
        })
        .catch(error => console.error("Error fetching manifest:", error));
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.fetchManifest();
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
/* .fixed-header {
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 100;
  text-align: center;
  padding: 20px;
} */

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
  pointer-events: none;
}
</style>







  
  