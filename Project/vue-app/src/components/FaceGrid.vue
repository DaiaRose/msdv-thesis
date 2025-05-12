<template>
  <div
  class="grid-container"
  :style="{
    width: scaledWidth,
    maxWidth: scaledMaxWidth
  }"
  >
    <div
      v-for="(square, index) in 24"
      :key="index"
      class="square"
      :class="{ on: index < filledCount, off: index >= filledCount }"
    >
      <div v-if="index < filledCount" class="layer-wrapper">
        <!-- Head Layer -->
        <img
          :src="randomHeadImages[index]"
          alt="head"
          class="icon head"
          @error="onImageError($event, randomHeadImages[index])"
        />
        <!-- Face Layer with mouseover effect -->
        <img
          :src="randomFaceImages[index]"
          alt="face"
          class="icon face"
          @mouseenter="changeFace(index)"
          @error="onImageError($event, randomFaceImages[index])"
        />
      </div>
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
    headImagePaths: {
      type: Array,
      required: true
    },
    faceImagePaths: {
      type: Array,
      required: true
    },
    sizeScale: {
    type: Number,
    default: 1 // normal size by default
    }
  },
  computed: {
    scaledWidth() {
      return `calc(17vw * ${this.sizeScale})`;
    },
    scaledMaxWidth() {
      return `${240 * this.sizeScale}px`;
    }
  },
  data() {
    return {
      randomHeadImages: [],
      randomFaceImages: []
    };
  },
  watch: {
    headImagePaths: {
      immediate: true,
      handler() {
        this.checkAndGenerate();
      }
    },
    faceImagePaths: {
      immediate: true,
      handler() {
        this.checkAndGenerate();
      }
    },
    filledCount(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.checkAndGenerate();
      }
    }
  },
  methods: {
    checkAndGenerate() {
      if (
        this.headImagePaths && this.headImagePaths.length &&
        this.faceImagePaths && this.faceImagePaths.length
      ) {
        this.generateUniqueImages();
      }
    },
    generateUniqueImages() {
      this.randomHeadImages = this.generateLayerImages(this.headImagePaths, 'images/peeps/');
      this.randomFaceImages = this.generateLayerImages(this.faceImagePaths, 'images/face/');
    },
    generateLayerImages(pathsArray, folderPath) {
      const fullPaths = pathsArray.map(filename => `${folderPath}${filename}`);
      this.shuffleArray(fullPaths);
      const selected = [];
      for (let i = 0; i < this.filledCount; i++) {
        selected.push(fullPaths[i % fullPaths.length]);
      }
      return selected;
    },
    shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    },
    onImageError(event, src) {
      console.error('Image failed to load:', src);
    },
    changeFace(index) {
      const folderPath = 'images/face/';
      const availableFaces = this.faceImagePaths.map(filename => `${folderPath}${filename}`);

      if (!availableFaces.length) return;

      let newFace;
      do {
        newFace = availableFaces[Math.floor(Math.random() * availableFaces.length)];
      } while (newFace === this.randomFaceImages[index] && availableFaces.length > 1);

      this.randomFaceImages[index] = newFace;
    }
  }
};
</script>


<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: clamp(0.5vw, 1vw, 20px); /* fluid spacing depending on screen size */
  width: 100%;                  /* allow grids to stretch across */
  max-width: 240px;              /* limit individual grid width */
  margin: 0 auto;
}

.square {
  width: 100%;          /* fill its grid cell */
  aspect-ratio: 1 / 1;  /* always be a perfect square */
  position: relative;
  overflow: visible;
}

/* The layer-wrapper positions the two layers together. */
.layer-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* Base styling for images */
.icon {
  width: 120%;
  height: 120%;
  object-fit: contain;
  display: block;
}

/* HEAD LAYER: Rendered normally */
.head {
  margin-left: -5px;
  margin-top: -5px;
  position: static; 
  display: block;
  max-width: 120%;
  max-height: 120%;
  z-index: 1;
}

/* FACE LAYER: Overlaid and smaller */
.face {
  position: absolute;
  width: 70%;
  height: auto;
  top: 60%;
  left: 55%;
  transform: translate(-40%, -50%);
  object-fit: contain;
  z-index: 2;
}

.square.on {
  background-color: var(--lilac);
}

.square.off {
  background-color: var(--silver);
}
</style>












