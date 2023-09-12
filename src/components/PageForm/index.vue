<script setup lang="ts">
  import { nanoid } from 'nanoid'

  defineOptions({ name: 'PageForm' })
  const $props = withDefaults(
    defineProps<{
      labelWidth?: string // 应该动态计算 最长的那个el-form-label 长度
      downText?: string
      upText?: string
      hideModel?: boolean
      limitFirstRow?: number
      formWidth?: string
    }>(),
    {
      labelWidth: '75px',
      downText: '展开',
      upText: '收起',
      hideModel: false
    }
  )

  const updateLayout = ref<boolean>(true)
  const resizeOb = ref<ResizeObserver>()
  const ruleFormRef = ref<HTMLFormElement>()
  const formExpandRef = ref()
  const isExpand = ref<boolean>(false)
  const UUID = ref<string>(nanoid())

  watch([() => $props.hideModel, () => $props.limitFirstRow], ([newHideModelValue], [newLimitValue]) => {
    if (!newHideModelValue) {
      removeObserve()
      updateLayout.value = false
      setTimeout(() => {
        updateLayout.value = true
      })
    }
    newHideModelValue && init()
    newLimitValue && reorder()
  })

  onMounted(() => {
    init()
  })

  onBeforeUnmount(() => {
    removeObserve()
  })

  const init = () => {
    if (ruleFormRef.value?.$el && $props.hideModel) {
      resizeOb.value = genResizeObserver()
      resizeOb.value.observe(ruleFormRef.value?.$el)
    }
  }

  // 监听dom大小变化
  const genResizeObserver = () => {
    return new ResizeObserver((entries) => {
      for (const entry of entries) {
        switch (entry.target) {
          case ruleFormRef.value?.$el:
            reorder()
            break
        }
      }
    })
  }

  // 移除dom大小变化
  const removeObserve = () => {
    resizeOb.value && resizeOb.value.unobserve(ruleFormRef.value?.$el)
  }

  const reorder = () => {
    const formBtnsDom = ruleFormRef.value?.$el?.querySelector('.page-form__btns') as HTMLSpanElement // 表单按钮
    dealFormWidth()
    dealExpandBtns(formBtnsDom)
    dealBtnsChild(formBtnsDom)
    dealFormHeight(formBtnsDom)
  }

  const dealFormWidth = () => {
    if (!ruleFormRef.value?.$el || !$props?.formWidth) return
    ruleFormRef.value.$el.style.maxWidth = $props?.formWidth
  }

  // 处理展开
  const dealExpandBtns = (formBtnsDom: HTMLSpanElement | null | undefined) => {
    const expendBtns = formExpandRef.value?.$el
    if (!expendBtns || !formBtnsDom) return
    const { width = '0px' } = getComputedStyle(expendBtns)
    formBtnsDom.style.paddingRight = width
  }

  // 计算操作按钮组应该放在哪里, 如果上方有空余位置，需要移动下方元素到上方
  const dealBtnsChild = (formBtnsDom: HTMLSpanElement | null | undefined): void => {
    if (!formBtnsDom) return
    const formDom = ruleFormRef.value?.$el
    const { width: scrollWidth } = getComputedStyle(formDom)
    const ruleFormDomScrollWidth = parseFloat(scrollWidth)

    const { marginLeft = '0px', width = '0px' } = getComputedStyle(formBtnsDom)
    let formFirstRowWidth = parseFloat(marginLeft) + parseFloat(width) // 第一行初始宽度 默认按钮宽度

    let hideModelLastChildIndex = 0
    let formSenior = getFormSenior()
    let firstRowChildren = getChildList(formDom).filter((dom) => dom !== formBtnsDom && dom !== formSenior)
    let formSeniorChildren = getChildList(formSenior)
    let childrenList = [...firstRowChildren, ...formSeniorChildren]

    for (let index = 0; index < childrenList.length; index++) {
      const element = childrenList[index]
      const { marginRight, marginLeft, width } = getComputedStyle(element)
      const itemWidth = parseFloat(marginRight) + parseFloat(marginLeft) + parseFloat(width)
      formFirstRowWidth += itemWidth

      if (formFirstRowWidth >= ruleFormDomScrollWidth || ($props.limitFirstRow && index > $props.limitFirstRow - 1)) {
        formFirstRowWidth -= itemWidth
        hideModelLastChildIndex = index
        break
      }

      // 此时循环到了下面的 formSenior 中了
      if (index > firstRowChildren.length - 1) {
        formDom?.insertBefore(element, formSenior)
      }
    }

    formDom?.insertBefore(formBtnsDom, formSenior) // 插入到第一行最后一个位置
    childrenList.slice(hideModelLastChildIndex).forEach((el) => formSenior?.appendChild(el))
  }

  // 计算表单的高
  const dealFormHeight = (formBtnsDom: HTMLSpanElement | null | undefined) => {
    if (!formBtnsDom) return
    const formDom = ruleFormRef.value?.$el
    if (isExpand.value) {
      formDom.style.height = 'auto'
    } else {
      const { marginTop = '0px', marginBottom = '0px', height = '0px' } = getComputedStyle(formBtnsDom)
      const firstRowHEight = parseFloat(marginTop) + parseFloat(marginBottom) + parseFloat(height)
      formDom.style.height = `${firstRowHEight}px`
    }
  }

  // 处理应该被收起的元素
  const getFormSenior = () => {
    const formDom = ruleFormRef.value?.$el
    const newChildrenList = getChildList(formDom)
    if (!newChildrenList.length) return

    let formSenior = formDom.querySelector(`.form-senior`) as HTMLElement
    if (!formSenior) {
      formSenior = document.createElement('div')
      formSenior.className = 'form-senior'
      const rightControls = formDom.nextElementSibling as HTMLElement
      const addFormSeniorWidth = rightControls ? rightControls.offsetWidth : 0
      formSenior.style.width = `calc(100% + ${addFormSeniorWidth}px)`
      formSenior.style.marginRight = `-${addFormSeniorWidth}px`
      formDom.insertBefore(formSenior, newChildrenList[newChildrenList.length])
    }
    return formSenior
  }

  const getChildList = (dom: Element | null | undefined) => {
    return Array.from(dom?.children || [])
  }

  const showHiddenChild = () => {
    isExpand.value = !isExpand.value
    const formDom = ruleFormRef.value?.$el
    const formBtnsDom = formDom?.lastElementChild as HTMLElement
    dealFormHeight(formBtnsDom)
  }

  const validForm = async () => {
    if (!ruleFormRef.value) return Promise.reject(new Error('表单实例不存在'))
    return await ruleFormRef.value.validate()
  }

  const resetValidForm = () => {
    ruleFormRef.value?.resetFields()
  }

  defineExpose({
    reorder,
    validForm,
    resetValidForm
  })
