<template>
  <div>
    <el-table
      ref="XmTable"
      :key="tid"
      v-loading="loading"
      v-bind="$attrs"
      :class="{
        'zf-table': true,
        'xm-table-border': bordered,
        'is-flex': showSummary
      }"
      border
      :data="tableData"
      :max-height="mHeight"
      :stripe="stripe"
      :default-sort="defaultSort"
      :header-cell-class-name="headerCellClassName"
      :row-class-name="setRowClassName"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      v-on="$listeners"
      @sort-change="handleSortChange"
      @row-click="handleRowClick"
      @header-dragend="handleHeaderDragend"
    >
      <template v-for="column in _columns">
        <!----------------------- 多级表头 start  ----------------------->
        <template v-if="column.children && Array.isArray(column.children)">
          <el-table-column
            :key="column.prop"
            :label="column.label"
            :align="column.align || 'left'"
            :class-name="column.className || null"
          >
            <!-- 多级表头的一级表头 slot start -->
            <template slot="header">
              <template>{{ column.label || column.prop }}</template>
            </template>
            <!-- 多级表头的一级表头 slot end -->

            <!-- 二级表头 children start  -->
            <template v-for="child in column.children">
              <!-- 特殊列 例如多选 -->
              <el-table-column
                v-if="child.type"
                :key="child.prop"
                :type="child.type"
                :label="child.label"
                :width="child.width"
                :min-width="child.minWidth || 100"
                :align="child.align || 'left'"
                :fixed="child.fixed"
                :class-name="child.className || null"
                :selectable="column.selectable || null"
              />
              <!-- 默认列 -->
              <el-table-column
                v-else
                :key="child.prop"
                :prop="child.prop"
                :label="child.label"
                :width="child.width"
                :min-width="child.minWidth || 100"
                :align="child.align || 'left'"
                :sortable="child.sortable"
                :show-overflow-tooltip="column.tooltip"
                :fixed="child.fixed"
                :class-name="child.className || null"
              >
                <!-- 表头 slot -->
                <!-- tips：element-ui 2.4.9 以上 版本才支持 slot="header" -->
                <template
                  slot="header"
                  slot-scope="{ row }"
                >
                  <slot
                    :name="`${child.prop}-header`"
                    :row="row"
                  >
                    <el-tooltip
                      effect="dark"
                      placement="top"
                      :disabled="!child.tips"
                    >
                      <div
                        slot="content"
                        style="max-width: 200px;"
                      >{{ child.tips }}</div>
                      <span>{{ child.label || child.prop }}</span>
                    </el-tooltip>
                  </slot>
                </template>

                <!-- 默认列 slot -->
                <template slot-scope="{ row, $index }">
                  <slot
                    :name="child.prop"
                    :row="row"
                    :$index="$index"
                  >
                    <div
                      v-if="child.formatter"
                      v-html="child.formatter(row[child.prop], row, $index)"
                    />
                    <div
                      v-else
                      :class="getCellClassObject(child.ellipsis)"
                      :title="column.ellipsis ? row[child.prop] : ''"
                    >{{ row[child.prop] }}</div>
                  </slot>
                </template>
              </el-table-column>
            </template>
            <!-- 二级表头 children end  -->
          </el-table-column>
        </template>
        <!----------------------- 二级表头 end ----------------------->

        <!----------------------- 一级 默认 slot ----------------------->
        <template v-else>
          <!-- 特殊列 -->
          <template v-if="column.type">
            <!-- 展开列 -->
            <el-table-column
              v-if="column.type === 'expand'"
              :key="column.prop"
              :type="column.type"
              :label="column.label"
              :width="column.width"
              :min-width="column.minWidth || 100"
              :align="column.align || 'left'"
              :fixed="column.fixed"
              :class-name="column.className || null"
              :selectable="column.selectable || null"
            >
              <template slot-scope="{ row, $index }">
                <slot
                  :name="column.prop"
                  :row="row"
                  :$index="$index"
                />
              </template>
            </el-table-column>

            <!-- 多选列等 -->
            <el-table-column
              v-else
              :key="column.prop"
              :type="column.type"
              :label="column.label"
              :width="column.width"
              :min-width="column.minWidth || 100"
              :align="column.align || 'left'"
              :fixed="column.fixed"
              :class-name="column.className || null"
              :selectable="column.selectable || null"
            />
          </template>

          <!-- 默认列 -->
          <template v-else>
            <el-table-column
              :key="column.prop"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
              :min-width="column.minWidth || 100"
              :align="column.align || 'left'"
              :sortable="column.sortable"
              :show-overflow-tooltip="column.tooltip"
              :fixed="column.fixed"
              :tips="column.tips"
              :class-name="column.className || null"
            >
              <!--
              注意: 在组件中使用 <template slot="xxxx-header" slot-scope="scope" ></template>的时候
              slot-scope="scope" 不能删除，必须指明为作用域插槽, 否则会导致错误
              例如：当表格在进行前端排序（sortable: true）时，会出现slot重复渲染错误警告
            -->
              <!-- 表头 slot -->
              <template
                slot="header"
                slot-scope="{ row }"
              >
                <slot
                  :name="`${column.prop}-header`"
                  :row="row"
                >
                  <el-tooltip
                    effect="dark"
                    placement="top"
                    :disabled="!column.tips"
                  >
                    <div
                      slot="content"
                      style="max-width: 150px;"
                    >{{ column.tips }}</div>
                    <span>{{ column.label || column.prop }}</span>
                  </el-tooltip>
                </slot>
              </template>

              <!-- default slot -->
              <!-- 当增加一个 空白列时，，例如 [操作]: { label: '操作', prop: 'handles' } 时
              如果不调用 slot-scope 会报如下错误
              Duplicate presence of slot "handles" found in the same render tree -
              this will likely cause render errors.
            -->
              <template slot-scope="{ row, $index }">
                <slot
                  :name="column.prop"
                  :row="row"
                  :$index="$index"
                >
                  <template
                    v-if="column.formatter"
                    v-html="column.formatter(row[column.prop], row, $index)"
                  />
                  <template
                    v-else
                    :class="getCellClassObject(column.ellipsis)"
                    :title="column.ellipsis ? row[column.prop] : ''"
                  >{{ row[column.prop] }}</template>
                </slot>
              </template>
            </el-table-column>
          </template>
        </template>
        <!----------------------- 一级 默认 end ----------------------->
      </template>
      <!-- <template slot="empty">
        <slot name="empty" />
      </template> -->
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="hasShowPaging"
      class="xm-table-pagination"
      background
      :total="+total"
      :layout="pagerLayout"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :current-page="curPage"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      @prev-click="handlePageChange"
      @next-change="handlePageChange"
    />
  </div>
