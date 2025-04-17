<!-- src/pages/CurrentlyStatement.vue -->
<template>
  <div class="currently-statement">
    <p>
      Currently, there are 9 states in which State law explicitly censors discussions 
      of LGBTQ people or issues throughout all school curricula with <router-link to="/CensorLaws" class="inline-button">“Don’t Say Gay” </router-link>
      laws affecting various grade levels. These laws, enacted between 
      spring of 2022 and Jan 8, 2025 represent a resurgence of anti-LGBTQ censorship 
      that dates back to the late 1980s amid the HIV/AIDS crisis. 
      Those old style <router-link to="/CensorLaws" class="inline-button">“No Promo Homo” </router-link> laws are still on the books in 4 states. 
      In <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ selectedOption }} <i class="el-icon-arrow-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-item command="Alabama">Alabama</el-dropdown-item>
          <el-dropdown-item command="Arkansas">Arkansas</el-dropdown-item>
          <el-dropdown-item command="Florida">Florida</el-dropdown-item>
          <el-dropdown-item command="Indiana">Indiana</el-dropdown-item>
          <el-dropdown-item command="Arkansas">Arkansas</el-dropdown-item>
          <el-dropdown-item command="Florida">Florida</el-dropdown-item>
          <el-dropdown-item command="North Carolina">North Carolina</el-dropdown-item>
          <el-dropdown-item command="Louisiana">Louisiana</el-dropdown-item>
          <el-dropdown-item command="Ohio">Ohio</el-dropdown-item>
          <el-dropdown-item command="Mississippi">Mississippi</el-dropdown-item>
          <el-dropdown-item command="Oklahoma">Oklahoma</el-dropdown-item>
          <el-dropdown-item command="Texas">Texas</el-dropdown-item>
          <el-dropdown-item command="the United States">the United States</el-dropdown-item>

        </template>
      </el-dropdown> there are 1,994,000 LGBT youth impacted by anti-LGBTQ curricular laws today.
    </p>
    <!-- You can add additional HTML as required -->
  </div>
</template>

<script>
export default {
  name: "TextPage",
  data() {
    return {
      // This will hold the currently selected option text.
      selectedOption: "the United States"
    };
  },
  methods: {
    handleCommand(command) {
      // Update the selectedOption when a dropdown item is clicked.
      this.selectedOption = command;
      console.log("Selected:", command);
    }
  }
};
</script>

<style scoped>

.text-page {
  padding: 20px;
}

.currently-statement {
  color: var(--dark, #342E38);
  font-family: "Times New Roman";
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: 70px;
  /* background-color: blueviolet; */
}

/* Style the router-links like buttons */
.inline-button {
  display: inline-block;
  color: var(--dark, #342E38);
  padding: 5px 10px;
  margin: 0 5px;
  text-decoration: none;
  border-radius: 15px;
  background: var(--light-orange, #FFC0A5);
  cursor: pointer;
}

.inline-button:hover {
  background: var(--orange, #F99368);
}


.el-dropdown-link {
  color: var(--dark, #342E38);
  font-family: "Times New Roman";
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: 70px;
  cursor: pointer;
  margin: 0 5px;
}

</style>