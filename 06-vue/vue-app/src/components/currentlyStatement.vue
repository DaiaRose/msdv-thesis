<!-- src/components/CurrentlyStatement.vue -->
<template>
  <div class="currently-statement">
    <p>
      Currently, there are 9 states in which State law explicitly censors discussions 
      of LGBTQ people or issues throughout all school curricula with “Don’t Say Gay” 
      laws affecting various grade levels. These bills, enacted between 
      spring of 2022 and Jan 8, 2025 represent a resurgence of anti-LGBTQ censorship 
      that dates back to the late 1980s amid the HIV/AIDS crisis. 
      Those old style “No Promo Homo” laws are still on the books in 4 states. 
      In <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          the United States  <i class="el-icon-arrow-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-item command="option1">Alabama</el-dropdown-item>
          <el-dropdown-item command="option2">Arkansas</el-dropdown-item>
          <el-dropdown-item command="option3">Florida</el-dropdown-item>
          <el-dropdown-item command="option4">Indiana</el-dropdown-item>

        </template>
      </el-dropdown> there are 1,994,000 LGBT youth whose lives are impacted.
    </p>
    <!-- You can add additional HTML as required -->
  </div>
</template>

<script>
export default {
  name: "TextPage",
  methods: {
    handleCommand(command) {
      console.log("Selected:", command);
      // You can take further action depending on the selected option.
    },
  },
};
</script>

<style scoped>
.currently-statement {
  color: var(--dark, #342E38);
  font-family: "Times New Roman";
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: 70px;
}
</style>

