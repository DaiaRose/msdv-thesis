<!-- src/pages/CensorLaws.vue -->
<template>
    <div class="censor-laws">
      <header class="page-header">
      <p class="currently-statement">Still on the books.</p>
    </header>
    <!-- Navigation button timeline item -->
    <button class="next-button" @click="goToNextPage">
      Why does this matter?
    </button>

    <!-- Timeline Section -->
    <div class="timeline">
      <div class="timeline-container">
        <div
          v-for="marker in markers"
          :key="marker.year"
          class="tick"
          :class="{ tight: marker.tight }"
        >
          <!-- Display multiple state abbreviations if provided -->
          <div v-if="marker.states" class="states-container">
            <div v-for="(state, idx) in marker.states" :key="idx" class="state">
              <span class="state-abbr clickable" @click="openDialog(state)">
                {{ state.abbr }}
              </span>
            </div>
          </div>
          <!-- Tick rectangle -->
          <div class="rect"></div>
          <!-- Year label -->
          <div class="year" v-if="marker.showLabel">{{ marker.year }}</div>
        </div>
      </div>

      <!-- Center screen dialog for details -->
      <el-dialog
        v-model="dialogVisible"
        :title="dialogTitle"
        width="60%"
        top="30vh" 
        :close-on-click-modal="true"
        custom-class="law-quote-dialog"
        :show-close="false"
        :modal="false"
      >
        <p>{{ dialogContent }}</p>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "CensorLaws",
  data() {
    return {
      showIntro: true,    // controls visibility of the panel
      // Generate base years 1987–2025 with default showLabel false
      baseYears: Array.from({ length: 2025 - 1987 + 1 }, (_, i) => ({
        year: 1987 + i,
        showLabel: false
      })),
      // Override only years that need custom labels or state data
      overrides: {
        1987: {
          showLabel: true,
          states: [
            {
              abbr: "OK",
              tooltip: "1. engaging in homosexual activity, promiscuous sexual activity, intravenous drug use or contact with contaminated blood products is now known to be primarily responsible for contact with the AIDS virus; 2. avoiding the activities specified in paragraph 1 of this subsection is the only method of preventing the spread of the virus;",
              title: "Oklahoma – Bill Name"
            },
            {
              abbr: "LA",
              tooltip: "No sex education course offered in the public schools of the state shall utilize any sexually explicit materials depicting male or female homosexual activity.",
              title: "Louisiana: HB484"
            }
          ]
        },
        1988: {
          showLabel: true,
          states: [
            {
              abbr: "MI",
              tooltip: "(e) Teaches the current state law related to sexual conduct, including forcible rape, statutory rape, paternity establishment, child support and homosexual activity; and (f) Teaches that a mutually faithful, monogamous relationship in the context of marriage is the only appropriate setting for sexual intercourse.",
              title: "Michigan – Bill Name"
            }
          ]
        },
        1991: { showLabel: true, states: [{ abbr: "TX", tooltip: "unknown", title: "Texas – Bill Name" }] },
        2000: { showLabel: true },
        2010: { showLabel: true },
        2022: {
          showLabel: true,
          states: [
            {
              abbr: "AL",
              tooltip: "An individual or group of individuals providing classroom instruction to students in kindergarten through the fifth grade at a public K-12 school shall not engage in classroom discussion or provide classroom instruction regarding sexual orientation or gender identity in a manner that is not age appropriate or developmentally appropriate for students in accordance with state standards.",
              title: "Alabama – Bill Name"
            },
            {
              abbr: "FL",
              tooltip: "Prohibiting a school district from encouraging classroom discussion about sexual orientation or gender identity in primary grade levels or in a specified manner.",
              title: "Florida - HB 1557 (K-3)"
            }
          ]
        },
        2023: {
          showLabel: true,
          states: [
            {
              abbr: "AR",
              tooltip: "Before grade five (5), a public school teacher shall not provide classroom instruction on the following topics: 1) Sexually explicit materials; 2) Sexual reproduction; 3) Sexual intercourse; 4) Gender identity; 5) Sexual orientation.",
              title: "Arkansas – Bill Name"
            },
            { abbr: "FL", tooltip: "Prohibiting classroom instruction on sexual orientation or gender identity from occurring in prekindergarten through grade 8.", title: "Florida: HB 1069 (preK-8)" },
            { abbr: "FL", tooltip: "Florida details", title: "Florida - Board of Education Rules 6A-10.081" },
            { abbr: "IN", tooltip: "Indiana details", title: "Indiana – Bill Name" },
            { abbr: "IA", tooltip: "Iowa details", title: "Iowa – Bill Name" },
            { abbr: "KY", tooltip: "Kentucky details", title: "Kentucky – Bill Name" },
            { abbr: "NC", tooltip: "North Carolina details", title: "North Carolina – Bill Name" }
          ]
        },
        2024: { showLabel: true, states: [{ abbr: "LA", tooltip: "Louisiana details", title: "Louisiana – Bill Name" }] },
        2025: { showLabel: true, states: [{ abbr: "OH", tooltip: "No school district or third party acting on behalf of a district shall provide instruction that includes sexuality content to students in grades kindergarten through three. “Sexuality content“ means any oral or written instruction, presentation, image, or description of sexual concepts or gender ideology provided in a classroom setting.", title: "Ohio: HB 8" }] }
      },
      // Dialog state
      dialogVisible: true,
      dialogTitle: "Click a state on the timeline to view a quote from their legislature.",
      dialogContent: "Notice how the language for recent “Don't Say Gay“ laws compares to older “No Promo Homo“ laws.",
    };
  },
  computed: {
    markers() {
      return this.baseYears.map(marker => {
        // merge in any overrides...
        const merged = this.overrides[marker.year]
          ? { ...marker, ...this.overrides[marker.year] }
          : marker;
        // flag ticks from 1993–2019
        merged.tight = marker.year >= 1993 && marker.year <= 2019;
        return merged;
      });
    }
  },
  methods: {
    openDialog(state) {
      this.dialogContent = state.tooltip;
      this.dialogTitle = state.title;
      this.dialogVisible = true;
    },
    goToNextPage() {
      this.$router.push({ name: 'FaceGridIntroPage' });
    }
  }
};
</script>
<!-- Scoped page & component styles -->
<style scoped>
/* Page header */
.page-header {
  padding: 1.5rem 1rem;
}

