<script setup lang="ts">
  import useAppStore from '@/stores/modules/app'
  import usePermissionStore from '@/stores/modules/permission'
  import SidebarItem from './SidebarItem.vue'

  defineOptions({ name: 'Sidebar' })

  const $route = useRoute()
  const appStore = useAppStore()
  const permissionStore = usePermissionStore()
  const isCollapse = computed((): boolean => {
    return !(appStore.sidebarOpened || appStore.fullMain)
  })

  const toggleSideBar = () => {
    appStore.toggleSideBar()
  }
</script>

<template>
  <div class="sidebar-box">
    <el-scrollbar class="sidebar-container">
      <div @click="toggleSideBar" class="box-hamburger">
        <svg-icon class="hamburger main-color" icon-class="open" :class="{ 'is-active': appStore.sidebarOpened }" />
      </div>

      <el-menu
        mode="vertical"
        router
        :options="permissionStore.routes"
        :show-timeout="200"
        :collapse="!isCollapse"
        background-color="#374151"
        text-color="#fff"
        active-text-color="#fff"
        :default-active="$route.meta.activeMenu || $route.path"
      >
        <sidebar-item :routes="permissionStore.routes" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
  .box-hamburger {
    width: 100%;
    cursor: pointer;
    text-align: center;
    background-color: #435064;

    .hamburger {
      width: 100%;
      display: inline-block;
      cursor: pointer;
      color: #eee;
      font-size: 24px;
      transform: rotate(0deg);
      transition: 0.38s;
      transform-origin: 50% 50%;
    }

    .hamburger.is-active {
      transform: rotate(90deg);
    }
  }
</style>
