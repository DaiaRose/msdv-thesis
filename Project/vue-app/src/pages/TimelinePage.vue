<!-- src/pages/TimelinePage.vue -->
<template>
  <div class="horizontal-timeline">
    <div class="scroll-container" @scroll="handleScroll">
      <div
        v-for="(card, idx) in timelineCards"
        :key="card.id"
        class="timeline-item"
        :style="{
          gridRow:    tagToRow[card.tag] + groupIndexList[idx],
          gridColumn: dateToColumn[card.date]
        }"
      >
        <TimelineCards
          :data="card"
          :progress="currentStep === idx ? currentProgress : 0"
        />
      </div>

      <!-- “Next Page” button sits in row 1 of the next column -->
      <div
        class="timeline-item button-item"
        :style="{ gridRow: 1, gridColumn: timelineColumns + 1 }"
      >
        <button @click="goToNextPage">Go to Next Page</button>
      </div>
    </div>
  </div>
</template>

<script>
import TimelineCards from "../components/TimelineCards.vue";

const MAX_SVG_WIDTH = 600;

export default {
  name: "TimelinePage",
  components: { TimelineCards },
  data() {
    return {
      timelineCards: [],     // loaded from JSON
      width: MAX_SVG_WIDTH,
      currentStep: 0,
      currentProgress: 0,
    };
  },
  computed: {
    // 1) Unique tags in appearance order
    uniqueTags() {
      return Array.from(new Set(this.timelineCards.map(c => c.tag)));
    },
    // 2) Map tag → base row
    tagToRow() {
      return this.uniqueTags.reduce((m, tag, i) => {
        m[tag] = i + 1;
        return m;
      }, {});
    },
    // 3) Unique dates in appearance order
    uniqueDates() {
      return Array.from(new Set(this.timelineCards.map(c => c.date)));
    },
    // 4) Map date → column
    dateToColumn() {
      return this.uniqueDates.reduce((m, date, i) => {
        m[date] = i + 1;
        return m;
      }, {});
    },
    // 5) Number of date‑columns (for placing the Next button)
    timelineColumns() {
      return this.uniqueDates.length;
    },
    // 6) For each card, index within its (date, tag) group
    groupIndexList() {
      const counters = {};
      return this.timelineCards.map(card => {
        const key = `${card.date}::${card.tag}`;
        const idx = counters[key] || 0;
        counters[key] = idx + 1;
        return idx;
      });
    },
  },
  methods: {
    handleScroll(event) {
      const scrollLeft = event.target.scrollLeft;
      const itemWidth  = 200 + 20; // card width + gap
      this.currentStep    = Math.floor(scrollLeft / itemWidth);
      this.currentProgress = (scrollLeft % itemWidth) / itemWidth;
    },
    onResize() {
      this.width = Math.min(MAX_SVG_WIDTH, window.innerWidth);
    },
    goToNextPage() {
      this.$router.push({ name: "CurrentlyCensor" });
    },
    fetchTimelineData() {
      fetch("data/historyData.json")
        .then(res => res.json())
        .then(data => { this.timelineCards = data; })
        .catch(err => console.error("Error fetching timeline data:", err));
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.fetchTimelineData();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.horizontal-timeline {
  margin-top: 50px;
}

.scroll-container {
  display: grid;
  /* one 200px column per date */
  grid-auto-flow: column;
  grid-auto-columns: 200px;
  /* each row sizes to its content */
  grid-auto-rows: auto;
  /* gaps */
  column-gap: 20px;
  row-gap: 10px;

  overflow-x: auto;
  overflow-y: hidden;
  padding: 0;

  /* Enable scroll snapping */
  scroll-snap-type: x mandatory;
}

.timeline-item {
  width: 200px;            /* match card width */
  scroll-snap-align: start;
}

.button-item {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>