/* Overall layout */
.censor-laws {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Content area */
.content {
  flex: 1;
  padding: 20px;
}

/* Next‑page button */
.next-button {
  position: absolute;
  top: 40px;
  right: 30px;
  z-index: 10;
}

/* Timeline wrapper */
.timeline {
  margin-top: auto;
  padding: 60px 10px;
}

/* Evenly spaced ticks */
.timeline-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 130px;
}
.tick {
  flex: 1;
  position: relative;
  height: 100%;
}
.tick.tight {
  flex: 0.5;
}

/* Tick mark */
.rect {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 20px;
  background-color: var(--purple);
}

/* Year label under tick */
.year {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%) rotate(-90deg);
  font-size: 1.7rem;
  white-space: nowrap;
}

/* State‑abbr stack above tick */
.states-container {
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.state-abbr {
  padding: 0 12px;
  font-size: 1.5rem;
  line-height: 3rem;
  font-weight: 600;
  color: var(--dark);
  background-color: var(--lightOrange);
  border-radius: var(--border-radius);
  cursor: pointer;
  text-align: center;
}
.state-abbr:hover {
  background-color: var(--orange);
}
</style>

<!-- Global overrides & keyframes -->
<style>
/* Dialog styling */
.law-quote-dialog {
  border-radius: var(--border-radius);
  background: var(--lilac);
}

.law-quote-dialog .el-dialog__header {
  /* increase top padding (default is 15px 20px) */
  padding: 30px 20px 0;  /* top 30px, right/left 20px, bottom 0 */
}

.law-quote-dialog .el-dialog__header .el-dialog__title{
  font-size: 2rem;
  font-weight: bold;
  color: var(--dark);
}
.law-quote-dialog .el-dialog__body {
  font-size: 2rem;
  line-height: 1.5;
  word-break: normal;
  overflow-wrap: break-word;
  white-space: normal;
}

/* Intro keyframe  */
@keyframes zoom-from-top-in {
  from {
    transform: translate(-50%, -100px) scale(0);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0) scale(1);
    opacity: 1;
  }
}
</style>
