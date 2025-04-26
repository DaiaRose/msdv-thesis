<!-- src/pages/CensorLaws.vue -->
<template>
    <div class="censor-laws">
    <!-- Navigation button timeline item -->
    <button class="next-button" @click="goToNextPage">
      What's happening now?
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
        width="50%"
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
              title: "Louisiana – Bill Name"
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
              title: "Florida – Bill Name"
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
            { abbr: "FL", tooltip: "Prohibiting classroom instruction on sexual orientation or gender identity from occurring in prekindergarten through grade 8.", title: "Florida – Bill Name" },
            { abbr: "FL", tooltip: "Florida details", title: "Florida – Supplemental" },
            { abbr: "IN", tooltip: "Indiana details", title: "Indiana – Bill Name" },
            { abbr: "IA", tooltip: "Iowa details", title: "Iowa – Bill Name" },
            { abbr: "KY", tooltip: "Kentucky details", title: "Kentucky – Bill Name" },
            { abbr: "NC", tooltip: "North Carolina details", title: "North Carolina – Bill Name" }
          ]
        },
        2024: { showLabel: true, states: [{ abbr: "LA", tooltip: "Louisiana details", title: "Louisiana – Bill Name" }] },
        2025: { showLabel: true, states: [{ abbr: "OH", tooltip: "Ohio details", title: "Ohio – Bill Name" }] }
      },
      // Dialog state
      dialogVisible: false,
      dialogContent: "",
      dialogTitle: "Details"
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
      this.$router.push({ name: 'FaceGridPage' });
    }
  }
};
</script>
<style scoped>
/* Layout */
.censor-laws {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex: 1;
  padding: 20px;
}

/* Next-page button */
.next-button {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

/* Timeline */
.timeline {
  margin-top: auto;
  padding: 60px 10px;
}
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
.rect {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 20px;
  background-color: var(--purple);
}
.year {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%) rotate(-90deg);
  font-size: 20px;
  white-space: nowrap;
}

/* State labels */
.states-container {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.state-abbr {
  padding: 0 8px;
  margin: 0.25rem 0;
  font-size: 1.2rem;
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

<style>
/* Dialog overrides (global) */
.law-quote-dialog {
  border-radius: var(--border-radius);
  background: var(--lilac);
}
.law-quote-dialog .el-dialog__header {
  font-size: 1.2rem;
  font-weight: bold;
}
.law-quote-dialog .el-dialog__body {
  font-size: 1.2rem;
  line-height: 1.5;
}

/* Keyframes */
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

