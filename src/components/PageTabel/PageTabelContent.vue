<script setup lang="ts">
  import { VNode } from 'vue'
  import { isVNode } from 'vue'

  defineOptions({ name: 'PageTabelContent' })
  const $props = defineProps<{
    render: VNode | (() => VNode)
  }>()

  const customRender = isVNode($props.render) ? $props.render : $props.render()
</script>

<template>
  <component :is="customRender" />
</template>
