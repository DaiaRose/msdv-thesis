<!-- src/pages/FaceGridStatsPage.vue -->
<template>
  <div class="grid-page">
    <!-- Header -->
    <header class="page-header">
      <p class="currently-statement">
        In the past year LGBTQ+ young people experienced
        <el-dropdown trigger="click" @command="handleDropdownCommand">
          <span class="el-dropdown-link styled-box">
            {{ currentScene.title }} <i class="el-icon-arrow-down"></i>
          </span>
          <template #dropdown>
            <el-dropdown-item
              v-for="(scene, index) in scenes"
              :key="index"
              :command="index"
            >
              {{ scene.title }}
            </el-dropdown-item>
          </template>
        </el-dropdown>
        at the following rates
      </p>
    </header>

    <!-- Grid -->
    <div class="fixed-grid-container">
      <div class="face-grids-container">
        <div v-for="(grid, index) in processedFaceGrids" :key="index" class="grid-and-label">
          <FaceGrid
            :filledCount="grid.filledCount"
            :headImagePaths="grid.headImagePaths"
            :faceImagePaths="grid.faceImagePaths"
          />
          <div class="grid-label">{{ shortLabels[index] }}</div>
        </div>
      </div>
    </div>

    <!-- Dropdown + text description -->
    <div class="fixed-text-container">
      <p>{{ currentScene.description || '' }}</p>
    </div>

    <!-- Next Button -->
    <button class="next-button" @click="goToNextPage">
      Next
    </button>
  </div>
</template>

<script>
import FaceGrid from '@/components/FaceGrid.vue';

export default {
  name: 'FaceGridStatsPage',
  components: { FaceGrid },
  data() {
    return {
      currentSceneIndex: 0,
      manifest: null,
      shortLabels: [
        "cis boys",
        "cis girls",
        "trans girls",
        "trans boys",
        "nonbinary",
        "gender questioning"
      ],
      scenes: [
        {
          title: 'forced sexual contact',
          description: 'Based on 2023 survey of LGBTQ+ young people ages 13-18',
          faceGrids: [
            { filledCount: 5, headManifestKey: 'cisboyPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 9, headManifestKey: 'cisgirlPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 8, headManifestKey: 'tgirlPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 12, headManifestKey: 'tboyPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 11, headManifestKey: 'enbyPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 9, headManifestKey: 'questionPeeps', faceManifestKey: 'facePeeps' },
          ]
        },
        {
          title: 'symptoms of depression',
          description: 'Based on 2024 survey of LGBTQ+ young people ages 13-18',
          faceGrids: [
            { filledCount: 9, headManifestKey: 'cisboyPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 11, headManifestKey: 'cisgirlPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 14, headManifestKey: 'tgirlPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 15, headManifestKey: 'tboyPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 14, headManifestKey: 'enbyPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 15, headManifestKey: 'questionPeeps', faceManifestKey: 'facePeeps' },
          ]
        },
        {
          title: 'suicidal thoughts',
          description: 'Based on 2024 survey of LGBTQ+ young people ages 13-18',
          faceGrids: [
            { filledCount: 6, headManifestKey: 'cisboyPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 7, headManifestKey: 'cisgirlPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 11, headManifestKey: 'tgirlPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 12, headManifestKey: 'tboyPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 10, headManifestKey: 'enbyPeeps', faceManifestKey: 'facePeeps' },
            { filledCount: 10, headManifestKey: 'questionPeeps', faceManifestKey: 'facePeeps' },
          ]
        }
      ]
    };
  },
  computed: {
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
  handleDropdownCommand(index) {
    this.currentSceneIndex = index;
  },
  fetchManifest() {
    fetch('data/manifestPeeps.json')
      .then(response => response.json())
      .then(data => {
        this.manifest = data;
      })
      .catch(error => console.error("Error fetching manifest:", error));
  },
  goToNextPage() {
    this.$router.push({ name: 'CurrentlyInclude' });
  }
},

mounted() {
  this.fetchManifest();
}

};
</script>


<style scoped>
/* Fixed grid container */
.fixed-grid-container {
  position: fixed;
  top: 100px; /* Leave room for your header */
  bottom: 80px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;  /* vertically center */
  justify-content: center; /* horizontally center */
  overflow-y: auto;
}

/* Layout for multiple FaceGrid components */
.face-grids-container {
  display: flex;
  flex-wrap: nowrap; 
  justify-content: center;
  align-items: center;
  gap: clamp(10px, 3vw, 40px); /* smart expanding gaps */
  padding-top: 2vw;
  padding-left: 1vw;
  overflow-x: auto;    /* scroll sideways if absolutely necessary (but should rarely happen) */
  max-width: 95vw;
  margin: 0 auto;
}

/* fixed text below grids */
.fixed-text-container {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1;
  padding: 10px;
}

/* Next button */
.next-button {
  margin: 20px auto;
  padding: 8px 0px;
  position: fixed;
  bottom: 20px;
  left: 80%;
  z-index: 2;
}

/* Force the dropdown trigger to behave like part of the paragraph */
.el-dropdown-link.styled-box {
  display: inline-block;
  padding: 0 10px;
  border-radius: var(--border-radius);
  background: var(--lightOrange);
  color: var(--dark);
  font-weight: 400;
  vertical-align: baseline;
  line-height: 1.2;
  cursor: pointer;
}

/* Hover effect */
.el-dropdown-link.styled-box:hover {
  background: var(--orange);
}

.grid-and-label {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid-label {
  margin-top: 0.5rem;
  font-size: 1.5vw;  /* Adjust as needed */
  color: var(--dark);
  text-align: center;
}

</style>





  
  