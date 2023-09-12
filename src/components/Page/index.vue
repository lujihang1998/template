<script setup lang="ts">
  defineOptions({ name: 'Page' })
  defineProps({
    bgColor: { type: String, default: '#fff' },
    full: { type: Boolean, default: false }
  })

  // const $slots = useSlots()

  onMounted(() => {})
</script>

<template>
  <div class="page-wrapper" :class="{ 'page-wrapper--full': full !== false }">
    <div class="page-container" :style="{ backgroundColor: bgColor }">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  ::v-deep(.demo-form-inline .el-input) {
    --el-input-width: 220px;
  }
  .page-wrapper {
    height: 100%;
    width: 100%;

    & > .page-container {
      height: 100%;
      width: 100%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    &.page-wrapper--full {
      & > .page-container {
        padding: 0;
      }
    }
  }
</style>
