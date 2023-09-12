<script setup lang="ts">
  defineOptions({ name: 'PageRow' })
  const $props = defineProps({
    height: { type: String, default: '100%' },
    gutter: { type: Number, default: 0 }
  })

  const pageRow = ref<HTMLDivElement>()

  onMounted(() => {
    $props.gutter && setPadding()
  })

  const setPadding = (): void => {
    if (!pageRow?.value) return
    const halfGutter = `${Math.floor($props.gutter / 2)}px`
    const pageRowDom = pageRow.value
    const pageRowChild = Array.from(pageRowDom?.children || []) as HTMLElement[]
    pageRowChild.forEach((el, index) => {
      el.style.marginLeft = index === 0 ? '0px' : halfGutter
      el.style.marginRight = index === pageRowChild.length - 1 ? '0px' : halfGutter
    })
  }
</script>

<template>
  <div ref="pageRow" class="page-row" :style="{ height }">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .page-row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
</style>
