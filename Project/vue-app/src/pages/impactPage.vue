<template>
    <div class="impact-page">
      <h1>LGBTQ-Inclusive Sex Ed Impact</h1>
  
      <label for="vizSelect">Select Outcome:</label>
      <select v-model="selectedViz" id="vizSelect">
        <option value="bullying">Bullying</option>
        <option value="suicide">Suicide Plan</option>
        <option value="depression">Depressive Symptoms</option>
      </select>
  
      <!-- Dynamically render the selected component -->
      <component :is="currentComponent" />
    </div>
  </template>
  
  <script>
  import BullyingViz from "@/components/BullyingViz.vue";
  import SuicidePlanViz from "@/components/SuicidePlanViz.vue";
  import DepressiveViz from "@/components/DepressiveViz.vue";
  
  export default {
    name: "ImpactPage",
    components: {
      BullyingViz,
      SuicidePlanViz,
      DepressiveViz,
    },
    data() {
      return {
        selectedViz: "depressive", // default selection
      };
    },
    computed: {
      currentComponent() {
        switch (this.selectedViz) {
          case "suicide":
            return "SuicidePlanViz";
          case "depression":
            return "DepressiveViz";
          default:
            return "BullyingViz";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .impact-page {
    font-family: sans-serif;
    padding: 2rem;
  }
  select {
    margin: 1rem 0;
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
  }
  </style>
  
  

