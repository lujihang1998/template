<script setup lang="ts">
  import AppMain from './components/AppMain/index.vue'
  import Sidebar from './components/Sidebar/index.vue'
  import Navbar from './components/Navbar/index.vue'
  import useAppStore from '@/stores/modules/app'

  defineOptions({ name: 'Layout' })

  const appStore = useAppStore()
  const sidebarOpened = computed(() => appStore.sidebarOpened)
  const fullMain = computed(() => appStore.fullMain)
</script>

<template>
  <div class="app-wrapper" :class="{ hideSidebar: sidebarOpened || fullMain }">
    <Navbar />
    <Sidebar />
    <app-main v-bind="$attrs" />
  </div>
</template>

<style lang="scss" scoped>
  .app-wrapper {
    &:after {
      content: '';
      display: table;
      clear: both;
    }

    position: relative;
    height: 100%;
    width: 100%;
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
