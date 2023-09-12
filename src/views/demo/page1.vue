<script setup lang="ts">
  import PageForm from '@/components/PageForm/index.vue'

  defineOptions({ name: 'Page1' })

  type SizeEnum = 'large' | 'default' | 'small'
  const { t } = useI18n()

  const hideModel = ref<boolean>(false)
  const limitFirstRow = ref<number>(4)
  const checkList = ref<string[]>([])
  const formSize = ref<SizeEnum>('default')
  const myPageForm = ref<InstanceType<typeof PageForm>>()
  const searchForm = reactive<Record<string, any>>({
    queryFiled1: '',
    queryFiled2: '',
    queryFiled3: '',
    queryFiled4: '',
    queryFiled5: '杂粮煎饼',
    queryFiled6: '1',
    queryFiled7: '',
    queryFiled8: '',
    queryFiled9: ''
  })
  const options = [
    {
      value: 'zhinan',
      label: '指南',
      children: [
        {
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{ value: 'yizhi', label: '一致' }]
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
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
  })

  const handleGroup = () => {
    // if (!myPageForm.value) return
    myPageForm?.value?.reorder()
  }

  const handleCheckedChange = (value: (string | number | boolean)[]): void => {
    const result = value.includes('1')
    changePageFormLayout(result)
    // const result2 = value.includes('2')
    // const result3 = value.includes('3')
    const result4 = value.includes('4')
    changeLimitRowNumber(result4)
  }

  const changePageFormLayout = (value: boolean): void => {
    hideModel.value = value
  }

  const changeLimitRowNumber = (value: boolean): void => {
    limitFirstRow.value = value ? 2 : 4
  }

  const comScrollInTabel = computed((): boolean => {
    return checkList.value.includes('6')
  })

  const search = async () => {
    if (!myPageForm.value) return
    try {
      await myPageForm.value.validForm()
    } catch (error) {
      console.log(error)
    }
  }

  const reset = () => {
    if (!myPageForm.value) return
    myPageForm.value?.resetValidForm()
  }
</script>

<template>
  <page ref="page">
    <div style="margin: 0 10px 10px 0">
      <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
        <el-checkbox label="1">收起多余检索项，根据内容区域宽计算</el-checkbox>
        <el-checkbox label="2" :disabled="!checkList.includes('1')">(暂时不做)在下方展示隐藏检索项的值</el-checkbox>
        <el-checkbox label="3" :disabled="!checkList.includes('1')"
          >(暂时不做)在收起展开处气泡框展示隐藏检索项的值</el-checkbox
        >
        <el-checkbox label="4" :disabled="!checkList.includes('1')">限制第一行展示检索框个数</el-checkbox>
        <el-checkbox label="5" :disabled="true">固定检索表单的宽774px</el-checkbox>
        <el-checkbox label="6">只在表格内滚动</el-checkbox>
      </el-checkbox-group>

      <el-radio-group v-model="formSize" @change="handleGroup">
        <el-radio-button label="large" />
        <el-radio-button label="default" />
        <el-radio-button label="small" />
      </el-radio-group>
    </div>

    <page-form
      ref="myPageForm"
      inline
      :model="searchForm"
      :size="formSize"
      :hide-model="hideModel"
      :limit-first-row="limitFirstRow"
      label-width="75px"
    >
      <el-form-item label="输入框1" prop="queryFiled1">
        <el-input v-model="searchForm.queryFiled1" placeholder="请输入..." clearable></el-input>
      </el-form-item>
      <el-form-item label="输入框2" prop="queryFiled2">
        <el-input v-model="searchForm.queryFiled2" placeholder="请输入..." clearable></el-input>
      </el-form-item>
      <el-form-item label="输入框3" prop="queryFiled3">
        <el-input v-model="searchForm.queryFiled3" placeholder="请输入..." clearable></el-input>
      </el-form-item>
      <el-form-item label="输入框4" prop="queryFiled4">
        <el-input v-model="searchForm.queryFiled4" placeholder="请输入..." clearable></el-input>
      </el-form-item>
      <el-form-item label="输入框5" prop="queryFiled5">
        <el-input v-model="searchForm.queryFiled5" placeholder="请输入..." clearable></el-input>
      </el-form-item>
      <el-form-item label="下拉框" prop="queryFiled6">
        <el-select v-model="searchForm.queryFiled6" placeholder="请选择..." clearable>
          <el-option label="黄金糕" value="1"></el-option>
          <el-option label="双皮奶" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="级联" prop="queryFiled7" sub-label="自定义label">
        <el-cascader
          v-model="searchForm.queryFiled7"
          :options="options"
          placeholder="请选择..."
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="多选框" prop="queryFiled8">
        <el-select v-model="searchForm.queryFiled8" placeholder="请选择..." multiple clearable>
          <el-option label="黄金糕" value="1"></el-option>
          <el-option label="双皮奶" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="queryFiled9">
        <el-date-picker
          v-model="searchForm.queryFiled9"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable
        />
      </el-form-item>
      <template #page-form__btns>
        <el-form-item>
          <el-button type="primary" @click="search">{{ $t('button.search') }}</el-button>
          <el-button plain @click="reset">{{ $t('button.reset') }}</el-button>
        </el-form-item>
      </template>

      <template #page-form__append>
        <el-button :size="formSize" type="primary">{{ t('button.add') }}</el-button>
        <el-button :size="formSize" type="primary" plain>{{ t('button.batchDelete') }}</el-button>
        <el-button :size="formSize" type="primary" plain>{{ t('button.export') }}</el-button>
      </template>
    </page-form>

    <page-tabel v-model:pagination="pagination" :data="tableData" border :scrollInTabel="comScrollInTabel">
      <el-table-column :label="t('label.date')" prop="date"></el-table-column>
      <el-table-column :label="t('label.name')" prop="name"></el-table-column>
      <el-table-column :label="t('label.place')" prop="address"></el-table-column>
      <el-table-column :label="t('label.operation')" prop="" width="220">
        <el-button type="primary" size="small">{{ t('button.edit') }}</el-button>
        <el-button type="danger" size="small">{{ t('button.delete') }}</el-button>
      </el-table-column>
    </page-tabel>
  </page>
</template>

<style lang="scss" scoped></style>
