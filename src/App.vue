<template>
  <div id="app">
    <!--<application-layout></application-layout>-->
    <admin-panel></admin-panel>
  </div>
</template>

<script>
import ApplicationLayout from "./components/ApplicationLayout";
import AdminPanel from "./components/admin_panel/AdminPanel";

export default {
  name: 'App',
  components: {
    AdminPanel,
    ApplicationLayout,
  }
}
</script>

<style lang="scss">
  @import "scss/main-style";
</style>
