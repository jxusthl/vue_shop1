<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  methods: {
    // 退出的方法
    logout () {
      // 清空sessionStorage即可
      window.sessionStorage.removeItem('token')
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
