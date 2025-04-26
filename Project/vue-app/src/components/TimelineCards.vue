<template>
  <el-card class="card" shadow="always" :style="{ opacity: 1 - progress }">
    <div>
      <h2 class="date">{{ data.date }}</h2>
      <p class="description">{{ data.description }}</p>

      <!-- If a link is provided, wrap the image in an anchor tag -->
      <a
        v-if="data.link"
        :href="data.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          v-if="data.image"
          :src="imageUrl"
          :alt="data.altText"
          class="card-image clickable"
        />
      </a>
      <!-- Otherwise render the image normally -->
      <img
        v-else-if="data.image"
        :src="imageUrl"
        :alt="data.altText"
        class="card-image"
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
      return this.data.image
        ? `/images/timeline/${this.data.image}`
        : "";
    },
  },
};
</script>

<style scoped>
.card {
  margin: 0 auto;
  width: 240px;
  border: none;
  background: var(--lilac);
}

/* Remove the top padding Element UI gives the card body */
.card ::v-deep .el-card__body {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

/* Kill the default top margin on your <h2 class="date"> */
.card .date {
  margin: 0 0 0.25em;
  font-size: 1em;
}

/* Reset paragraph margins */
.card .description {
  margin: 0;
}

/* Base image styling */
.card-image {
  display: block;
  max-width: 100%;
  height: auto;
  margin-top: 0.5em;
  object-fit: cover;
  transition: transform 0.2s ease-in-out;
}

/* Only clickable images enlarge on hover */
.clickable {
  cursor: pointer;
}

.clickable:hover {
  transform: scale(1.1);
}
</style>

