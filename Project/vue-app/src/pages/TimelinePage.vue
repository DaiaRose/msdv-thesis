<!-- src/pages/TimelinePage.vue -->
<template>
  <div class="horizontal-timeline">
    <!-- Full-screen background on hover -->
    <div
      v-if="hoveredImage"
      class="hover-background"
      :style="{ backgroundImage: `url(${hoveredImage})` }"
    ></div>

    <div class="scroll-container" @scroll="handleScroll">
      <!-- One flex column per date -->
      <div
        v-for="date in uniqueDates"
        :key="date"
        class="date-column"
      >
        <!-- Cards for this date -->
        <div
          v-for="(card, idx) in cardsByDate[date]"
          :key="card.id"
          class="timeline-item"
          :class="{ faded: hoveredCard && hoveredCard !== card.id }"
          :style="{ marginTop: cardMarginTop(card) + 'px' }"
          @mouseover="onHover(card.id, card.image)"
          @mouseleave="onLeave"
        >
          <TimelineCards
            :data="card"
            :progress="currentStep === globalIndex(date, idx) ? currentProgress : 0"
          />
        </div>
      </div>
      <!-- Next Page button as last flex child -->
      <div class="button-item" :class="{ faded: hoveredCard }">
        <button @click="goToNextPage">Go to Next Page</button>
      </div>
    </div>
  </div>
</template>

<script>
import TimelineCards from "../components/TimelineCards.vue";

const MAX_SVG_WIDTH = 600;
const TAG_ORDER = ["top", "mid", "low"];
const LANE_SPACING = 120;
const STACK_GAP = 10;

export default {
  name: "TimelinePage",
  components: { TimelineCards },
  data() {
    return {
      timelineCards: [],
      width: MAX_SVG_WIDTH,
      currentStep: 0,
      currentProgress: 0,
      hoveredCard: null,
      hoveredImage: ""
    };
  },
  computed: {
    uniqueDates() {
      return Array.from(new Set(this.timelineCards.map(c => c.date)));
    },
    cardsByDate() {
      const map = {};
      this.uniqueDates.forEach(date => { map[date] = []; });
      this.timelineCards.forEach(card => {
        if (map[card.date]) map[card.date].push(card);
      });
      return map;
    }
  },
  methods: {
    onHover(id, image) {
      this.hoveredCard = id;
      this.hoveredImage = `/images/timeline/${image}`;
    },
    onLeave() {
      this.hoveredCard = null;
      this.hoveredImage = "";
    },
    cardMarginTop(card) {
      const lane = TAG_ORDER.indexOf(card.tag);
      const base = lane >= 0 ? lane * LANE_SPACING : 0;
      const group = this.cardsByDate[card.date].filter(c => c.tag === card.tag);
      const stackIndex = group.findIndex(c => c.id === card.id);
      return base + stackIndex * STACK_GAP;
    },
    globalIndex(date, idx) {
      const card = this.cardsByDate[date][idx];
      return this.timelineCards.findIndex(c => c.id === card.id);
    },
    handleScroll(event) {
      const scrollLeft = event.target.scrollLeft;
      const itemWidth = 240 + 20;
      this.currentStep = Math.floor(scrollLeft / itemWidth);
      this.currentProgress = (scrollLeft % itemWidth) / itemWidth;
    },
    goToNextPage() {
      this.$router.push({ name: 'CurrentlyStatement' });
    },
    fetchTimelineData() {
      fetch('data/historyData.json')
        .then(res => res.json())
        .then(data => this.timelineCards = data)
        .catch(err => console.error('Error fetching timeline data:', err));
    },
    onResize() {
      this.width = Math.min(MAX_SVG_WIDTH, window.innerWidth);
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.fetchTimelineData();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
};
</script>

<style scoped>
.horizontal-timeline {
  margin-top: 50px;
  position: relative;
}

.scroll-container {
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: 20px;
  gap: 20px;
}

.date-column {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 240px;
}

.timeline-item {
  width: 240px;
  transition: opacity 0.2s ease, filter 0.2s ease;
}

.button-item {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  transition: opacity 0.2s ease, filter 0.2s ease;
}

.faded {
  opacity: 0.3;
  filter: grayscale(100%);
}

/* Full-screen hover background */
.hover-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

/* Ensure cards render above background */
.scroll-container,
.timeline-item,
.button-item {
  position: relative;
  z-index: 1;
}
</style>
