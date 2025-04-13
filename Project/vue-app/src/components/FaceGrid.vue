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
      if (!this.headImagePaths.length || !this.faceImagePaths.length) return;
      this.randomHeadImages = this.generateLayerImages(this.headImagePaths, 'images/peeps/');
      this.randomFaceImages = this.generateLayerImages(this.faceImagePaths, 'images/face/');
    },
    generateLayerImages(pathsArray, folderPath) {
      // Prepend the base URL and the folder path to each filename.
      const fullPaths = pathsArray.map(filename => `${process.env.BASE_URL}${folderPath}${filename}`);
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
      const availableFaces = this.faceImagePaths.map(filename => `${process.env.BASE_URL}images/face/${filename}`);
      const newFace = availableFaces[Math.floor(Math.random() * availableFaces.length)];
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
  gap: 7px;
  width: fit-content;
  margin-top: 60px;
}

.square {
  width: 40px;
  height: 40px;
  position: relative;
}

/* The layer-wrapper positions the two layers together. */
.layer-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
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












