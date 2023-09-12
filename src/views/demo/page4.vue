<script setup lang="ts">
  defineOptions({ name: 'Page4' })

  const { t, locale } = useI18n()

  // 以下写法切换语言时，页面不会更新
  // const labelName = t('label.language')
</script>

<template>
  <page>
    <PageRow :gutter="20">
      <PageCol>
        <el-descriptions class="margin-top" title="XXxxx" :column="2" border>
          <template #extra>
            <el-button type="primary">{{ $t('label.operation') }}</el-button>
          </template>
          <el-descriptions-item :label="$t('label.language')">{{ locale }}</el-descriptions-item>
          <el-descriptions-item :label="$t('label.telephone')">18100000000</el-descriptions-item>
          <el-descriptions-item label="button.add">{{ t('button.add') }}</el-descriptions-item>
          <el-descriptions-item label="not-found">{{ t('not-found') }}</el-descriptions-item>
        </el-descriptions>
      </PageCol>
    </PageRow>
  </page>
</template>
