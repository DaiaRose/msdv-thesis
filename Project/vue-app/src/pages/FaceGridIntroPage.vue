<!-- src/pages/FaceGridIntroPage.vue -->
<template>
  <div class="grid-page">
    <!-- Fixed header -->
    <header class="page-header">
      <p class="currently-statement">
        90% of LGBTQ+ young people said their 
        well-being was negatively impacted due to recent politics.
      </p>
    </header>
    
    <!-- Grid centered between header and button -->
    <!-- only show grids once manifest is loaded -->
    <div class="fixed-grid-container" v-if="manifest">
      <div class="face-grids-container">
        <FaceGrid
          v-for="(grid, idx) in startScene.faceGrids"
          :key="idx"
          :filledCount="grid.filledCount"
          :headImagePaths="manifest[grid.headManifestKey]"
          :faceImagePaths="manifest[grid.faceManifestKey]"
        />
      </div>
    </div>

    
    <!-- Next button fixed at bottom -->
    <button class="next-button" @click="goToNextPage">
      continue
    </button>
  </div>
</template>

<script>
import FaceGrid from '@/components/FaceGrid.vue';

export default {
  name: 'FaceGridIntroPage',
  components: { FaceGrid },
  data() {
    return {
      manifest: null,
      // Just the first scene’s config
      startScene: {
        faceGrids: [
          { filledCount: 24, headManifestKey: 'tboyPeeps', faceManifestKey: 'facePeeps' },
          { filledCount: 24,  headManifestKey: 'tboyPeeps',  faceManifestKey: 'facePeeps' },
          { filledCount: 24,  headManifestKey: 'tboyPeeps', faceManifestKey: 'facePeeps' },
          { filledCount: 24,  headManifestKey: 'tboyPeeps',   faceManifestKey: 'facePeeps' },
          { filledCount: 12,  headManifestKey: 'tboyPeeps',   faceManifestKey: 'facePeeps' }
        ]
      }
    };
  },
  methods: {
    fetchManifest() {
      fetch('/data/manifestPeeps.json')
        .then(r => r.json())
        .then(data => { this.manifest = data; })
        .catch(console.error);
    },
    goToNextPage() {
      this.$router.push({ name: 'FaceGridStatsPage' }); // or your second page route
    }
  },
  mounted() {
    this.fetchManifest();
  }
};
</script>

<style scoped>
.grid-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  padding: 20px;
  text-align: center;
}

.fixed-grid-container {
  position: fixed;
  top: 60px;    /* below the header */
  bottom: 80px; /* above the button or footer */
  left: 0;
  right: 0;
  
  display: flex;
  justify-content: center; /* center horizontally */
  align-items: center;     /* center vertically */
  z-index: 50;
}

.face-grids-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  align-items: center;
}

.next-button {
  margin: 20px auto;
  padding: 8px 5px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

</style>








  
  