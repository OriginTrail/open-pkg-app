<template>
  <div id="app">
    <application-layout></application-layout>
  </div>
</template>

<script>
import ApplicationLayout from "./components/ApplicationLayout";

export default {
  name: 'App',
  components: {
    ApplicationLayout,
  }
}
</script>

<style lang="scss">
  @import "scss/main-style";
</style>
