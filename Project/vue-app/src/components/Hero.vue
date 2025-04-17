<!-- src/components/Hero.vue -->
<template>
    <section class="hero">
      <h1 class="title">THE MISSING CHAPTER</h1>
      <h2 class="tagline">QUEER YOUTH IN SEX ED</h2>
    </section>
  </template>
  
  <script>
  export default { name: "Hero" };
  </script>
  
  <style>
  .hero {
    /* show the whole image without cropping */
    background: url("/images/HeroBlank.svg") center top / contain no-repeat;
  
    /* let the element grow to the natural height of the SVG */
    padding-top: 4rem;          /* space above the heading */
    padding-bottom: 4rem;       /* space below the tagline */
  
    text-align: center;
    color: #fff;
    box-sizing: border-box;
  }
  
  .title   { margin: 0 0 1rem; font: 700 3rem/1 "Red Hat Display", sans-serif; }
  .tagline { margin: 0;         font: 700 1.75rem/1 "Red Hat Display", sans-serif; }
  
  @media (min-width: 768px) {
    .title   { font-size: 4rem; }
    .tagline { font-size: 2.25rem; }
  }
  </style>
  
  
  
  