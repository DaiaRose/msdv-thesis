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
        :src="imageSrc"
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
    imageNumber: {
      type: Number,
      default: 1
    }
  },
  computed: {
    // This computed property builds the image source based on the passed-in imageNumber prop.
    imageSrc() {
      return require(`@/images/face${this.imageNumber}.png`);
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





