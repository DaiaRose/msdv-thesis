<!-- src/pages/CurrentlyInclude.vue -->
<template>
    <div class="currently-statement">
      <p>
        Currently, 30 states and DC require sex education, either explicitly by law or via enforced state standards.
        Independently, 10 states have policies that include affirming sexual orientation instruction on LGBTQ identities
        or discussion of sexual health for LGBTQ youth. 4 states explicitly require instruction that discriminates against LGBTQ people.
      </p>
      <p>
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
    </p>
    <div class="nextbutton-item">
          <button @click="goToNextPage">Go to Next Page</button>
        </div>
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
  }
};
</script>

<style scoped>

.currently-statement {
  color: var(--dark, #342E38);
  font-family: "Times New Roman";
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: 75px;
  margin-left: 30px;
  margin-right: 30px;
}

.inline-button {
  display: inline-block;
  color: var(--dark, #342E38);
  padding: 0px 10px;
  text-decoration: none;
  border-radius: 15px;
  background: var(--light-orange, #FFC0A5);
  cursor: pointer;
  line-height: 1;
}

.inline-button:hover {
  background: var(--orange, #F99368);
}

.el-dropdown-link {
  color: var(--dark, #342E38);
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
  background: #D1B3E2;
  cursor: pointer;
  line-height: 1;
}

.number-box {
  margin-left: 5px;
}
</style>