<template>
  <el-card class="card" shadow="always" :style="{ opacity: 1 - progress }">
    <div>
      <strong class="tag">{{ data.tag }}</strong>
      <h2 class="date">{{ data.date }}</h2>
      <p class="description">{{ data.description }}</p>

      <!-- Only render if there's an image URL -->
      <img
        v-if="data.image"
        :src="imageUrl"
        :alt="data.altText"
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
  computed: {
    imageUrl() {
      // if data.image is empty, this will be an empty string
      return this.data.image
        ? `images/timeline/${this.data.image}`
        : "";
    }
  }
};
</script>

<style scoped>
.card {
  margin: 0 auto;
  width: 200px;
}

/* Make sure images never overflow and keep their aspect ratio */
.card img {
  display: block;
  max-width: 100%;
  height: auto;
  margin-top: 0.5em;     /* give a little breathing room */
  border-radius: 4px;    /* optional rounded corners */
  object-fit: cover;     /* crop/scale if you want a uniform box */
}

</style>

