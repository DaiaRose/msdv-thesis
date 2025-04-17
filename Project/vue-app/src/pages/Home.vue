<!-- src/pages/Home.vue -->
<template>
  <div class="home">
    <Hero />

    <router-link to="/TimelinePage" class="btn">
      Go to Timeline
    </router-link>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
export default { name: "Home", components: { Hero } };
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: stretch; 
  
  text-align: center;
  color: #000;
  font-family: "Red Hat Display", sans-serif;
  font-size: 50px;
  font-weight: 700;
  line-height: 70px;
}

.hero {
  width: 100%;            /* ② explicitly cap at viewport   */
  box-sizing: border-box; /* include padding inside that 100% */
}

</style>

