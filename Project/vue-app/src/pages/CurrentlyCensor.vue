<!-- src/pages/CurrentlyStatement.vue -->
<template>
  <div class="currently-statement">
    <p>
      Currently, there are 9 states in which state law explicitly censors discussions 
      of LGBTQ people or issues throughout all school curricula with 
      <router-link to="/CensorLaws" class="inline-button">“Don’t Say Gay”</router-link>
      laws affecting various grade levels. These laws, enacted between 
      spring of 2022 and Jan 8, 2025 represent a resurgence of anti-LGBTQ censorship 
      that dates back to the late 1980s amid the HIV/AIDS crisis. 
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

<style scoped>

.currently-statement {
  color: var(--dark);
  font-family: "Times New Roman";
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: 75px;
  margin-left: 50px;
  margin-right: 40px;
}

.inline-button {
  display: inline-block;
  color: var(--dark);
  padding: 0px 10px;
  text-decoration: none;
  border-radius: 15px;
  background: var(--lightOrange);
  cursor: pointer;
  line-height: 1;
}

.inline-button:hover {
  background: var(--orange);
}

.el-dropdown-link {
  color: var(--dark);
  font-family: "Times New Roman";
  vertical-align: baseline;
  font-size: 60px;
  font-weight: 400;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
  top: 6px;
}

.styled-box {
  display: inline-block;
  padding: 0 10px;
  border-radius: 15px;
  background:var(--lilac);
  cursor: pointer;
  line-height: 1;
}

.number-box {
  margin-left: 10px;
}

</style>

