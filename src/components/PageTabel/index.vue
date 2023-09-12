<script setup lang="ts">
  defineOptions({ name: 'PageTabel' })
  const $props = withDefaults(
    defineProps<{
      scrollInTabel?: boolean
      columns?: any[]
      height?: string | number
      background?: boolean
      pageSizes?: number[]
      pagination?: Record<string, number>
      paginationProp?: {
        currentPage: string
        pageSize: string
        total: string
      }
    }>(),
    {
      scrollInTabel: false,
      height: '100%',
      background: true,
      pageSizes: () => [10, 20, 30, 40],
      paginationProp: () => {
        return {
          currentPage: 'currentPage',
          pageSize: 'pageSize',
          total: 'total'
        }
      }
    }
  )
  const $attrs = useAttrs()
  const $emit = defineEmits<{
    (event: 'query'): void
    (event: 'update:pagination', params: Record<string, number>): void
  }>()

  const tableProps = computed(() => {
    const props = { ...$attrs }
    props.height = $props.scrollInTabel ? $props.height : 'auto'
    return props
  })

  const handleSizeChange = (value: number) => {
    const pageSizeName = $props.paginationProp['pageSize']
    $emit('update:pagination', { ...$props.pagination, [pageSizeName]: value })
    $emit('query')
  }
  const handleCurrentChange = () => {
    $emit('query')
  }
</script>

<template>
  <div ref="pageTabel" :class="{ 'page-tabel-scroll': scrollInTabel }">
    <el-table v-bind="tableProps">
      <template v-if="!columns?.length">
        <slot></slot>
      </template>
      <template v-else>
        <el-table-column v-bind="{ ...(column || {}) }" v-for="column in columns" :key="column.key">
          <template v-if="!column.customRender" v-slot="{ row }">{{ row[column.prop] }}</template>
          <template v-else v-slot="{ row }">
            <PageTabelContent :render="column.customRender(row, column.prop)" />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="page-tabel-footer flex items-center justify-between mt-15px">
      <div>
        <!-- <span>一共选择了0条</span> -->
      </div>
      <el-pagination
        v-if="pagination"
        :background="background"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pagination[paginationProp.pageSize]"
        :current-page="pagination[paginationProp.currentPage]"
        :total="pagination[paginationProp.total]"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-tabel-scroll {
    flex-grow: 1;
    height: 100px;

    &:has(.page-tabel-footer) {
      padding-bottom: 47px;
    }
  }
</style>
