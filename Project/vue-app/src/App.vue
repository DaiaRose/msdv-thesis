<template>
  <div id="app">
    

    <!-- Render current route -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Import Google Font */
@import url("https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap");

/* Define global color variables */
:root {
  --lilac: #D1B3E2;
  --purple:#BA99CD;
  --baseGrey: #E3E1E1;
  --silver:#B6B6B6;
  --dark: #131213;
  --orange: #F99368;
  --lightOrange: #FFC0A5;
}


body {
  font-family: "Red Hat Display", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: var(--baseGrey);
  font-size: 1.2rem;
  color: var(--dark);
  font-weight: 400;
}
</style>


