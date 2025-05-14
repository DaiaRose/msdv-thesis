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
              title: "Oklahoma: HB 1476"
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
              abbr: "MS",
              tooltip: "(e) Teaches the current state law related to sexual conduct, including forcible rape, statutory rape, paternity establishment, child support and homosexual activity; and (f) Teaches that a mutually faithful, monogamous relationship in the context of marriage is the only appropriate setting for sexual intercourse.",
              title: "Mississippi: HB 1304"
            }
          ]
        },
        1991: { showLabel: true, states: [{ abbr: "TX", tooltip: "text is not searchable", title: "Texas: HB 949" }] },
        2000: { showLabel: true },
        2010: { showLabel: true },
        2022: {
          showLabel: true,
          states: [
            {
              abbr: "AL",
              tooltip: "An individual or group of individuals providing classroom instruction to students in kindergarten through the fifth grade at a public K-12 school shall not engage in classroom discussion or provide classroom instruction regarding sexual orientation or gender identity in a manner that is not age appropriate or developmentally appropriate for students in accordance with state standards.",
              title: "Alabama: HB 322"
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
            { abbr: "AR",
              tooltip: "Before grade five (5), a public school teacher shall not provide classroom instruction on the following topics: 1) Sexually explicit materials; 2) Sexual reproduction; 3) Sexual intercourse; 4) Gender identity; 5) Sexual orientation.",
              title: "Arkansas: SB 294"
            },
            { abbr: "FL", 
            tooltip: "Prohibiting classroom instruction on sexual orientation or gender identity from occurring in prekindergarten through grade 8.", 
            title: "Florida: HB 1069 (preK-8)" },
            { abbr: "FL", tooltip: " Shall not intentionally provide classroom instruction to students in grades 4 through 12 on sexual orientation or gender identity unless such instruction is either expressly required by state academic standards as adopted in Rule 6A-1.09401, F.A.C., or is part of a reproductive health course or health lesson for which a student’s parent has the option to have his or her student not attend",
             title: "Florida - Board of Education Rules 6A-10.081" },
            { abbr: "IN", tooltip: "A school, an employee or staff member of a school, or a third party vendor used by a school to provide instruction may not provide any instruction to a student in prekindergarten through grade 3 on human sexuality.",
             title: "Indiana: HB 1608" },
            { abbr: "IA", tooltip: "A school district shall not provide any program, curriculum, test, survey, questionnaire, promotion, or instruction relating to gender identity or sexual orientation to students in kindergarten through grade six.",
            title: "Iowa: SF 496" },
            { abbr: "KY", tooltip: "Children in grade five (5) and below do not receive any instruction through curriculum or programs on human sexuality or sexually transmitted diseases; or 2. Any child, regardless of grade level, enrolled in the district does not receive any instruction or presentation that has a goal or purpose of students studying or exploring gender identity, gender expression, or sexual orientation; and (e) A policy to notify a parent in advance and obtain the parent's written consent before the parent's child in grade six (6) or above receives any instruction through curriculum or programs on human sexuality or sexually transmitted diseases authorized in this section.",
             title: "Kentucky: SB 150" },
            { abbr: "NC", tooltip: "Instruction on gender identity, sexual activity, or sexuality shall not be included in the curriculum provided in grades kindergarten through fourth grade, regardless of whether the information is provided by school personnel or third parties.",
             title: "North Carolina: S 49" }
          ]
        },
        2024: { showLabel: true, states: [{ abbr: "LA", tooltip: "To enact R.S. 17:412, relative to public school teachers, personnel, and students; to provide relative to discussion of sexual orientation or gender identity with students; to prohibit teachers and others from discussing their sexual orientation or gender identity with students; and to provide for related matters.", title: "Louisiana: HB 122" }] },
        2025: { 
          showLabel: true, 
          states: 
          [{ abbr: "OH", 
          tooltip: "No school district or third party acting on behalf of a district shall provide instruction that includes sexuality content to students in grades kindergarten through three. “Sexuality content“ means any oral or written instruction, presentation, image, or description of sexual concepts or gender ideology provided in a classroom setting.", 
          title: "Ohio: HB 8" },
          { abbr: "WV", 
          tooltip: "requiring a public school employee to report a student's request for an accommodation that is intended to affirm the student's gender identity from a person employed by the public school to an administrator employed by the county board and assigned to the school", 
          title: "West Virginia: SB 154" }] }
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
      // this.$router.push({ name: 'WHY' });
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
