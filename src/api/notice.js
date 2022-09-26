import request from '@/utils/request'

export function noticeList(query) {
    return request({
      url: '/notice/list',
      method: 'post',
      data: query
    })
}

export function addNotice(data) {
  return request({
    url: '/notice/create',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/notice/update',
    method: 'post',
    data
  })
}

export function deleteNotice(id) {
  return request({
    url: '/notice/delete',
    method: 'post',
    params: { id }
  })
}

export function getNoticeById(id){
  return request({
    url: '/notice/info/' + id,
    method: 'get'
  })
}