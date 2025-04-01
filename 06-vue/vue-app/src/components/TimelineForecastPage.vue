<!-- src/components/TimelineForecast.vue -->
<!-- src/components/TimelineForecastPage.vue -->
<template>
    <div class="horizontal-timeline">
      <!-- Horizontal scroll container for forecast steps -->
      <div class="scroll-container" @scroll="handleScroll">
        <div
          v-for="(data, index) in periods"
          :key="data.number"
          class="timeline-item"
        >
          <TimelineForecast
            :data="data"
            :progress="currentStep === index ? currentProgress : 0"
          />
        </div>
        <!-- Navigation button timeline item -->
        <div class="timeline-item button-item">
          <button @click="goToNextPage">Go to Next Page</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TimelineForecast from "./TimelineForecast.vue";
  
  const API_URL = "https://api.weather.gov/gridpoints/OKX/33,37/forecast";
  const MAX_SVG_WIDTH = 600;
  
  export default {
    name: "TimelineForecastPage",
    components: {
      TimelineForecast
    },
    data() {
      return {
        forecast: null,
        width: MAX_SVG_WIDTH,
        currentStep: 0,
        currentProgress: 0,
      };
    },
    computed: {
      periods() {
        return this.forecast && this.forecast.properties
          ? this.forecast.properties.periods
          : [];
      },
    },
    methods: {
      handleScroll(event) {
        const container = event.target;
        const scrollLeft = container.scrollLeft;
        const itemWidth = 320; // Adjust if needed
        this.currentStep = Math.floor(scrollLeft / itemWidth);
        this.currentProgress = (scrollLeft % itemWidth) / itemWidth;
      },
      onResize() {
        this.width = Math.min(MAX_SVG_WIDTH, window.innerWidth);
      },
      goToNextPage() {
        this.$router.push({ name: "NextPage" });
      },
    },
    mounted() {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          this.forecast = data;
        });
      window.addEventListener("resize", this.onResize);
    },
    beforeUnmount() {
      window.removeEventListener("resize", this.onResize);
    },
  };
  </script>
  
  <style scoped>
  .horizontal-timeline {
    padding: 10px;
  }
  .scroll-container {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding: 10px;
  }
  .timeline-item {
    flex: 0 0 auto;
    width: 300px;
    margin-right: 20px;
    scroll-snap-align: start;
  }
  </style>
  