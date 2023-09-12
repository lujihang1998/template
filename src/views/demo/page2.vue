<script setup lang="ts">
  defineOptions({ name: 'Page2' })

  const checked = ref<boolean>(false)
  const searchForm = reactive({
    value: ''
  })
  const data = [
    {
      label: 'Level one 1',
      children: [
        {
          label: 'Level two 1-1',
          children: [
            { label: 'Level three 1-1-1' },
            { label: 'Level three 1-1-2' },
            { label: 'Level three 1-1-3' },
            { label: 'Level three 1-1-4' }
          ]
        },
        {
          label: 'Level two 1-2',
          children: [
            { label: 'Level three 1-2-1' },
            { label: 'Level three 1-2-2' },
            { label: 'Level three 1-2-3' },
            { label: 'Level three 1-2-4' },
            { label: 'Level three 1-2-5' }
          ]
        },
        {
          label: 'Level two 1-3',
          children: [
            { label: 'Level three 1-3-1' },
            { label: 'Level three 1-3-2' },
            { label: 'Level three 1-3-3' },
            { label: 'Level three 1-3-4' },
            { label: 'Level three 1-3-5' }
          ]
        },
        {
          label: 'Level two 1-4',
          children: [
            { label: 'Level three 1-4-1' },
            { label: 'Level three 1-4-2' },
            { label: 'Level three 1-4-3' },
            { label: 'Level three 1-4-4' },
            { label: 'Level three 1-4-5' }
          ]
        },
        {
          label: 'Level two 1-5',
          children: [
            { label: 'Level three 1-5-1' },
            { label: 'Level three 1-5-2' },
            { label: 'Level three 1-5-3' },
            { label: 'Level three 1-5-4' }
          ]
        }
      ]
    }
  ]
  const tableData = [
    { date: '2028-01-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2027-02-03', name: 'Tom2', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2026-03-04', name: 'Tom3', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2025-04-05', name: 'Tom4', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2024-05-06', name: 'Tom5', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2023-06-07', name: 'Tom6', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2022-07-08', name: 'Tom7', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2021-08-09', name: 'Tom8', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2020-09-01', name: 'Tom9', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2019-10-01', name: 'Tom10', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2018-11-02', name: 'Tom11', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2017-12-03', name: 'Tom12', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-01-04', name: 'Tom13', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2015-02-05', name: 'Tom14', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2014-03-06', name: 'Tom15', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2013-04-07', name: 'Tom16', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2012-05-08', name: 'Jeery', address: 'No. 189, Grove St, Los Angeles' }
  ]
  const columns = [
    {
      prop: 'date',
      label: 'Date'
    },
    {
      prop: 'name',
      label: 'Name'
    },
    {
      prop: 'address',
      label: 'Address'
    }
  ]
</script>

<template>
  <page bgColor="#f5f6f9">
    <PageRow :gutter="20">
      <PageCol width="200px">
        <template #top>
          <el-input class="mb-10px" placeholder="Please input" />
        </template>
        <el-tree :data="data" :props="{ children: 'children', label: 'label' }" default-expand-all />
        <template #bottom>
          <span class="inline-block mt-10px">当前选中10条数据！</span>
        </template>
      </PageCol>
      <PageCol width="calc(100% - 220px)">
        <page full>
          <div mt-10px>
            <el-checkbox v-model="checked">保留历史检索记录</el-checkbox>
          </div>
          <page-form ref="pageForm" inline label-width="100px" :model="searchForm">
            <el-form-item label="多种搭配搜索">
              <el-input v-model="searchForm.value"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button type="primary" plain>重置</el-button>
            </el-form-item>
          </page-form>
          <page-tabel :data="tableData" :columns="columns" border :scrollInTabel="true"></page-tabel>
        </page>
      </PageCol>
    </PageRow>
  </page>
</template>
