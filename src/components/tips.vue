<template>
  <el-tooltip v-bind="$attrs" :content="content" :placement="placement">
    <i class="el-icon-question" />
  </el-tooltip>
</template>

<script>
export default {
  components: {},
  props: {
    content: {
      type: String,
      default() {
        return ''
      }
    },
    placement: {
      type: String,
      default() {
        return 'top-start'
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped>
</style>
