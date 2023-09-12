<script setup lang="ts">
  defineOptions({ name: 'PageCol' })
  defineProps({
    width: { type: String, default: '100%' },
    height: { type: String, default: '100%' },
    bgColor: { type: String, default: '#fff' },
    notScrollbar: { type: Boolean, default: false }
  })

  const colTop = ref()
  const colBottom = ref()
</script>

<template>
  <div class="page-col" :style="{ width, height, backgroundColor: bgColor }">
    <div ref="colTop" class="page-col-top">
      <slot name="top"></slot>
    </div>
    <div class="page-col-scrollbar">
      <el-auto-resizer>
        <template #default="{ height: resizerHeight }">
          <el-scrollbar :height="resizerHeight + 'px'">
            <slot></slot>
          </el-scrollbar>
        </template>
      </el-auto-resizer>
    </div>
    <div ref="colBottom" class="page-col-bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-col {
    display: flex;
    flex-direction: column;

    &-top,
    &-bottom {
      flex-grow: 0;
    }

    &-scrollbar {
      flex-grow: 1;

      ::v-deep(.el-scrollbar__wrap) {
        & > .el-scrollbar__view {
          flex-grow: 1;
          height: 100%;
          // overflow: hidden;
        }
      }
    }
  }
</style>
