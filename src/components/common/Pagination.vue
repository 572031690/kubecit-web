<template>
  <div class="pagination">
    <div class="first-page">首页</div>
    <el-pagination
      background
      layout="prev, pager, next"
      prev-text="上一页"
      next-text="下一页"
      :default-page-size="12"
      :page-count="pageCount" />
    <div class="last-page">尾页</div>
  </div>
</template>

<script setup>
const props = defineProps(['pageCount'])
</script>

<style scoped>
.pagination {
  display: flex;
  width: 1200px;
  margin: 30px auto 70px;
  justify-content: center;
  align-items: center;
}
.pagination .first-page, .last-page {
  height: 30px;
  text-align: center;
  line-height: 28px;
  font-size: 16px;
  color: #93999F;
  width: 60px;
  cursor: pointer;
}
.pagination .first-page:hover, .last-page:hover {
  color: #337dff;
}
</style>
