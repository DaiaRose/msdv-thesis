<template>
  <div class="grid-container">
    <div v-for="(row, rowIndex) in 6" :key="rowIndex" class="grid-row">
      <div v-for="(col, colIndex) in 4" :key="colIndex" class="square">
        <span v-if="getIcon(rowIndex, colIndex)">★</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filledCount: Number // Number of squares to be filled out of 24
  },
  computed: {
    filledPositions() {
      return Array.from({ length: this.filledCount }, (_, i) => i);
    }
  },
  methods: {
    getIcon(row, col) {
      const index = row * 4 + col;
      return this.filledPositions.includes(index);
    }
  }
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  width: fit-content;
}

.square {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
}
</style>
