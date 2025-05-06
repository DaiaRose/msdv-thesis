<!-- src/pages/TimelinePage.vue -->
<template>
  <div class="horizontal-timeline">
    <!-- Label cards on left, matching next-button style for structure but vertical text orientation -->
    <div class="label-container" :class="{ faded: hoveredCard }">
  <button
    class="vertical-button"
    :class="{ active: selectedTags.includes('top') }"
    @click="toggleTag('top')"
  >
    US Sex Ed
  </button>
  <button
    class="vertical-button"
    :class="{ active: selectedTags.includes('mid') }"
    @click="toggleTag('mid')"
  >
    National Events
  </button>
  <button
    class="vertical-button"
    :class="{ active: selectedTags.includes('low') }"
    @click="toggleTag('low')"
  >
    Queer History
  </button>
</div>

<!-- Full-screen background on hover -->
<div
  v-if="hoveredImage"
  class="hover-background"
  :style="{ backgroundImage: `url(${hoveredImage})` }"
>
  <div class="hover-year">
    {{ hoveredCardData.date }}
  </div> 



</div>

<div class="scroll-container" @scroll="handleScroll">
  <!-- One flex column per date -->
  <div
    v-for="date in uniqueDates"
    :key="date"
    class="date-column"
  >
    <!-- Cards for this date -->
    <div v-for="(card, idx) in cardsByDate[date]"
      :key="card.id"
      class="timeline-item"
      :class="{
        hovered:   hoveredCard === card.id,
        faded:     hoveredCard && hoveredCard !== card.id,
        'inactive-tag': selectedTags.length > 0 && !card.tags.some(t => selectedTags.includes(t))
      }"
      :style="{ marginTop: cardMarginTop(card) + 'px' }"
    >
      <TimelineCards
        :data="card"
        :progress="currentStep === globalIndex(date, idx) ? currentProgress : 0"
        @hover="onHover"
        @leave="onLeave"
        @navigate="onNavigate"
      />
    </div>
  </div>

  <!-- Next Page button as last flex child -->
  <div class="button-item" :class="{ faded: hoveredCard }">
    <button class="next-button" @click="goToNextPage">
      What's happening now?
    </button>
  </div>
</div>
</div>
</template>

<script>
import TimelineCards from "../components/TimelineCards.vue";

const MAX_SVG_WIDTH = 600;
const TAG_ORDER = ["top", "mid", "low"];
const LANE_SPACING = 50;
const STACK_GAP = 50;

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
    hoveredImage: "",
    selectedTags: [ 'top', 'mid', 'low' ]
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
},
hoveredCardData() {
  return this.timelineCards.find(c => c.id === this.hoveredCard) || {};
},
},

methods: {
primaryTag(card) {
  // find the highest-priority tag the card belongs to
  return TAG_ORDER.find(t => card.tags.includes(t)) || card.tags[0];
},
onNavigate(link) {
    if (link) window.open(link, '_blank');
  },
toggleTag(tag) {
  const i = this.selectedTags.indexOf(tag);
  if (i === -1) this.selectedTags.push(tag);
  else this.selectedTags.splice(i, 1);
},
onHover(id, image) {
  if (this.hoveredCard === id) {
    // If you click the same card again, reset
    this.onLeave();
  } else {
    // Otherwise show it
    this.hoveredCard  = id;
    this.hoveredImage = `images/timeline/${image}`;
  }
},
onLeave() {
  this.hoveredCard  = null;
  this.hoveredImage = "";
},
cardMarginTop(card) {
    const tag = this.primaryTag(card);
    const lane = TAG_ORDER.indexOf(tag);
    const base = lane >= 0 ? lane * LANE_SPACING : 0;
    const group = this.cardsByDate[card.date].filter(
      c => this.primaryTag(c) === tag
    );
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
selectTag(tag) {
this.selectedTag = tag;
},
goToNextPage() {
  this.$router.push({ name: 'CurrentlyCensor' });
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
.inactive-tag {
  opacity: 0.4;
  filter: grayscale(100%);
}

.vertical-button {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  color: var(--dark);
  background: var(--lightOrange);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  padding: .5em;
  margin-left: 1em;
  margin-top: 1em;
  margin-bottom: 7rem;
  font-size: 1.2rem;
  font-weight: 400;
  transform: rotate(180deg);
}


/* Active state */
.vertical-button.active {
  background: var(--orange);
}

/* Hover for inactive buttons */
.vertical-button:not(.active):hover {
  background: var(--orange);
}

/* Hover for active buttons (optional slight darken) */
.vertical-button.active:hover {
  filter: brightness(0.9);
}

.horizontal-timeline {
  display: flex;
  align-items: flex-start;
  margin-top: 10vh;
  position: relative;
  z-index: auto;
}

.label-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-right: 20px;
  position: relative;
  z-index: 1;
}

.label-container.faded {
  opacity: 0;
  pointer-events: none;   /* let your mouse go “through” it */
}

.scroll-container {
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: 20px;
  gap: 20px;
  position: relative;
  z-index: auto;
}

.date-column {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 240px;
}

.timeline-item {
  position: relative;
  width: 240px;
  transition: opacity .2s ease, filter 0.2s ease;
  z-index: 0;
}

.timeline-item.hovered {
  position: relative;
  z-index: 2;   /* above the label-container which is at z-index:1 */
}

.button-item {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
}

.faded {
  opacity: 0;
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
  z-index: -1;
}


.hover-year {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 4vw;
  color: var(--purple);
  padding: 0.2em 0.5em;
  border-radius: 4px;
  pointer-events: none; /* so clicks still hit the image */
  z-index: 1;            /* above the background but below cards */
}

</style>