</script>

<template>
  <div v-if="updateLayout" :id="`pageForm_${UUID}`" class="page-form">
    <!-- 左右布局 -->
    <el-form id="ruleForm" ref="ruleFormRef" v-bind="$attrs" :label-width="labelWidth">
      <slot></slot>
      <template v-if="hideModel">
        <span class="page-form__btns">
          <slot name="page-form__btns"></slot>
          <el-button ref="formExpandRef" @click="showHiddenChild" class="page-form__btns-expand" type="primary" text>
            {{ isExpand ? upText : downText
            }}<i-ep-d-arrow-right :class="['el-icon--right', !isExpand ? 'rotate-90' : '-rotate-90']" />
          </el-button>
        </span>
      </template>
      <template v-else>
        <span class="page-form__btns">
          <slot name="page-form__btns"></slot>
        </span>
      </template>
    </el-form>
    <div class="page-form__append">
      <slot name="page-form__append"></slot>
    </div>
  </div>
  <!-- <div v-if="hideModel" class="h-40px"></div> -->
</template>

<style lang="scss" scoped>
  ::v-deep(.el-form-item, .el-form-item--default) {
    margin: 0 15px 18px 0;
    .el-input {
      --el-input-width: 200px;
    }
  }

  ::v-deep(.el-form-item--small) {
    margin: 0 10px 18px 0;
    .el-input {
      --el-input-width: 180px;
    }
  }

  ::v-deep(.el-form-item--large) {
    margin: 0 20px 20px 0;
    .el-input {
      --el-input-width: 220px;
    }
  }

  .page-form {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;

    #ruleForm {
      flex: 1;
      transition: height 0.3s;

      ::v-deep(.form-senior) {
        background: $borderColor4;
      }
    }
    .page-form__btns {
      position: relative;
      display: inline-block;

      &-expand {
        position: absolute;
        top: 0;
        right: 0px;
        padding-left: 0;
        padding-right: 0;
      }
    }

    .page-form__append {
      // flex-shrink: 0; // 会压缩总体宽度，导致计算失误
      max-width: 60%;
      text-align: right;
    }
  }
</style>
