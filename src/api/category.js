import request from '@/utils/request'

export function categoryList(query) {
    return request({
      url: '/category/list',
      method: 'post',
      data: query
    })
}

export function addCategory(data) {
    return request({
      url: '/category/create',
      method: 'post',
      data
    })
}

export function updateCategory(data) {
    return request({
      url: '/category/update',
      method: 'post',
      data
    })
}

export function deleteCategory(id) {
  return request({
    url: '/category/delete',
    method: 'post',
    params: { id }
  })
}

export function getCategory(data) {
  return request({
    url: '/category/getCategory',
    method: 'post',
    data
  })
}