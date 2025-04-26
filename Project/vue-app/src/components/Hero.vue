<!-- src/components/Hero.vue -->
<template>
  <section class="hero">
    <h1 class="title">THE MISSING CHAPTER</h1>
    <router-link to="/TimelinePage" class="tagline">
      QUEER YOUTH IN SEX ED
    </router-link>
  </section>
</template>

<script>
export default { name: "Hero" };
</script>

<style>
.hero {
  height: 100vh;
  background: url("~@/assets/fullsizeHero.png") center / cover no-repeat;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1.5rem;
  color: var(--dark);
  box-sizing: border-box;
  position: relative;
}

/* Title in left column, second row */
.title {
  grid-column: 1/4;
  grid-row: 1;
  justify-self: center;
  align-self: center;
  margin: 0;
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 4.5rem);
  font-family: "Red Hat Display", sans-serif;
  text-align: center;
  max-width: 50vw;
  word-break: break-word;
}

/* Tagline (link) in right column, third row */
.tagline {
  grid-column: 4/7;
  grid-row: 4;
  justify-self: center;
  align-self: center;
  margin: 0;
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 4.5rem);
  font-family: "Red Hat Display", sans-serif;
  text-align: center;
  text-decoration: none;
  color: var(--dark);
  max-width: 50vw;
  word-break: break-word;
}

/* On hover: lighten the tagline */
.tagline:hover {
  background-color: var(--orange);
  border-radius: 14px;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
  }
  .title, .tagline {
    grid-column: 1;
    max-width: 90vw;
    font-size: 3rem;
  }
}
</style>

  
  
  
  