<!-- src/components/HistoryPage.vue -->
<template>
  <div class="horizontal-timeline">
    <!-- Horizontal scroll container for timeline cards -->
    <div class="scroll-container" @scroll="handleScroll">
      <div
        v-for="(card, index) in timelineCards"
        :key="card.id"
        class="timeline-item"
      >
        <HistoryCards
          :data="card"
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
import HistoryCards from "./HistoryCards.vue";

const MAX_SVG_WIDTH = 600;

export default {
  name: "HistoryPage",
  components: {
    HistoryCards
  },
  data() {
    return {
      timelineCards: [],  // Initialize as an empty array; data will be fetched
      width: MAX_SVG_WIDTH,
      currentStep: 0,
      currentProgress: 0,
    };
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
      // Navigate to the next page using its route name.
      this.$router.push({ name: 'CurrentlyStatement' });
    },
    fetchTimelineData() {
      fetch('data/historyData.json')
        .then((response) => response.json())
        .then((data) => {
          this.timelineCards = data;
        })
        .catch((error) => console.error('Error fetching timeline data:', error));
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    // Fetch the timeline data when the component mounts.
    this.fetchTimelineData();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.horizontal-timeline {
  margin-top: 80px;
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
.button-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
