<template>
  <div class="impact-page">
    <p class="currently-statement">
      Increasing the percentage of schools with LGBTQ-Inclusive Sex Ed is associated with fewer reports of
      <el-dropdown 
        ref="dropdown"
        trigger="click" 
        @command="handleCommand"
        @visible-change="onVisibleChange"
        :popper-append-to-body="true"
      >
        <span class="el-dropdown-link styled-box" tabindex="0">
          {{ dropdownLabelMap[selectedOption] }} <i class="el-icon-arrow-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-item
            v-for="(label, key) in dropdownLabelMap"
            :key="key"
            :command="key"
          >
            {{ label }}
          </el-dropdown-item>
        </template>
      </el-dropdown>
      among<span class="styled-box group-box">{{ affectedGroup }}</span>
    </p>

    <div class="fixed-grid-container">
      <ImpactFaces :groups="currentGroups" />
    </div>
    <button class="invisible-home-button" @click="goHome"></button>
  </div>
</template>

<script>
import ImpactFaces from "@/components/ImpactFaces.vue";

export default {
  components: { ImpactFaces },
  data() {
    return {
      dropdownLabelMap: {
        bullying: "Bullying",
        depression: "Depressive Symptoms",
        suicide: "Suicide Plans"
      },
      selectedOption: "bullying",
      affectedGroup: "gay and lesbian youth.",
      allGroups: {
        bullying: [
          { id: "hetero", label: "Heterosexual Youth", baselineRate: 0.168, oddsRatioPer10: 1.0, headManifestKey: "allPeeps", faceManifestKey: "facePeeps" },
          { id: "gay", label: "Gay/Lesbian Youth", baselineRate: 0.346, oddsRatioPer10: 0.83, headManifestKey: "allPeeps", faceManifestKey: "facePeeps" },
          { id: "bi", label: "Bisexual Youth", baselineRate: 0.342, oddsRatioPer10: 1.0, headManifestKey: "allPeeps", faceManifestKey: "facePeeps" },
        ],
        depression: [
          { id: "hetero", label: "Heterosexual Youth", baselineRate: 0.246, oddsRatioPer10: 0.86, headManifestKey: "allPeeps", faceManifestKey: "facePeeps" },
          { id: "gay", label: "Gay/Lesbian Youth", baselineRate: 0.538, oddsRatioPer10: 0.86, headManifestKey: "allPeeps", faceManifestKey: "facePeeps" },
          { id: "bi", label: "Bisexual Youth", baselineRate: 0.628, oddsRatioPer10: 0.79, headManifestKey: "allPeeps", faceManifestKey: "facePeeps" },
        ],
        suicide: [
          { id: "hetero", label: "Heterosexual Youth", baselineRate: 0.106, oddsRatioPer10: 0.79, headManifestKey: "allPeeps", faceManifestKey: "facePeeps" },
          { id: "gay", label: "Gay/Lesbian Youth", baselineRate: 0.303, oddsRatioPer10: 0.79, headManifestKey: "allPeeps", faceManifestKey: "facePeeps" },
          { id: "bi", label: "Bisexual Youth", baselineRate: 0.393, oddsRatioPer10: 0.79, headManifestKey: "allPeeps", faceManifestKey: "facePeeps" },
        ]
      }
    };
  },
  computed: {
    currentGroups() {
      return this.allGroups[this.selectedOption] || [];
    }
  },
  methods: {
    goHome() {
    this.$router.push({ name: 'Home' }); // Ensure your router has this route name
    },
    handleCommand(command) {
      this.selectedOption = command;
      this.affectedGroup =
        command === "bullying" ? "gay and lesbian youth." : "all youth.";
    },
    onVisibleChange(isVisible) {
      if (!isVisible) {
        // Return focus to the dropdown trigger to avoid hidden focus warnings
        this.$refs.dropdown.$el
          .querySelector('.el-dropdown-link')
          .focus();
      }
    }
  }
};
</script>

<style scoped>

.invisible-home-button {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1000;
}


.impact-page {
  margin-top: 2vh;
  font-family: sans-serif;
  width: 100vw;
  overflow: hidden;
}

.currently-statement {
  color: var(--dark);
  font-size: 4vw;
  line-height: 1.2;
  overflow: visible;
  position: relative;
  z-index: 2;
}

.el-dropdown-link.styled-box {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--border-radius);
  background: var(--lightOrange);
  color: var(--dark);
  cursor: pointer;
  line-height: 1;
  position: relative;
  z-index: 3;
}
.el-dropdown-link.styled-box:hover {
  background: var(--orange);
}

.group-box {
  background-color: var(--lightBlue);
}

.fixed-grid-container {
  position: fixed; /* Add this line */
  top: 240px;       /* Was 180px – adjust for lower placement */
  bottom: 40px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}



</style>

  

