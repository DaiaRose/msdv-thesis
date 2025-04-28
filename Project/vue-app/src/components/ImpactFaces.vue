// src/components/ImpactFaceGrid.vue
<template>
  <div class="impact-viz">
    <div class="content-wrapper">
      <!-- Slider -->
      <div class="slider-wrapper">
        <div class="slider-container">
          <el-slider
            v-model="coverage"
            vertical
            height="200px"
            :min="0"
            :max="100"
            :show-tooltip="false"
            @input="updateLabelPosition"
            ref="slider"
            :style="{
              '--el-color-primary': 'var(--orange)',
              '--el-slider-runway-bg-color': 'var(--lightOrange)'
            }"
          />
          <div
            class="slider-label"
            :style="{ top: labelTop + 'px' }"
          >
            {{ coverage }}%
          </div>
        </div>
      </div>

      <!-- Grids -->
      <div class="grids">
        <div v-for="group in processedGroups" :key="group.id" class="group-grid">
          <FaceGrid
            :filledCount="group.affectedCount"
            :headImagePaths="group.headImagePaths"
            :faceImagePaths="group.faceImagePaths"
          />
          <div class="grid-label">{{ group.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElSlider } from "element-plus";
import "element-plus/es/components/slider/style/css";
import FaceGrid from "@/components/FaceGrid.vue";

export default {
  name: "ImpactFaceGrid",
  components: { FaceGrid, ElSlider },
  props: {
    groups: {
      type: Array,
      required: true
    },
    baselineCoverage: {
      type: Number,
      default: 35
    }
  },
  data() {
    return {
      coverage: 35,
      manifest: null,
      labelTop: 0
    };
  },
  mounted() {
    fetch("data/manifestPeeps.json")
      .then((response) => response.json())
      .then((data) => {
        this.manifest = data;
        this.updateLabelPosition();
      })
      .catch((err) => console.error("Error loading manifest:", err));
  },
  methods: {
    updateLabelPosition() {
      const slider = this.$refs.slider?.$el?.querySelector(".el-slider__runway");
      if (!slider) return;
      const sliderHeight = slider.offsetHeight;
      const percent = this.coverage / 100;
      this.labelTop = sliderHeight * (1 - percent) - 10;
    }
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
  }
};
</script>

<style scoped>
.bullying-viz {
  padding: 4rem;
  overflow: visible; /* Allow slider label to overflow */
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  overflow: visible; /* Allow overflow of slider label */
}

.slider-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slider-container {
  position: relative;
  height: 200px;
  overflow: visible; /* ← ADD THIS LINE */
}
/* Label that tracks thumb */
.slider-label {
  position: absolute;
  right: 120%; /* move to left of the thumb */
  top: 0;
  font-size: 1rem;
  background: var(--lightOrange);
  padding: 4px 8px;
  border-radius: 6px;
  pointer-events: none;
  z-index: 2;
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

.grid-label {
  margin-top: 0.5rem;
  font-size: 1.1rem;
  text-align: center;
}
</style>
