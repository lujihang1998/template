<script setup lang="ts">
  import noAuthImg from '@/assets/images/noAuth.png'
  import usePermissionStore from '@/stores/modules/permission'

  defineOptions({ name: 'Auth' })

  const noAuth = ref<boolean>(false)
  const router = useRouter()
  const permissionStore = usePermissionStore()
  const permissionRoutes = permissionStore.routes

  const next = (): void => {
    const routes = permissionRoutes.filter((i) => typeof i.name === 'string' && !['root', 'main'].includes(i.name))
    if (routes.length) {
      const name = routes[0].name
      router.replace({ name })
    } else {
      noAuth.value = true
    }
  }
  next() // 不应该等到onMounted再去执行, 要不然会有很长一段空白页展示区间
</script>

<template>
  <div v-show="noAuth" class="h-[70%] flex flex-col justify-center items-center auth">
    <img class="w-800px" :src="noAuthImg" alt="无权限" />
    <div class="text-base auth-text">该用户暂无权限</div>
  </div>
</template>

<style scoped lang="scss">
  .auth-text {
    color: $fontColor2;
  }
</style>
