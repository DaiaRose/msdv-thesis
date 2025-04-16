<template>
  <el-card class="card" shadow="always" :style="{ opacity: 1 - progress }">
    <div>
      <strong class="tag">{{ data.tag }}</strong>
      <h2 class="date">{{ data.date }}</h2>
      <p class="description">{{ data.description }}</p>

      <!-- Only render if there's an image URL -->
      <img
        v-if="data.image"
        :src="data.image"
        :alt="data.altText || 'timeline image'"
      />
    </div>
  </el-card>
</template>

<script>
export default {
  name: "TimelineCards",
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

