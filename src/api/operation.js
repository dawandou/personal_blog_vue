import request from '@/utils/request'

export function fetchLogList(query) {
  return request({
    url: '/log/operationLog/list',
    method: 'post',
    data: query
  })
}
  
export function fetchLoginLogList(query) {
  return request({
    url: '/log/loginOperationLog/list',
    method: 'post',
    data: query
  })
}