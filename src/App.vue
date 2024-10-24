<template>
  <div id="app" class="min-h-screen bg-custom-bg text-custom-text">
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
