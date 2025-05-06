<template>
  <el-card class="card" shadow="always" :style="{ opacity: 1 - progress }">
    <div>
      <h2 class="date">{{ data.date }}</h2>
      <p class="description">{{ data.description }}</p>

      <!-- image clicked -->
        <img
          v-if="data.image"
          :src="imageUrl"
          :alt="data.altText"
          class="card-image clickable"
          @click.prevent="$emit('hover', data.id, data.image)"
          @dblclick.prevent="$emit('navigate', data.link)"
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
        ? `images/timeline/${this.data.image}` /*this MUST stay referenced this way so gh-pages reads it*/
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
  border-radius: var(--border-radius);
}

/* Remove the top padding Element UI gives the card body */
.card ::v-deep .el-card__body {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  color: var(--dark);
}

/* Kill the default top margin on your <h2 class="date"> */
.card .date {
  margin: 0 0 0.25em;
  font-size: 1em;
  color: var(--dark);
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

