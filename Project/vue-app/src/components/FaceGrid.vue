<template>
  <div class="grid-container">
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
        <!-- Face Layer -->
        <img
          :src="randomFaceImages[index]"
          alt="face"
          class="icon face"
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
    // Arrays of filenames from the manifest for each layer
    headImagePaths: {
      type: Array,
      required: true
    },
    faceImagePaths: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // Shuffled image arrays for each layer
      randomHeadImages: [],
      randomFaceImages: []
    };
  },
  created() {
    this.generateUniqueImages();
  },
  watch: {
    headImagePaths(newVal) {
      if (newVal && newVal.length) {
        this.generateUniqueImages();
      }
    },
    faceImagePaths(newVal) {
      if (newVal && newVal.length) {
        this.generateUniqueImages();
      }
    }
  },
  methods: {
    generateUniqueImages() {
      // Generate shuffled arrays for both head and face layers.
      this.randomHeadImages = this.generateLayerImages(this.headImagePaths, '/images/peeps/');
      this.randomFaceImages = this.generateLayerImages(this.faceImagePaths, '/images/face/');
    },
    generateLayerImages(pathsArray, folderPath) {
      // Map filenames to full paths (prepend folderPath)
      const fullPaths = pathsArray.map(filename => `${folderPath}${filename}`);
      // Shuffle them using Fisher–Yates
      this.shuffleArray(fullPaths);
      // Pick filledCount items, wrapping around if necessary.
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
    }
  }
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 7px;
  width: fit-content;
  margin-top: 60px;
}

.square {
  width: 40px;
  height: 40px;
  position: relative;
}

/* The wrapper holds both layers */
.layer-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Base rule for images can be removed or minimized since we override per layer.
   If you want to remove the .icon base rules altogether, you can do so.
   For this example, we'll leave .icon, but override for .head and .face. */
.icon {
  /* Remove the default absolute positioning,
     we'll set specific values on the layers */
  width: 120%;
  height: 120%;
}

/* HEAD LAYER: Rendered normally so it scales to fill the square as it did before */
.head {
  margin-left: -5px;
  margin-top: -5px;
  position: static; /* not absolutely positioned */
  display: block;
  max-width: 120%;
  max-height: 120%;
  z-index: 1;
}

/* FACE LAYER: Overlaid as a smaller, centered image */
.face {
  position: absolute;
  width: 70%;    /* Adjust this percentage to get your desired face size */
  height: auto;  /* Preserves aspect ratio */
  top: 60%;
  left: 55%;
  transform: translate(-50%, -50%);
  object-fit: contain;
  z-index: 2;
}

.square.on {
  background-color: #D1B3E2;
}

.square.off {
  background-color: grey;
}
</style>











