<!-- src/pages/CensorLaws.vue -->
<template>
    <div class="censor-laws">
      <!-- Main Content -->
      <div class="content">
        <h1>Censorship Laws Page</h1>
      </div>
       <!-- Navigation button timeline item -->
       <div class="nextbutton-item">
          <button @click="goToNextPage">Go to Next Page</button>
        </div>
    
      <!-- Timeline Section -->
      <div class="timeline">
        <div class="timeline-container">
          <div v-for="marker in markers" :key="marker.year" class="tick">
            <!-- Display multiple state abbreviations if provided -->
            <div v-if="marker.states" class="states-container">
              <div v-for="(state, index) in marker.states" :key="index" class="state">
                <!-- Make the state abbreviation clickable -->
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
        // Define your markers with the option to include multiple states and conditional year labels.
        markers: [
          { year: 1987, showLabel: true, states: [
            { abbr: "OK", tooltip: "1. engaging in homosexual activity, promiscuous sexual activity, intravenous drug use or contact with contaminated blood products is now known to be primarily responsible for contact with the AIDS virus; 2. avoiding the activities specified in paragraph 1 of this subsection is the only method of preventing the spread of the virus;", title: " state name and also bill name" },
            { abbr: "LA", tooltip: " No sex education course offered in the public schools of the state shall utilize any sexually explicit materials depicting male or female homosexual activity.", title: " state name and also bill name" }
          ] },
          { year: 1988, showLabel: true, states: [
            { abbr: "MI", tooltip: "(e) Teaches the current state law related to sexual conduct, including forcible rape, statutory rape, paternity establishment, child support and homosexual activity; and (f) Teaches that a mutually faithful, monogamous relationship in the context of marriage is the only appropriate setting for sexual intercourse.", title: " state name and also bill name" },
          ] },
          { year: 1989, showLabel: false },
          { year: 1990, showLabel: false },
          { year: 1991, showLabel: true, states: [
              { abbr: "TX", tooltip: "unknown", title: " state name and also bill name" },
          ] },
          { year: 1992, showLabel: false },
          { year: 1993, showLabel: false },
          { year: 1994, showLabel: false },
          { year: 1995, showLabel: false },
          { year: 1996, showLabel: false },
          { year: 1997, showLabel: false },
          { year: 1998, showLabel: false },
          { year: 1999, showLabel: false },
          { year: 2000, showLabel: true },
          { year: 2001, showLabel: false },
          { year: 2002, showLabel: false },
          { year: 2003, showLabel: false },
          { year: 2004, showLabel: false },
          { year: 2005, showLabel: false },
          { year: 2006, showLabel: false },
          { year: 2007, showLabel: false },
          { year: 2008, showLabel: false },
          { year: 2009, showLabel: false },
          { year: 2010, showLabel: true },
          { year: 2011, showLabel: false },
          { year: 2012, showLabel: false },
          { year: 2013, showLabel: false },
          { year: 2014, showLabel: false },
          { year: 2015, showLabel: false },
          { year: 2016, showLabel: false },
          { year: 2017, showLabel: false },
          { year: 2018, showLabel: false },
          { year: 2019, showLabel: false },
          { year: 2020, showLabel: false },
          { year: 2021, showLabel: false },
          { year: 2022, showLabel: true, states: [
              { abbr: "AL", tooltip: " An individual or group of individuals providing classroom instruction to students in kindergarten through the fifth grade at a public K-12 school shall not engage in classroom discussion or provide classroom instruction regarding sexual orientation or gender identity in a manner that is not age appropriate or developmentally appropriate for students in accordance with state standards.", title: " state name and also bill name" },
              { abbr: "FL", tooltip: "prohibiting a school district from encouraging classroom discussion about sexual orientation or gender identity in primary grade levels or in a specified manner", title: " state name and also bill name" },
          ]  },
          { year: 2023, showLabel: true, states: [
              { abbr: "AR", tooltip: "Before grade five (5), a public school teacher shall not provide 6 classroom instruction on the following topics: 7 (1) Sexually explicit materials; 8 (2) Sexual reproduction; 9 (3) Sexual intercourse; 10 (4) Gender identity; or 11 (5) Sexual orientation.", title: " state name and also bill name" },
              { abbr: "FL", tooltip: "prohibiting classroom instruction on sexual orientation or gender identity from occurring in prekindergarten through grade 8", title: " state name and also bill name" },
              { abbr: "FL", tooltip: "Florida details", title: " state name and also bill name" },
              { abbr: "IN", tooltip: "Indiana details", title: " state name and also bill name" },
              { abbr: "IA", tooltip: "Iowa details", title: " state name and also bill name" },
              { abbr: "KY", tooltip: "Kentucky details", title: " state name and also bill name" },
              { abbr: "NC", tooltip: "North Carolina details", title: " state name and also bill name" },
          ]  },
          { year: 2024, showLabel: true, states: [
              { abbr: "LA", tooltip: "Louisiana details", title: " state name and also bill name" },
          ]  },
          { year: 2025, showLabel: true, states: [
              { abbr: "OH", tooltip: "Ohio details", title: " state name and also bill name" },
          ]  },
        ],
        dialogVisible: false,
        dialogContent: "",
        dialogTitle: "Details"
      };
    },
    methods: {
      openDialog(state) {
      this.dialogContent = state.tooltip;
      this.dialogTitle = state.title;
      this.dialogVisible = true;
      },

      goToNextPage() {
      this.$router.push({ name: 'FaceGridPage' });
      },
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

  /* Place the states container at the top center of each tick */
  .states-container {
    position: absolute;
    bottom: 42px; /* adjust as needed */
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;       /* stack vertically */
    justify-content: flex-end;     /* align items to the bottom */
    align-items: center;
  }


  .state-abbr {
    margin: 3px 3px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    display: block;
    text-align: center;
  }
    
  /* Timeline styling */
  .timeline {
    padding: 60px 10px;
  }
    
  /* Evenly space ticks across the available width */
  .timeline-container {
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 130px; /* adjust as needed */
  }

  /* Each tick now has a fixed height */
  .tick {
    flex: 1;
    position: relative;
    height: 100%;
  }
      
  .rect {
    position: absolute;
    bottom: 20px; /* fix the vertical position of the tick */
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 20px;
    background-color: purple;
  }

  /* Position the year label at the very bottom, rotated */
  .year {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%) rotate(-90deg);
    font-size: 20px;
    white-space: nowrap;
  }

</style>

<style>
/* dialog box */
.law-quote-dialog {
    border-radius: 15px;
    background: var(--light, #D1B3E2);             
  }

  .law-quote-dialog .el-dialog__header {
    font-size: 18px;
    font-weight: bold;
  }

  .law-quote-dialog .el-dialog__body {
    font-size: 14px;
    line-height: 1.5;
  }

  .law-quote-dialog .el-dialog__footer {
    text-align: right;
    padding: 10px;
  }
  </style>
