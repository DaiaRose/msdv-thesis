<template>
  <div class="grid">
    <div v-for="(row,rowIndex) in 6" :key ="rowIndex">
        <div v-for="(col,colIndex) in 4" :key="colIndex">
            <h1>Face</h1>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "FaceGrid",
};
</script>

<style scoped>
.grid {
  text-align: center;
  margin-top: 50px;
}
</style>
