<!-- src/pages/FaceGridStatsPage.vue -->
<template>
  <div class="grid-page">
    <!-- Header -->
    <header class="page-header">
      <p class="currently-statement">
        In {{ currentScene.year }}, LGBTQ+ young people {{ currentScene.headingVerb }}
        <el-dropdown 
          trigger="click" 
          @command="handleDropdownCommand"
          :popper-append-to-body="true"
        >
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
        at the following rates:
      </p>
    </header>

    <!-- Grid -->
    <div class="fixed-grid-container">
      <div class="face-grids-container">
        <div v-for="(grid, index) in processedFaceGrids" :key="index" class="grid-and-label">
          <p class="grid-label">{{ currentShortLabels[index] }}</p>
          <FaceGrid
            :filledCount="grid.filledCount"
            :headImagePaths="grid.headImagePaths"
            :faceImagePaths="grid.faceImagePaths"
          />
          <div class="grid-label">{{ grid.percent }}%</div>
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
          year: 2023,
          headingVerb: 'reported ever experiencing',
          description: 'Based on 2023 survey of LGBTQ+ young people ages 13-24',
          faceGrids: [
            { filledCount: 5, headManifestKey: 'boyPeeps', faceManifestKey: 'facePeeps', percent: 22 },
            { filledCount: 9, headManifestKey: 'girlPeeps', faceManifestKey: 'facePeeps', percent: 37},
            { filledCount: 8, headManifestKey: 'girlPeeps', faceManifestKey: 'facePeeps', percent: 33},
            { filledCount: 12, headManifestKey: 'boyPeeps', faceManifestKey: 'facePeeps', percent: 49},
            { filledCount: 11, headManifestKey: 'allPeeps', faceManifestKey: 'facePeeps', percent: 45},
            { filledCount: 9, headManifestKey: 'allPeeps', faceManifestKey: 'facePeeps', percent: 37},
          ]
        },
        {
          title: 'symptoms of depression',
          year: 2024,
          headingVerb: 'experienced',
          description: 'Based on 2024 survey of LGBTQ+ young people ages 13-24',
          faceGrids: [
            { filledCount: 9, headManifestKey: 'boyPeeps', faceManifestKey: 'facePeeps', percent: 39},
            { filledCount: 11, headManifestKey: 'girlPeeps', faceManifestKey: 'facePeeps', percent: 46},
            { filledCount: 14, headManifestKey: 'girlPeeps', faceManifestKey: 'facePeeps', percent: 57},
            { filledCount: 15, headManifestKey: 'boyPeeps', faceManifestKey: 'facePeeps', percent: 61},
            { filledCount: 14, headManifestKey: 'allPeeps', faceManifestKey: 'facePeeps', percent: 57},
            { filledCount: 15, headManifestKey: 'allPeeps', faceManifestKey: 'facePeeps', percent: 62},
          ]
        },
        {
          title: 'suicidal thoughts',
          year: 2024,
          headingVerb: 'experienced',
          description: 'Based on 2024 survey of LGBTQ+ young people ages 13-24',
          faceGrids: [
            { filledCount: 6, headManifestKey: 'boyPeeps', faceManifestKey: 'facePeeps', percent: 27},
            { filledCount: 7, headManifestKey: 'girlPeeps', faceManifestKey: 'facePeeps', percent: 31},
            { filledCount: 11, headManifestKey: 'girlPeeps', faceManifestKey: 'facePeeps', percent: 47},
            { filledCount: 12, headManifestKey: 'boyPeeps', faceManifestKey: 'facePeeps', percent: 52},
            { filledCount: 10, headManifestKey: 'allPeeps', faceManifestKey: 'facePeeps', percent: 43},
            { filledCount: 10, headManifestKey: 'allPeeps', faceManifestKey: 'facePeeps', percent: 42},
          ]
        },
        {
          title: 'self harm',
          year: 2023,
          headingVerb: 'reported',
          description: 'Based on 2023 survey of LGBTQ+ young people ages 13-24',
          faceGrids: [
            { filledCount: 7, headManifestKey: 'boyPeeps', faceManifestKey: 'facePeeps', percent: 28},
            { filledCount: 11, headManifestKey: 'girlPeeps', faceManifestKey: 'facePeeps', percent: 47},
            { filledCount: 12, headManifestKey: 'girlPeeps', faceManifestKey: 'facePeeps', percent: 52},
            { filledCount: 17, headManifestKey: 'boyPeeps', faceManifestKey: 'facePeeps', percent: 72},
            { filledCount: 16, headManifestKey: 'allPeeps', faceManifestKey: 'facePeeps', percent: 68},
            { filledCount: 12, headManifestKey: 'allPeeps', faceManifestKey: 'facePeeps', percent: 48},
          ]
        },
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
  },
  currentShortLabels() {
    // Use alternate labels if current scene is the last one
    if (this.currentScene.title === 'self harm') {
      return [
        "cis boys",
        "cis girls",
        "trans girls",
        "trans boys",
        "nonbinary AFAB",
        "nonbinary AMAB"
      ];
    }
    return this.shortLabels;
  }
},

methods: {
  handleDropdownCommand(index) {
    this.currentSceneIndex = index;
    this.$nextTick(() => {
    const focused = this.$el.querySelector('.el-dropdown-menu__item:focus');
    if (focused) focused.blur();
    });
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

.grid-page {
  margin-top: 2vh;
}
/* Fixed grid container */
.fixed-grid-container {
  position: fixed;
  top: 15vh; /* Leave room for your header */
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
  font-size: 2rem;
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
  padding: 4px 10px;         /* add some top/bottom padding so click is easy */
  border-radius: var(--border-radius);
  background: var(--lightOrange);
  color: var(--dark);
  cursor: pointer;
  line-height: 1;
  position: relative;        /* needed for z‑index to take effect */
  z-index: 2;                /* sit above fixed/grid layers */
}
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
  font-size: 2rem;  /* Adjust as needed */
  color: var(--dark);
  text-align: center;
}

</style>





  
  