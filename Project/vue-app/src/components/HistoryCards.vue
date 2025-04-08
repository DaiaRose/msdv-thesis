<template>
  <el-card class="card" shadow="always" :style="{ opacity: 1 - progress }">
    <div>
      <!-- Display the title and progress percentage -->
      <strong>{{ data.title }}</strong>
      
      <!-- Display the timestamp directly -->
      <h2>
        <p>{{ data.timestamp }}</p>
      </h2>
      
      <!-- Display descriptions -->
      <p>{{ data.shortDescription }}</p>
      <p>{{ data.longDescription }}</p>
      
      <!-- Display the icon -->
      <img :src="data.iconUrl" :alt="data.title" />
    </div>
  </el-card>
</template>

<script>
export default {
  name: "HistoryCards",
  props: {
    data: {
      type: Object,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.card {
  margin: 0 auto;
  width: 200px;
}
.progress {
  font-size: 0.9em;
  color: #666;
  margin-left: 5px;
}
</style>

