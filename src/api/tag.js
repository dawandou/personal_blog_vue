import request from '@/utils/request'

export function tagList(query) {
    return request({
      url: '/tag/list', 
      method: 'post',
      data: query
    })
}

export function addTag(data) {
    return request({
      url: '/tag/create',
      method: 'post',
      data
    })
}

export function updateTag(data) {
    return request({
      url: '/tag/update',
      method: 'put',
      data
    })
}

export function deleteTag(id) {
  return request({
    url: '/tag/delete/' + id,
    method: 'delete',
  })
}

export function getTag(data) {
  return request({
    url: '/tag/selectTag',
    method: 'post',
    data
  })
}