import request from './request'
// 获取课程标签
export function queryCategoryList(params){
  return request({
      url:'/api/categories/v2',
      method:'get',
      params
  })
}
// 获取分类下课程
export function searchCourse(data){
  return request({
      url:'/api/course/search',
      method:'post',
      data
  })
}
// 获取课程详细信息
export function courseDetail(courseId){
  return request({
    url:'/api/course/' + courseId,
    method:'get'
  })
}