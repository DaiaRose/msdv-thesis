<template>
    <div class="grid-page">
      <h1>My Face Grids</h1>
      <div class="face-grids-container">
        <FaceGrid
          v-for="(grid, index) in faceGrids"
          :key="index"
          :filledCount="grid.filledCount"
          :imageNumber="grid.imageNumber"
        />
      </div>
    </div>
  </template>
  
  <script>
  import FaceGrid from '@/components/FaceGrid.vue';
  
  export default {
    name: 'GridPage',
    components: {
      FaceGrid
    },
    data() {
      return {
        // Array containing configuration for each FaceGrid instance
        faceGrids: [
          { filledCount: 10, imageNumber: 1 },
          { filledCount: 15, imageNumber: 2 },
          { filledCount: 20, imageNumber: 1 },
          { filledCount: 12, imageNumber: 2 },
          { filledCount: 18, imageNumber: 2 },
          { filledCount: 24, imageNumber: 1 }
        ]
      };
    },
    methods: {
      // Dynamically creates the image source based on the image number
      getIconSrc(imageNumber) {
        return require(`@/images/face${imageNumber}.png`);
      }
    }
  };
  </script>
  
  <style scoped>
  .grid-page {
    padding: 20px;
  }
  
  .face-grids-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  </style>
  
  
  