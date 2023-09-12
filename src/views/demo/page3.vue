<script setup lang="ts">
  defineOptions({ name: 'Page3' })
</script>

<template>
  <page full>
    <PageRow :gutter="20">
      <PageCol width="30%" bgColor="#919761">
        <div h-full text-center text-2xl leading-200>区域1</div>
      </PageCol>
      <PageCol width="calc(100% - 60% - 40px)">
        <PageRow>
          <PageCol bg-color="#c1e9b6" height="50%">
            <div h-1000px text-center text-2xl>区域2</div>
          </PageCol>
          <PageCol bg-color="#519764" height="50%">
            <div h-1000px text-center text-2xl>区域3</div>
          </PageCol>
        </PageRow>
      </PageCol>
      <PageCol width="30%" bgColor="#dbc944">
        <div h-full text-center text-2xl leading-200>区域4</div>
      </PageCol>
    </PageRow>
  </page>
</template>
