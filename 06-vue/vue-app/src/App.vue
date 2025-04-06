<template>
  <div id="app">
    <!-- Global header with Home button -->
    <header>
      <router-link to="/">
        <button>Home</button>
      </router-link>
    </header>

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
/* Global styling for header and button */
header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  z-index: 1000;
}

header button {
  font-size: 16px;
  cursor: pointer;
}
</style>

