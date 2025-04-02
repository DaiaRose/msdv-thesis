<!-- src/components/CensorLaws.vue -->
<template>
    <div class="censor-laws">
      <!-- Main Content -->
      <div class="content">
        <h1>Censorship Laws Page</h1>
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
            title="Details"
            width="50%"
            :close-on-click-modal="true"
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
            { abbr: "OK", tooltip: "Oklahoma details" },
            { abbr: "LA", tooltip: "Louisiana details" }
          ] },
          { year: 1988, showLabel: true, states: [
            { abbr: "MI", tooltip: "Michigan details" },
          ] },
          { year: 1989, showLabel: false },
          { year: 1990, showLabel: false },
          { year: 1991, showLabel: true, states: [
              { abbr: "TX", tooltip: "Texas details" },
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
          { year: 2010, showLabel: false },
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
              { abbr: "AL", tooltip: "Alabama details" },
              { abbr: "FL", tooltip: "Florida details" },
          ]  },
          { year: 2023, showLabel: true, states: [
              { abbr: "AR", tooltip: "Arkansas details" },
              { abbr: "FL", tooltip: "Florida details" },
              { abbr: "FL", tooltip: "Florida details" },
              { abbr: "IN", tooltip: "Indiana details" },
              { abbr: "IA", tooltip: "Iowa details" },
              { abbr: "KY", tooltip: "Kentucky details" },
              { abbr: "NC", tooltip: "North Carolina details" },
          ]  },
          { year: 2024, showLabel: true, states: [
              { abbr: "LA", tooltip: "Louisiana details" },
          ]  },
          { year: 2025, showLabel: true, states: [
              { abbr: "OH", tooltip: "Ohio details" },
          ]  },
        ],
        dialogVisible: false,
        dialogContent: ""
      };
    },
    methods: {
      openDialog(state) {
        // When a state abbreviation is clicked, open the dialog with its tooltip text.
        this.dialogContent = state.tooltip;
        this.dialogVisible = true;
      }
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
    
  /* Timeline styling */
  .timeline {
    padding: 10px 20px;
  }
    
  /* Evenly space ticks across the available width */
  .timeline-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
  }
    
  /* Each tick takes equal space */
  .tick {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
    
  /* Container for multiple state abbreviations */
  .states-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 4px;
  }
    
  .state {
    margin: 0 2px;
  }
    
  .state-abbr {
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    display: block;
    text-align: center;
  }
    
  /* Tick rectangle styling */
  .rect {
    width: 4px;
    height: 20px;
    background-color: purple;
    margin-bottom: 10px;
  }
    
  /* Year label styling */
  .year {
    position: relative;
    left: 50%;
    transform: translateX(-50%) rotate(-90deg);
    font-size: 20px;
    white-space: nowrap;
    margin-top: 15px;
    text-align: center;
  }
  </style>
  