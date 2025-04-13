<template>
  <div class="grid-container">
    <div
      v-for="(square, index) in 24"
      :key="index"
      class="square"
      :class="{ on: index < filledCount, off: index >= filledCount }"
    >
      <img
        v-if="index < filledCount"
        :src="randomImages[index]"
        alt="icon"
        class="icon"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filledCount: {
      type: Number,
      default: 20
    },
    // Now the component expects an array of image paths from the manifest.
    imagePaths: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // Array that will store the shuffled image paths for use by the grid.
      randomImages: []
    };
  },
  created() {
    this.generateUniqueImages();
  },
  watch: {
    imagePaths(newVal) {
      if (newVal && newVal.length) {
        this.generateUniqueImages();
      }
    }
  },
  methods: {
    generateUniqueImages() {
      const paths = this.imagePaths.map(filename => `/images/peeps/${filename}`);
      this.shuffleArray(paths);
      const selected = [];
      for (let i = 0; i < this.filledCount; i++) {
        selected.push(paths[i % paths.length]);
      }
      this.randomImages = selected;
      console.log("Received imagePaths:", this.imagePaths);
    },
    shuffleArray(arr) {
      // Implements Fisher–Yates shuffle.
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-auto-flow: row;
  gap: 7px;
  width: fit-content;
  margin-top: 60px;
}

.square {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.square.on {
  background-color: #D1B3E2;
}

.square.off {
  background-color: grey;
}

.icon {
  width: 110%;
  object-fit: contain;
}
</style>









