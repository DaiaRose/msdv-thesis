<!-- src/views/WHY.vue -->
<template>
    <div class="full-page" @click="goToNextPage">
      <p class="currently-statement">
        Why does this matter?
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WHY',
    methods: {
      goToNextPage() {
        this.$router.push({ name: 'FaceGridIntroPage' });
      }
    }
  }
  </script>
  
  <style scoped>
  .full-page {
    width: 100vw;
    height: 100vh;
    margin: 0;
    background-color: var(--orange);
  
    display: flex;
    align-items: center;
    justify-content: center;
  
    cursor: pointer; /* show hand cursor */
  }
  
  .currently-statement {
    font-size: clamp(3rem, 8vw, 10rem);
    line-height: 1;
    text-align: center;
    color: white;
  }
  </style>
  