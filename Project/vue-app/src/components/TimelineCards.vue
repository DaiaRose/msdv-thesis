<template>
  <el-card class="card" shadow="always" :style="{ opacity: 1 - progress }">
    <div>
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
  border: none;
  background: var(--lilac);
}

/* Remove the top padding Element UI gives the card body */
.card ::v-deep .el-card__body {
  padding-top: 0.5em;
  /* keep some bottom padding if you like */
  padding-bottom: 0.5em;
}

/* Kill the default top margin on your <h2 class="date"> */
.card .date {
  margin: 0 0 0.25em; /* top 0, bottom small */
  font-size: 1em; 
}

/* If you need, reset any <p> margins too */
.card .description {
  margin: 0;
}

/* Your existing image rules */
.card img {
  display: block;
  max-width: 100%;
  height: auto;
  margin-top: 0.5em;
  object-fit: cover;
}
</style>


