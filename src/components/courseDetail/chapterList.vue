<template>
  <div class="chapter-container" v-for="(chItem, chIndex) in chapterList" :key="chIndex">
    <div class="chapter-title">{{ chItem.title }}</div>
    <div class="chapter-des">{{ chItem.des }}</div>
    <div v-for="(courseItem, courseIndex) in chItem.course" :key="courseIndex" class="course-item">
      <img alt=""/>
      <div class="course-type">{{ courseItem.type }}：</div>
      <div class="course-name">{{ courseItem.title }}</div>
      <div class="learn" @click.stop="toPlayPage">开始学习</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['chapterList'])
const toPlayPage = () => {
  console.log('开始学习')
}
</script>
<style scoped lang="scss">
.chapter-container {
  width: 1200px;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
  .chapter-title {
    font-weight: 700;
    font-size: 20px;
    color: #333333;
  }
  .chapter-des {
    margin: 10px 0;
  }
  .course-item {
    display: flex;
    position: relative;
    height: 40px;
    line-height: 30px;
    padding: 5px 0;
    margin: 0 0 10px 0;
    border-radius: 8px;
    align-items: center;
    &:hover {
      cursor: pointer;
      background: rgba(53, 133, 255, 0.2);
      border-radius: 8px;
      margin-top: 5px;
      color: #388fff !important;
    }
    img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
      margin-left: 10px;
    }
    .course-type {
      color: #333333;
      font-weight: 700;
      font-size: 14px;
    }
    .course-name {
      font-size: 16px;
      font-weight: 400;
      color: #333333;
    }
    .learn {
      position: absolute;
      right: 5px;
      top: 5px;
      float: right;
      width: 80px;
      height: 30px;
      line-height: 30px;
      border: 0px;
      outline: none;
      color: #fff;
      background: #388fff;
      border-radius: 12px;
      cursor: pointer;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
