<script setup lang="ts">
  import { RouteRecordRaw } from 'vue-router'

  defineOptions({ name: 'SidebarItem' })
  const $props = defineProps({
    routes: { type: Array<RouteRecordRaw>, default: [] },
    isNest: { type: Boolean, default: false },
    subAppName: { type: String, default: '' }
  })

  const filterRouter = computed((): Array<RouteRecordRaw> => {
    return $props.routes.filter((route) => !route.hidden && route.children)
  })

  function hasOneShowingChildren(route: RouteRecordRaw, ortherCondition: boolean = true): boolean {
    if (route.children) {
      const showingChildren = route.children.filter((item) => !item.hidden)
      return showingChildren.length === 1 && ortherCondition
    }
    return false
  }
</script>

<template>
  <div class="menu-wrapper">
    <template v-for="route in filterRouter" :key="route.name">
      <el-menu-item
        v-if="hasOneShowingChildren(route, route.children && !route.children[0].children && !route.alwaysShow)"
        :index="subAppName + route.path + '/' + ((route.children && route.children[0].path) || '')"
        :class="{ 'submenu-title-noDropdown': isNest }"
      >
        <svg-icon
          v-if="route.children && route.children[0].meta && route.children[0].meta.icon"
          :icon-class="route.children[0].meta.icon"
          class="icons"
        />
        <template #title>
          <span v-if="route.children && route.children[0].meta && route.children[0].meta.newTitle">{{
            route.children[0].meta.newTitle
          }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu v-else :index="(route.name as string) || route.path">
        <template #title>
          <svg-icon v-if="route.meta && route.meta.icon" :icon-class="route.meta.icon" class="icons" />
          <span v-if="route.meta && route.meta.newTitle">{{ route.meta.newTitle }}</span>
        </template>
        <template v-for="routeChild in route.children" :key="routeChild.name">
          <template v-if="!routeChild.hidden">
            <sidebar-item
              class="nest-menu"
              :is-nest="true"
              v-if="hasOneShowingChildren(routeChild, routeChild.children && routeChild.children.length > 0)"
              :routes="[routeChild]"
              :key="routeChild.path"
            />
            <el-menu-item v-else :index="subAppName + route.path + '/' + routeChild.path">
              <svg-icon
                v-if="routeChild.meta && routeChild.meta.icon"
                :icon-class="routeChild.meta.icon"
                class="icons"
              />
              <template #title>
                <span v-if="routeChild.meta && routeChild.meta.newTitle">{{ routeChild.meta.newTitle }}</span>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-sub-menu>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .icons {
    font-size: 16px !important;
  }
</style>
