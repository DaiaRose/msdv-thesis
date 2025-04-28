<template>
  <div class="impact-page">
    <p class="currently-statement">
      Increasing LGBTQ-Inclusive Sex Ed is associated with fewer reports of
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link styled-box">
          {{ selectedOption }} <i class="el-icon-arrow-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-item command="bullying">Bullying</el-dropdown-item>
          <el-dropdown-item command="depression">Depressive Symptoms</el-dropdown-item>
          <el-dropdown-item command="suicide">Suicide Plans</el-dropdown-item>
        </template>
      </el-dropdown>
      among <span class="styled-box group-box">{{ affectedGroup }}</span>
    </p>

    <div class="fixed-grid-container">
      <ImpactFaces :groups="currentGroups" />
    </div>
  </div>
</template>

<script>
import ImpactFaces from "@/components/ImpactFaces.vue";

export default {
  components: { ImpactFaces },
  data() {
    return {
      selectedOption: "bullying",
      affectedGroup: "gay and lesbian youth.",
      allGroups: {
        bullying: [
          { id: "hetero", label: "Heterosexual Youth", baselineRate: 0.168, oddsRatioPer10: 1.0, headManifestKey: "gayPeeps", faceManifestKey: "facePeeps" },
          { id: "gay", label: "Gay/Lesbian Youth", baselineRate: 0.346, oddsRatioPer10: 0.83, headManifestKey: "gayPeeps", faceManifestKey: "facePeeps" },
          { id: "bi", label: "Bisexual Youth", baselineRate: 0.342, oddsRatioPer10: 1.0, headManifestKey: "gayPeeps", faceManifestKey: "facePeeps" },
        ],
        depression: [
          { id: "hetero", label: "Heterosexual Youth", baselineRate: 0.246, oddsRatioPer10: 0.86, headManifestKey: "gayPeeps", faceManifestKey: "facePeeps" },
          { id: "gay", label: "Gay/Lesbian Youth", baselineRate: 0.538, oddsRatioPer10: 0.86, headManifestKey: "gayPeeps", faceManifestKey: "facePeeps" },
          { id: "bi", label: "Bisexual Youth", baselineRate: 0.628, oddsRatioPer10: 0.79, headManifestKey: "gayPeeps", faceManifestKey: "facePeeps" },
        ],
        suicide: [
          { id: "hetero", label: "Heterosexual Youth", baselineRate: 0.106, oddsRatioPer10: 0.79, headManifestKey: "gayPeeps", faceManifestKey: "facePeeps" },
          { id: "gay", label: "Gay/Lesbian Youth", baselineRate: 0.303, oddsRatioPer10: 0.79, headManifestKey: "gayPeeps", faceManifestKey: "facePeeps" },
          { id: "bi", label: "Bisexual Youth", baselineRate: 0.393, oddsRatioPer10: 0.79, headManifestKey: "gayPeeps", faceManifestKey: "facePeeps" },
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
    handleCommand(command) {
      this.selectedOption = command;
      this.affectedGroup =
        command === "bullying" ? "gay and lesbian youth." : "all youth.";
    }
  }
};
</script>


<style scoped>
.bullying-viz {
  padding: 6rem;
  font-family: sans-serif;
  overflow: visible; /* allow overflows like the label */
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  overflow: visible; /* also allow overflow here */
}

.impact-page {
  font-family: sans-serif;
  padding: 2rem;
}

.group-box {
  background-color: var(--lightBlue);
}

.fixed-grid-container {
  position: fixed;
  top: 180px; /* Leave space for header */
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

.face-grids-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: clamp(10px, 3vw, 40px);
  padding-top: 2vw;
  padding-left: 1vw;
  overflow-x: auto;
  max-width: 95vw;
  margin: 0 auto;
}
</style>

  
  

