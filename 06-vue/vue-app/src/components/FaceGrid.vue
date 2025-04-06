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
        :src="getImageSrc(randomImages[index])"
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
    minImage: {
      type: Number,
      default: 1
    },
    maxImage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      // Array to hold a random image number for each "on" square
      randomImages: []
    };
  },
  created() {
    this.generateRandomImages();
  },
  methods: {
    generateRandomImages() {
      this.randomImages = [];
      for (let i = 0; i < this.filledCount; i++) {
        this.randomImages.push(this.getRandomImageNumber(this.minImage, this.maxImage));
      }
    },
    getRandomImageNumber(min, max) {
      // Returns a random integer between min and max (inclusive)
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getImageSrc(imageNumber) {
      return require(`@/images/face${imageNumber}.png`);
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






