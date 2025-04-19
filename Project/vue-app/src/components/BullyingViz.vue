<template>
  <div class="bullying-viz">
    <h2>Bullying Rates by Identity Group</h2>
    <p>
      Adjust the % of schools teaching LGBTQ-inclusive sex ed. Each grid shows the estimated number of youth who experienced bullying (out of 24).
    </p>

    <input
      type="range"
      min="0"
      max="100"
      v-model="coverage"
      class="slider"
    />
    <div class="label">Coverage: {{ coverage }}%</div>

    <div class="grids">
      <div v-for="group in processedGroups" :key="group.id" class="group-grid">
        <h3>{{ group.label }}</h3>
        <FaceGrid
          :filledCount="group.affectedCount"
          :headImagePaths="group.headImagePaths"
          :faceImagePaths="group.faceImagePaths"
        />
        <div class="label">{{ group.affectedCount }} of 24 affected</div>
      </div>
    </div>
  </div>
</template>

<script>
import FaceGrid from "@/components/FaceGrid.vue";

export default {
  name: "BullyingViz",
  components: { FaceGrid },
  data() {
    return {
      coverage: 35,
      baselineCoverage: 35,
      manifest: null,
      groups: [
        {
          id: "hetero",
          label: "Heterosexual Youth",
          baselineRate: 0.168,
          oddsRatioPer10: 1.0,
          headManifestKey: "gayPeeps",
          faceManifestKey: "facePeeps"
        },
        {
          id: "gay",
          label: "Gay/Lesbian Youth",
          baselineRate: 0.346,
          oddsRatioPer10: 0.83,
          headManifestKey: "gayPeeps",
          faceManifestKey: "facePeeps"
        },
        {
          id: "bi",
          label: "Bisexual Youth",
          baselineRate: 0.342,
          oddsRatioPer10: 1.0,
          headManifestKey: "gayPeeps",
          faceManifestKey: "facePeeps"
        }
      ]
    };
  },
  computed: {
    processedGroups() {
      if (!this.manifest) return [];

      return this.groups.map((group) => {
        const baselineOdds = group.baselineRate / (1 - group.baselineRate);
        const adjustedOdds =
          baselineOdds *
          Math.pow(
            group.oddsRatioPer10,
            (this.coverage - this.baselineCoverage) / 10
          );
        const probability = adjustedOdds / (1 + adjustedOdds);
        const affectedCount = Math.round(probability * 24);

        return {
          ...group,
          affectedCount,
          headImagePaths: this.manifest[group.headManifestKey] || [],
          faceImagePaths: this.manifest[group.faceManifestKey] || []
        };
      });
    }
  },
  mounted() {
    fetch("data/manifestPeeps.json")
      .then((response) => response.json())
      .then((data) => {
        this.manifest = data;
      })
      .catch((err) => console.error("Error loading manifest:", err));
  }
};
</script>

<style scoped>
.bullying-viz {
  padding: 1rem;
  font-family: sans-serif;
}
.slider {
  width: 400px;
  margin: 1rem 0;
}
.label {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}
.grids {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
.group-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
