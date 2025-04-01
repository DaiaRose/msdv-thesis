<!-- src/components/Home.vue -->
<template>
  <div class="home">
    <h1>Welcome to the Homepage!</h1>
    <p>This is your landing page.</p>
    <!-- Button to navigate to the timeline page -->
    <router-link to="/timeline">
      <button>Go to Timeline</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>
