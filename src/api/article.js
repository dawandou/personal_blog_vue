import request from '@/utils/request'

export function articleList(query) {
    return request({
      url: '/article/list',
      method: 'post',
      data: query
    })
}

export function addArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

export function deleteArticle(id) {
  return request({
    url: '/article/delete',
    method: 'delete',
    params: { id }
  })
}

export function getArticleById(id){
  return request({
    url: '/article/getArticle/' + id,
    method: 'get'
  })
}

export function uploadImg(data) {
  return request({
    url: '/article/upload',
    method: 'post',
    data
  })
}