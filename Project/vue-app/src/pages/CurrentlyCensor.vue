<!-- src/pages/CurrentlyCensor.vue -->
<template>
  <div class="page-wrapper">
    <p class="currently-statement">
      Currently, there are 9 states in which state law explicitly restricts discussions 
      of LGBTQ people or issues throughout school curricula with 
      <router-link to="/CensorLaws" class="inline-button">“Don’t Say Gay”</router-link>
      laws affecting various grade levels. These laws, enacted between 
      spring of 2022 and Jan 8, 2025 represent a resurgence of anti-LGBTQ censorship 
      that dates back to the late 1980s amid the AIDS crisis. 
      Those old style <router-link to="/CensorLaws" class="inline-button">“No Promo Homo”</router-link> laws are still on the books in 4 states. 
      In 
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link styled-box">
          {{ selectedOption }} <i class="el-icon-arrow-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-item
            v-for="(count, state) in dataset"
            :key="state"
            :command="state"
          >
            {{ state }}
          </el-dropdown-item>
        </template>
      </el-dropdown> there are 
      <span class="styled-box number-box">{{ formattedImpactedYouth }}</span>
      LGBT youth impacted by anti-LGBTQ curricular laws today.
    </p>
  </div>
</template>

<script>
export default {
  name: "CurrentlyStatement",
  data() {
    return {
      selectedOption: "the United States",
      impactedYouth: 1994000,
      dataset: {
        "the United States": 1994000,
        "Alabama": 30000,
        "Arkansas": 19000,
        "Florida": 114000,
        "Indiana": 43000,
        "North Carolina": 63000,
        "Louisiana": 29000,
        "Ohio": 72000,
        "Mississippi": 19000,
        "Oklahoma": 25000,
        "Texas": 195000
      }
    };
  },
  computed: {
    formattedImpactedYouth() {
      return this.impactedYouth.toLocaleString();
    }
  },
  methods: {
    handleCommand(command) {
      this.selectedOption = command;
      this.impactedYouth = this.dataset[command] || 0;
    }
  }
};
</script>

<style>

.page-wrapper {
  overflow: hidden;
  margin: 15px;
}


.currently-statement {
  color: var(--dark);
  font-size: 4vw;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  margin-left: 3vw;
  margin-right: 2.5vw;
  margin-top: 0vw;
  margin-bottom: 0vw;
  align-items: center;
  position: relative;
}

.inline-button {
  display: inline-block;
  color: var(--dark);
  padding: 8px 10px 1px 10px;
  text-decoration: none;
  border-radius: var(--border-radius);
  background: var(--lightOrange);
  cursor: pointer;
  line-height: 1;
}

.inline-button:hover {
  background: var(--orange);
}

.el-dropdown-link {
  color: var(--dark);
  vertical-align: baseline;
  font-size: 4vw;
  font-weight: 400;
  margin-bottom: 0px;
  cursor: pointer;
  position: relative;
}

.styled-box {
  display: inline-block;
  padding: 0 10px;
  border-radius: var(--border-radius);
  background: var(--lilac);
  cursor: pointer;
  line-height: 1.3;
}

.number-box {
  margin-left: 5px;
}
</style>

