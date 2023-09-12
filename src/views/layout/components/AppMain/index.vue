<script setup lang="ts">
  defineOptions({ name: 'AppMain' })

  const route = useRoute()
  const key = computed(() => {
    return route.fullPath
  })
</script>

<template>
  <div class="main-container">
    <section class="app-main">
      <router-view :key="key" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .app-main {
    flex-grow: 1;
  }
</style>