</template>

<script>

/**
 *
 *  基于 ElementUi 的 Table 组件,根据业务进行二次封装
 *  所有 Element-Ui 表格中的属性，除 props 中列举的属性外，均可通过 $attr 进行传递
 *  $listeners 包含了所有 ElementUi 支持的所有事件，无需重复设置 $emit 即可使用
 *  例如: @row-click="handleRowClick":如果在 handleRowClick 事件中继续 $emit('row-click')
 *  这样会导致 row-click 事件触发两次
 *  columns 参数说明
 *  columns: [
      {
        prop: String, // 唯一Key，字段名
        type: ['index', 'selection', ''], // col 类型，参照 element-ui 文档
        label: String, // 列的名称
        width: String, // 每列的宽度
        min-width: String, // 每列的最小宽度
        children: Array, // 二级表头
        align: ['left','center','right'], // 列文字对齐方式
        sortable: [true, false, 'custom'], // 排序，参照 element-ui 文档
        className: String, // 表头样式
        fixed: [true, 'left', 'right'] // 列是否固定在左侧或者右侧，true 表示固定在左侧
        hidden: Boolean, // 是否隐藏该列
        formatter: Function // 传入一个函数对数据进行格式化，常用于简单重复使用，参数： (value, row, index)
        ellipsis: [true, false, 'multiple'] // 开启后，文本将不换行，超出部分显示为省略号
        selectable: Function, // 函数的返回值(true, false)用来决定这一行的 CheckBox 是否可以勾选
        tips: String, // 表头Popover 弹出框，显示表头解释信息 参照 element-ui 文档
        tooltip: 当内容过长被隐藏时显示 tooltip // 对于插槽的内容不起作用
      }
 *  ]
 *
 */

