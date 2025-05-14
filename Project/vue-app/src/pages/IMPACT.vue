<!-- src/views/LargeTextPage.vue -->
<template>
    <div class="full-page" @click="goToNextPage">
      <p class="currently-statement">
        What impact does inclusion have?
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'IMPACT',
    methods: {
      goToNextPage() {
        this.$router.push({ name: 'impactPage' });
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