<!-- src/components/Home.vue -->
<template>
  <div class="home">
    <h1>Welcome to the Homepage!</h1>
    <!-- Button to navigate to the timeline page -->
    <router-link to="/HistoryPage">
      <button>Go to Timeline</button>
    </router-link>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
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
  color: #000;
  font-family: "Red Hat Display";
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: 70px; /* 42.857% */
}
</style>