export default {
  name: 'XmTable',
  props: {
    columns: {
      type: Array,
      default() {
        return []
      }
    },

    dataSource: {
      type: Array,
      default() {
        return []
      }
    },

    loading: {
      type: Boolean,
      default: false
    },

    // 最大高度，包含分页高度
    maxHeight: {
      type: Number,
      default: 0
    },

    // 最外层的边框
    bordered: {
      type: Boolean,
      default: false
    },

    // 斑马条纹
    stripe: {
      type: Boolean,
      default: true
    },

    /**
     * 是否显示分页
     * 为 always 时，将一直显示
     * 为 false 时，总是不显示
     * 为 true 时，只有有数据时才显示
     */
    pagination: {
      type: [Boolean, String],
      default: true,
      validator(value) {
        return ['always', true, false].indexOf(value) !== -1
      }
    },

    // 分页布局
    pagerLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },

    /**
     *  总条数
     *  TODO: 星火项目中出现有接口返回字符串，导致出现警告
     *  默认情况下 total 只能是数字类型
     */
    total: {
      type: [Number, String],
      default: 0
    },

    // 每页显示数量
    pageSize: {
      type: Number,
      default: 30
    },

    // 页码
    pageNum: {
      type: Number,
      default: 1
    },

    // 分页选择器的选项设置
    pageSizes: {
      type: Array,
      default() {
        return [10, 30, 50, 80, 100]
      }
    },

    // 初始排序
    defaultSort: {
      type: Object,
      default() {
        return {}
      }
    },

    // 是否开启选中高亮
    highlightRow: {
      type: [Boolean, String],
      default: false,
      validator(value) {
        return ['single', true, false].indexOf(value) !== -1
      }
    },

    // 高亮选中样式
    highlightRowClassName: {
      type: String,
      default: 'xm-row-select'
    },

    // row className
    rowClassName: {
      type: Function,
      default() { return null }
    },

    // 表头类
    headerCellClassName: {
      type: String,
      default: 'xm-header-bg'
    },

    /**
     * 是否自动滚动到顶部
     * change：只有在分页或排序改变时执行
     * true：只要数据改变就执行
     * false：不自动执行
     */
    autoScrollTop: {
      type: [Boolean, String],
      default: true,
      validator(value) {
        return ['change', true, false].indexOf(value) !== -1
      }
    },

    /**
     *  显示汇总行
     *  固定在第一行
     *  TODO: 如果 column 设置了 fixed 会出现样式错乱，慎用
     */
    showSummary: {
      type: Boolean,
      default: false
    },

    /**
     *  修改汇总行单元格
     *  { date: row => '<p>{{ row.date }}</p>' }
     */
    renderSummary: {
      type: Object,
      default() {
        return {}
      }
    },

    /**
     * 默认属性选中的集合，
     */
    selections: {
      type: Array,
      default: () => []
    },

    /**
     * 多选表格默认勾选属性
     */
    selectionType: {
      type: String,
      default: 'id'
    }
  },
  data() {
    const { prop = '', order = '' } = this.defaultSort
    return {
      tid: 0,
      curPage: 1,
      sortBy: prop,
      sortOrder: order,
      tableData: [], // 表格数据
      summaryData: {}, // 汇总数据
      tableSelectIndex: []
    }
  },
  computed: {
    _columns() {
      return this.columns.filter(item => !item.hidden)
    },
    // 兼容低版本
    hasShowPaging() {
      if (this.pagination === 'always') return true
      return this.pagination && this.dataSource.length > 0
    },
    mHeight() {
      const { hasShowPaging, maxHeight } = this
      const height = hasShowPaging ? maxHeight - 46 : maxHeight // 46 为 pagination 的高度
      return maxHeight !== 0 ? height : 'auto'
    }
  },
  watch: {
    dataSource: {
      deep: true,
      immediate: true,
      handler(val) {
        this.generateData(val)
        // 清除选中行
        this.tableSelectIndex = []
        // 设置表格默认选中
        this.setRowSelection()
        // 滚动到顶部
        if (this.autoScrollTop === true) this.moveToTop()
      }
    },
    pageNum(val) {
      this.curPage = val
    },
    columns(val, oldVal) {
      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
        this.resetXmTable() // TODO: 解决columns的顺序改变，视图不更新问题
      }
    }
  },
  methods: {
    /**
     *  处理表格数据
     */
    generateData(val) {
      const dataSource = [...val]
      if (this.showSummary && val.length > 1) {
        this.summaryData = dataSource.shift() || {}
      }
      this.tableData = dataSource
    },

    /**
     *  返回表格汇总行数据
     */
    getSummaries({ columns }) {
      const sums = []
      const { summaryData } = this
      columns.forEach((item, index) => {
        sums[index] = summaryData[item.property] === undefined || summaryData[item.property] === null ? '-' : summaryData[item.property]
      })
      return sums
    },

    /**
     *  汇总行 cell 修改 innerHTML
     */
    // renderSummaries() {
    //   const summary = this.renderSummary
    //   const table = this.$refs.XmTable?.$el?.querySelector('.el-table__footer-wrapper>table')
    //   for (const prop in summary) {
    //     if (summary.hasOwnProperty(prop)) {
    //       const formatter = summary[prop]
    //       if (typeof formatter === 'function') {
    //         const index = this.getIndexByProp(prop)
    //         table.rows[0].cells[index].innerHTML = formatter(this.summaryData)
    //       }
    //     }
    //   }
    // },

    /**
     *  根据列字段
     *  获取该列在 columns 的 index
     */
    // getIndexByProp(prop) {
    //   return this.columns.findIndex(item => item.prop === prop)
    // },

    /**
     * 表格行点击添加背景色
     * $listeners 中已经包含了所有事件，不需要 $emit 该事件，如果 $emit 了会导致该事件触发两次
     */
    handleRowClick(row, column, cell, event) {
      if (!this.highlightRow) return
      const index = row.__index__
      if (this.highlightRow === 'single') {
        if (this.tableSelectIndex.includes(index)) {
          this.tableSelectIndex = []
        } else {
          this.$set(this.tableSelectIndex, 0, index)
        }
      } else {
        if (this.tableSelectIndex.includes(index)) {
          this.tableSelectIndex = this.tableSelectIndex.filter(item => item !== index)
        } else {
          this.tableSelectIndex.push(index)
        }
      }
    },

    /**
     * 表格每行的ClassName
     */
    setRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.__index__ = rowIndex
      const rowClassName = this.rowClassName({ row, rowIndex })
      if (this.tableSelectIndex.includes(rowIndex)) {
        return `${this.highlightRowClassName} ${rowClassName}`
      }
      return rowClassName
    },

    /**
     * 改变页数
     * @return {sorter}: 兼容历史写法
     */
    handlePageChange(page) {
      const { pageSize, sortBy, sortOrder } = this
      // 滚动到顶部
      if (this.autoScrollTop === 'change') this.moveToTop()
      this.$emit('change', {
        pageNum: page,
        pageSize,
        prop: sortBy,
        order: sortOrder,
        sorter: { prop: sortBy, order: sortOrder } // sorter 不建议使用
      })
    },
    /**
     * 改变每页显示的条数
     * @return {sorter}: 兼容历史写法
     */
    handleSizeChange(size) {
      const { sortBy, sortOrder } = this
      // 滚动到顶部
      if (this.autoScrollTop === 'change') this.moveToTop()
      this.$emit('change', {
        pageNum: 1,
        pageSize: size,
        prop: sortBy,
        order: sortOrder,
        sorter: { prop: sortBy, order: sortOrder } // sorter 不建议使用
      })
    },
    /**
     * 排序
     * 如果设置了默认排序，早期版本该方法第一次会默认触发
     * Element Ui 新版本已修复该 bug
     * @return {sorter}: 兼容历史写法
     */
    handleSortChange({ prop, order }) {
      this.sortBy = prop
      this.sortOrder = order
      // 滚动到顶部
      if (this.autoScrollTop === 'change') this.moveToTop()
      this.$emit('change', {
        pageNum: 1,
        pageSize: this.pageSize,
        prop,
        order,
        sorter: { prop, order } // sorter 不建议使用
      })
    },
    /**
     * 设置表格默认选中
     * 该方法允许外部通过 refs 调用
     */
    setRowSelection() {
      const { selectionType, selections, tableData } = this
      if (selections && selections.length > 0) {
        this.$nextTick(() => {
          const XmTable = this.$refs.XmTable
          XmTable.clearSelection()
          tableData.forEach(row => {
            // 这边并非是id的集合，必要时可以改变类型
            if (selections.includes(row[selectionType])) {
              XmTable.toggleRowSelection(row, true)
            }
          })
        })
      }
    },
    /**
     * 返回页面顶部
     */
    moveToTop() {
      if (this.maxHeight) {
        if (this.$refs && this.$refs.XmTable && this.$refs.XmTable.bodyWrapper) {
          this.$refs.XmTable.bodyWrapper.scrollTop = 0
        }
      } else {
        this.move(0)
      }
    },
    /**
     * 滚动到某个位置
     * 具体项目具体对待
     * 部分项目滚动区域可能不是 document.body
     */
    move(amount) {
      document.documentElement.scrollTop = amount
      document.body.parentNode.scrollTop = amount
      document.body.scrollTop = amount
    },
    /**
     * 通过修改 key 实现表格重新渲染
     * 性能不好，尽量避免使用（例如：表格中如果有图片，图片每次都重新加载）
     * 特殊需要，可通过 ref 手动调用该方法
     */
    resetXmTable() {
      this.tid++
    },
    /**
     * 获取 xm-cell 样式
     */
    getCellClassObject(ellipsis) {
      if (!ellipsis) return null
      return {
        'multiple-line-txt-cut': ellipsis === 'multiple',
        'txt-cut': ellipsis === true
      }
    },
    /**
     * 表头拖拽事件
     */
    handleHeaderDragend(newWidth, oldWidth, column, event) {
      this.$emit('header-dragend', {
        newWidth,
        oldWidth,
        column,
        event
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .zf-table.el-table {
  // 汇总行放在第一行
  &.is-flex {
    display: flex;
    flex-direction: column;

    .el-table__body-wrapper {
      order: 1;
    }

    .el-table__header-wrapper,
    .el-table__footer-wrapper {
      min-height: 45px;
    }
  }

  // 覆盖默认空数据时的样式，解决汇总行在有数据和没数据切换时的抖动
  .el-table__empty-block {
    min-height: 45px;

    .el-table__empty-text {
      line-height: 45px;
    }
  }

  // 单元格 采用 flex 布局，修改默认行高
  // th,td {
  //   .cell {
  //     display: flex !important;
  //     justify-content: flex-start;
  //     align-items: center;
  //     width: 100%;
  //     min-height: 28px;
  //     line-height: 16px;
  //   }
  //   &.is-right {
  //     .cell {
  //       justify-content: flex-end;
  //     }
  //   }
  //   &.is-center {
  //     .cell {
  //       justify-content: center;
  //     }
  //   }
  // }
  // 覆盖表格样式
  thead {
    // 二级表头
    &.is-group {
      tr:first-child:nth-last-child(2) {
        th {
          padding: 4px 0;
        }
      }
    }

    tr {
      th {
        padding: 8px 0;
        user-select: text;

        &.is-sortable {
          padding: 7px 0;
        }

        .cell {
          color: #333;
        }
      }
    }
  }
  // 表格行选中样式
  .el-table__body tr.el-table__row.xm-row-select > td {
    background-color: #ff0;
  }

  // 滚动条占行符背景
  .el-table__fixed-right-patch {
    background-color: #f5f7fa;
  }

  // 汇总行背景
  .el-table__footer-wrapper tbody td {
    background-color: #f5f7fa;
  }

  // 表头样式
  th {
    &.gutter,
    &.xm-header-bg {
      background-color: #F5F8FA;
    }
  }
  .el-button--mini,
  .el-button--mini.is-round {
    padding: 0;
  }
}

// 分页样式
.xm-table-pagination {
  padding: 14px 12px 1px;
  text-align: right;
  background-color: #fff;
}

// 父元素的边框
.xm-table-border {
  border: 1px solid #ebeef5;
  border-bottom: none;
  box-sizing: content-box;
}
// td 多行溢出 ... 显示
.multiple-line-txt-cut {
  display: -webkit-box;
  overflow: hidden;
  line-height: 18px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

// td 单行行溢出 ... 显示
.txt-cut {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
