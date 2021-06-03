<template>
  <div class="zf-layout">
    <div class="title">{{ title }}</div>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '基本信息'
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.zf-layout{
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  margin-bottom: 30px;
  .title{
    height: 44px;
    line-height: 44px;
    font-weight: bold;
    border-bottom: 1px solid #e8e8e8;
    background-color: #FAFAFA;
    padding: 0 24px;
  }
  .body{
    padding: 16px 24px;
  }
}
</style>
