<!-- src/components/Hero.vue -->
<template>
  <section class="hero">
    <div class="inner">
      <h1 class="title">THE MISSING CHAPTER</h1>
      <router-link to="/TimelinePage" class="tagline">
      QUEER YOUTH IN SEX ED
      </router-link>
    </div>
  </section>
</template>

<script>
export default { name: "Hero" };
</script>

<style>
/* full‑screen hero */
.hero{
  height:100vh;                                    /* full viewport height   */
  background:url("~@/assets/HeroBlank.png") center/cover no-repeat;
  display:flex;
  justify-content:center;
  align-items:center;
  color:#fff;
  box-sizing:border-box;
}

/* Top-left */
.title {
  position: absolute;
  top: 5rem;
  left: 2rem;
  margin: 0;
  font: 700 3rem "Red Hat Display", sans-serif;
}

/* Bottom-right */
.tagline {
  color: #fff;
  text-decoration: none;
  position: absolute;
  bottom: 2rem;
  right: 4rem;
  margin: 0;
  font: 700 3rem "Red Hat Display", sans-serif;
  text-align: right;
}

.tagline:hover {
  color: #ddd;
}

.cta:hover{ background:#000; color:#fff; }

</style>

  
  
  
  