<script setup lang="ts">
  defineOptions({ name: 'Ellipsis' })
  const $props = withDefaults(
    defineProps<{
      text: string
      emptyValue: string | number
    }>(),
    {
      text: '',
      emptyValue: '--'
    }
  )

  const textWrap = ref<HTMLDivElement | null>(null)
  const isOver = ref<boolean>(false)

  watch(
    () => $props.text,
    () => {
      nextTick(() => handleOver())
    },
    {
      immediate: true
    }
  )

  const handleOver = () => {
    const target = textWrap.value
    const offsetWidth = target?.offsetWidth || 0
    const scrollWidth = target?.scrollWidth || 0
    isOver.value = scrollWidth > offsetWidth
  }
</script>

<template>
  <el-tooltip
    effect="light"
    :disabled="!isOver"
    :content="text"
    placement="top-start"
    :open-delay="600"
    :visible-arrow="false"
  >
    <div class="text-wrap" ref="textWrap">
      {{ text || emptyValue }}
    </div>
  </el-tooltip>
</template>

<style lang="scss" scoped>
  .text-wrap {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
