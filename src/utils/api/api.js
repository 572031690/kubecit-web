import request from './request'

// 获取一级分类
export function ListFristCategories() {
  return request({
    url: '/api/categories?level=1',
  })
}


// 获取子分类

export function ListSubCategories(data) {
  return request({
    url: '/api/categories?parentID=' + data.category,
  })
}

// 获取分类下课程
export function searchCourse(data) {
  return request({
    url: '/api/course/search',
    method: 'post',
    data,
  })
}

// 获取轮播图
export function getSliders() {
  return request({
    url: '/api/sliders',
  })
}

//查询最新课程
export function mostNewCourse(data) {
  return request({
    url: '/api/course/mostNew',
    method: 'post',
    data,
  })
}

//用户注册

export const usersRegister = (data) => {
  return request({
    url: '/api/u/registerUsername',
    method: 'post',
    data,
  })
}

//用户名密码登录
export function loginByJson(data) {
  return request({
    url: '/api/u/loginByJson',
    method: 'post',
    data,
  })
}

//获取个人信息
export function getInfo(params) {
  return request({
    url: '/api/member/getInfo',
    params,
  })
}
