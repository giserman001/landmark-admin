<template>
  <div class="priceRange">
    <el-input v-model="child_obj[start]" type="text" placeholder="请输入" class="w80" @input="priceChange(start)" />
    <span>~</span>
    <el-input v-model="child_obj[end]" type="text" placeholder="请输入" class="w80" @input="priceChange(end)" />
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default() { return {} }
    },
    start: {
      type: [String],
      default() { return 'start_price' }
    },
    end: {
      type: [String],
      default() { return 'end_price' }
    }
  },
  data() {
    return {
      child_obj: this.obj
    }
  },
  methods: {
    priceChange(key) {
      this.child_obj[key] = this.child_obj[key].replace(/[^\d\.]/g, '')
      this.child_obj[key] = this.child_obj[key].replace(/^\./g, '')
      this.child_obj[key] = this.child_obj[key].replace(/\.{2,}/g, '.')
      this.child_obj[key] = this.child_obj[key].replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      this.child_obj[key] = this.child_obj[key].replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      this.$emit('PChange', this.child_obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.priceRange{
  &>span{
    margin: 0 10px;
  }
}
</style>
