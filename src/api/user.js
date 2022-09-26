import request from '@/utils/request'

export function userList(query) {
    return request({
      url: '/user/list',
      method: 'post',
      data: query
    })
}

export function addUser(data) {
    return request({
      url: '/user/create',
      method: 'post',
      data
    })
}

export function updateUser(data) {
    return request({
      url: '/user/update',
      method: 'post',
      data
    })
}

export function deleteUser(id) {
    return request({
      url: '/user/delete',
      method: 'post',
      params: { id }
    })
}