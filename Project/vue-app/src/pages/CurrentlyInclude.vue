<!-- src/pages/CurrentlyInclude.vue -->
<template>
  <div class="page-wrapper">
    <p class="currently-statement">
        Currently, 30 states and DC require sex education, either explicitly by law or via enforced state standards.
        Independently, 10 states have policies that include affirming sexual orientation instruction on LGBTQ identities
        or discussion of sexual health for LGBTQ youth. 4 states explicitly require instruction that discriminates against LGBTQ people.
        Student reports of their sex ed experience in
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link styled-box">
            {{ selectedOption }} <i class="el-icon-arrow-down"></i>
          </span>
          <template #dropdown>
            <el-dropdown-item command="middle">middle</el-dropdown-item>
            <el-dropdown-item command="high">high</el-dropdown-item>
            <el-dropdown-item command="public">public</el-dropdown-item>
            <el-dropdown-item command="private (non religious)">private (non religious)</el-dropdown-item>
            <el-dropdown-item command="religious">religious</el-dropdown-item>
            <el-dropdown-item command="urban">urban</el-dropdown-item>
            <el-dropdown-item command="suburban">suburban</el-dropdown-item>
            <el-dropdown-item command="rural / small town">rural / small town</el-dropdown-item>
            <el-dropdown-item command="northeastern US">northeastern US</el-dropdown-item>
            <el-dropdown-item command="southern US">southern US</el-dropdown-item>
            <el-dropdown-item command="midwestern US">midwestern US</el-dropdown-item>
            <el-dropdown-item command="western US">western US</el-dropdown-item>
          </template>
        </el-dropdown>
        schools having affirming LGBTQ inclusion increased
        <span class="styled-box number-box">{{ increaseAmount }}%</span> from
        <span class="styled-box number-box">{{ value2017 }}%</span> in 2017 to
        <span class="styled-box number-box">{{ value2021 }}%</span> in 2021.
      <button 
      v-if="buttonShow"
      class="next-button"
      @click="goToNextPage"> What impact does inclusion have? 
      </button>
    </p>
  </div>
</template>

<script>
export default {
  name: "CurrentlyInclude",
  data() {
    return {
      selectedOption: "__________",
      value2017: "___",
      value2021: "___",
      increaseAmount: "___",
      dataset: {
        "middle": { 2017: 5.6, 2021: 12.2 },
        "high": { 2017: 7.1, 2021: 10.0 },
        "public": { 2017: 6.4, 2021: 10.0 },
        "private (non religious)": { 2017: 14.1, 2021: 19.9 },
        "religious": { 2017: 3.0, 2021: 6.2 },
        "urban": { 2017: 9.0, 2021: 13.9 },
        "suburban": { 2017: 7.0, 2021: 10.9 },
        "rural / small town": { 2017: 4.8, 2021: 7.4 },
        "northeastern US": { 2017: 11.9, 2021: 14.2 },
        "southern US": { 2017: 1.9, 2021: 4.4 },
        "midwestern US": { 2017: 5.5, 2021: 7.1 },
        "western US": { 2017: 10.6, 2021: 18.0 }
      }
    };
  },
  methods: {
    handleCommand(command) {
      this.selectedOption = command;
      const data = this.dataset[command];
      if (data) {
        const diff = (data["2021"] - data["2017"]).toFixed(1);
        this.value2017 = data["2017"].toFixed(1);
        this.value2021 = data["2021"].toFixed(1);
        this.increaseAmount = diff;
      } else {
        this.value2017 = "___";
        this.value2021 = "___";
        this.increaseAmount = "___";
      }
    },
    goToNextPage() {
      this.$router.push({ name: 'impactPage' });
    }
  },
  computed: {
  buttonShow() {
    // Button shows if a real option has been selected
    return this.selectedOption !== "__________";
  }
}

};
</script>

<style scoped>
/* uses currentlyCensor styles*/

.next-button {
  display: inline-block;
  margin-top: 1rem; /* creates space after text */
  margin-left: auto; /* push it to the right */
}

</style>