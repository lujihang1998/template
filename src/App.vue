<script setup lang="ts">
  import { zhCn, en } from 'element-plus/es/locale/index'

  const language = ref('zh-cn')
  const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
