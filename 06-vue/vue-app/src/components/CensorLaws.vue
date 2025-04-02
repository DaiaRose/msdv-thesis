<!-- src/components/CensorLaws.vue -->
<template>
    <div class="censor-laws">
      <!-- Main Content -->
      <div class="content">
        <h1>Censorship Laws Overview</h1>
        <p>
          parapgraph could go here
        </p>
      </div>
  
      <!-- Timeline -->
      <div class="timeline">
        <div class="timeline-container">
          <div v-for="year in years" :key="year" class="tick">
            <div class="rect"></div>
            <div v-if="shouldLabel(year)" class="label">
              {{ year }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CensorLaws",
    data() {
      return {
        // Array of years from 1987 to 2025.
        years: Array.from({ length: 2025 - 1987 + 1 }, (_, i) => 1987 + i)
      };
    },
    methods: {
      // Label every 10th year.
      shouldLabel(year) {
        return year % 10 === 0;
      }
    }
  };
  </script>
  
  <style scoped>
  .censor-laws {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  /* Main content styling */
  .content {
    flex: 1;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  /* Timeline styling: integrated with the page */
  .timeline {
    padding: 10px 20px; /* horizontal padding so ticks don't touch the edges */
  }
  
  /* Use flex layout for equal spacing */
  .timeline-container {
    display: flex;
    align-items: flex-start;
  }
  
  /* Each tick now takes equal space */
  .tick {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: -10px; /* shifts the tick upward */
  }
  
  /* Tick rectangle styling */
  .rect {
    width: 5px;
    height: 20px;
    background-color: purple;
    margin-bottom: 8px;
  }
  
  /* Label styling: rotated vertical text */
  .label {
  position: relative;
  left: 50%;
  transform: translateX(-50%) rotate(-90deg);
  font-size: 20px;
  white-space: nowrap;
  margin-top: 15px;
  text-align: center;
}
  </style>
  
  
  
  