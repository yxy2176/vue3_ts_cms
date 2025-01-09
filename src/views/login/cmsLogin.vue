<template>
  <div>Login</div>
</template>
<script setup lang="ts">
import CMSRequest from '@/service'

CMSRequest.get({
  url: '/home/multidata',
}).then((res: any) => {
  console.log(res)
})
</script>
<style lang="less" scoped></style>
