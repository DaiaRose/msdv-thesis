<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <!-- only wrap in <transition> if this route has a transition declared -->
      <template v-if="route.meta.transition">
        <transition :name="computedTransition" mode="out-in">
          <component
            :is="Component"
            :key="route.fullPath"
            class="view-wrapper"
          />
        </transition>
      </template>
      <!-- otherwise render it directly, no transition -->
      <template v-else>
        <component 
          :is="Component" 
          :key="route.fullPath" 
        />
      </template>
    </router-view>
  </div>
</template>

<script>
export default {
  computed: {
    computedTransition() {
      if (this.$route.meta.direction === 'back') {
        return 'scroll-up'
      }
      return this.$route.meta.transition || 'fade'
    }
  }
}
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
  --border-radius: 12px;
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

.next-button {
width: 240px;
padding: 0.75em;
font-size: 1.5rem;
font-weight: 400;
font-family: inherit;
background: var(--lightOrange);
color: var(--dark);
border: none;
border-radius: var(--border-radius);
cursor: pointer;
}

.next-button:hover {
background: var(--orange);
}

/* scroll-down (only for CurrentlyCensor ↔ CensorLaws) */
.scroll-down-enter-from { transform: translateY(100%); }
.scroll-down-enter-to   { transform: translateY(0%);   }
.scroll-down-leave-from { transform: translateY(0%);   }
.scroll-down-leave-to   { transform: translateY(-100%); }
.scroll-down-enter-active,
.scroll-down-leave-active {
  transition: transform 0.6s ease;
}

</style>


